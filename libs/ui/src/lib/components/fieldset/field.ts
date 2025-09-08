import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScLabel } from '../label';

@Component({
  selector: 'sc-field',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScField {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly floatingLabel = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      // Regular field spacing
      !this.floatingLabel() &&
        '*:data-[slot=control]:mt-2 [&>[data-slot=control]+[data-slot=description]]:mt-2',
      // Floating label positioning
      this.floatingLabel() && 'relative',
      this.floatingLabel() &&
        '[&_label]:absolute [&_label]:left-3 [&_label]:z-10 [&_label]:transition-all [&_label]:duration-200 [&_label]:ease-in-out [&_label]:pointer-events-none',
      this.floatingLabel() &&
        '[&_label]:top-1/2 [&_label]:-translate-y-1/2 [&_label]:text-sm [&_label]:text-muted-foreground [&_label]:origin-left',
      // Floating label states - focused
      this.floatingLabel() &&
        '[&:has([data-slot=control]:focus)_label]:top-0 [&:has([data-slot=control]:focus)_label]:text-xs [&:has([data-slot=control]:focus)_label]:text-primary [&:has([data-slot=control]:focus)_label]:bg-background [&:has([data-slot=control]:focus)_label]:px-1 [&:has([data-slot=control]:focus)_label]:-ml-1',
      // Floating label states - has value
      this.floatingLabel() &&
        '[&:has([data-slot=control][data-has-value])_label]:top-0 [&:has([data-slot=control][data-has-value])_label]:text-xs [&:has([data-slot=control][data-has-value])_label]:text-muted-foreground [&:has([data-slot=control][data-has-value])_label]:bg-background [&:has([data-slot=control][data-has-value])_label]:px-1 [&:has([data-slot=control][data-has-value])_label]:-ml-1',
      this.classInput(),
    ),
  );

  readonly id = computed(() => {
    const control = this.formControl();
    const componentType = control?.nativeElement.tagName.toLowerCase() || 'field';
    return inject(_IdGenerator).getId(`sc-${componentType}-`);
  });

  readonly scLabel = contentChild(ScLabel);
  readonly formControl = contentChild('[data-slot="control"]', {
    read: ElementRef,
    descendants: true,
  });

  constructor() {
    afterNextRender(() => {
      const fieldId = this.id();

      // Set label for attribute
      this.scLabel()?.for.set(fieldId);

      // Auto-detect and set ID on the form control with data-slot="control"
      const controlRef = this.formControl();
      if (controlRef) {
        const component = (controlRef.nativeElement as any)?.__ngContext__?.[8]; // Get component instance

        if (component) {
          // Set ID signal
          if (component.id?.set) {
            component.id.set(fieldId);
          }
        }

        // Add floating label value tracking and set placeholder
        if (this.floatingLabel()) {
          this.setupFloatingLabelTracking(controlRef.nativeElement);
          this.setFloatingLabelPlaceholder(controlRef.nativeElement, component);
        }
      }
    });
  }

  private setupFloatingLabelTracking(controlElement: HTMLElement) {
    const updateValueState = () => {
      const hasValue = this.checkHasValue(controlElement);
      if (hasValue) {
        controlElement.setAttribute('data-has-value', '');
      } else {
        controlElement.removeAttribute('data-has-value');
      }
    };

    // Listen for various input events
    ['input', 'change', 'blur', 'focus'].forEach((eventType) => {
      controlElement.addEventListener(eventType, updateValueState);
    });

    // Initial check
    updateValueState();
  }

  private checkHasValue(element: HTMLElement): boolean {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      return (element as HTMLInputElement).value.trim() !== '';
    }

    // For custom components, check common value patterns
    const component = (element as any)?.__ngContext__?.[8];
    if (component) {
      // Check common value signal names
      if (component.value?.() !== undefined && component.value?.() !== '') return true;
      if (component.selectedValue?.() !== undefined && component.selectedValue?.() !== '')
        return true;
      if (component.ngModel !== undefined && component.ngModel !== '') return true;
    }

    return false;
  }

  private setFloatingLabelPlaceholder(element: HTMLElement, component?: any) {
    // For custom components, directly set placeholder signal
    if (component && component.placeholder?.set) {
      component.placeholder.set(' ');
      return;
    }

    // Fallback for native inputs
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      (element as HTMLInputElement).placeholder = ' ';
    }
  }
}
