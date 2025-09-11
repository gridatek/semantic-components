import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { cva } from 'class-variance-authority';

import { ScLabel } from '../label';

const fieldVariants = cva('', {
  variants: {
    type: {
      regular: '*:data-[slot=control]:mt-1 [&>[data-slot=control]+[data-slot=description]]:mt-2',
      floating: [
        'relative',
        '[&_label]:absolute [&_label]:left-3 [&_label]:z-10 [&_label]:transition-all [&_label]:duration-200 [&_label]:ease-in-out [&_label]:pointer-events-none',
        '[&_label]:top-1/2 [&_label]:-translate-y-1/2 [&_label]:text-sm [&_label]:text-muted-foreground [&_label]:origin-left',
        '[&:has([data-slot=control]:focus)_label]:text-xs [&:has([data-slot=control]:focus)_label]:text-primary [&:has([data-slot=control]:focus)_label]:bg-background [&:has([data-slot=control]:focus)_label]:px-1 [&:has([data-slot=control]:focus)_label]:-ml-1',
        '[&:has([data-slot=control]:focus)_label]:top-(--floating-label-top-offset)',
        '[&:has([data-slot=control]:not(:placeholder-shown))_label]:text-xs [&:has([data-slot=control]:not(:placeholder-shown))_label]:text-muted-foreground [&:has([data-slot=control]:not(:placeholder-shown))_label]:bg-background [&:has([data-slot=control]:not(:placeholder-shown))_label]:px-1 [&:has([data-slot=control]:not(:placeholder-shown))_label]:-ml-1',
        '[&:has([data-slot=control]:not(:placeholder-shown))_label]:top-(--floating-label-top-offset)',
      ],
    },
    orientation: {
      vertical: 'flex flex-col',
      horizontal: 'grid grid-cols-4 items-center gap-4 [&_[data-slot=control]]:col-span-3',
      'horizontal-right':
        'grid grid-cols-4 items-center gap-4 [&_label]:text-right [&_[data-slot=control]]:col-span-3',
      'horizontal-checkbox': 'flex items-center gap-2 min-h-[44px] group relative',
    },
  },
  defaultVariants: {
    type: 'regular',
    orientation: 'vertical',
  },
});

@Component({
  selector: 'div[sc-field]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'field',
    '[class]': 'class()',
    '[style.--floating-label-top-offset]': '"0"',
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

  readonly controlId = input<string>();

  readonly orientation = input<
    'vertical' | 'horizontal' | 'horizontal-right' | 'horizontal-checkbox'
  >('vertical');

  protected readonly class = computed(() =>
    cn(
      fieldVariants({
        type: this.floatingLabel() ? 'floating' : 'regular',
        orientation: this.orientation(),
      }),
      this.classInput(),
    ),
  );

  private readonly _idGenerator = inject(_IdGenerator);
  private readonly _elementRef = inject(ElementRef);

  readonly id = computed(() => {
    // Use provided controlId if available
    const providedId = this.controlId();
    if (providedId) {
      return providedId;
    }

    // Fallback to auto-generated ID
    const control = this.formControl();
    const componentType = control?.nativeElement.tagName.toLowerCase() || 'field';
    return this._idGenerator.getId(`sc-${componentType}-`);
  });

  readonly scLabel = contentChild(ScLabel);
  readonly formControl = contentChild('[data-slot="control"]', {
    read: ElementRef,
    descendants: true,
  });

  constructor() {
    console.log('🏗️ ScField constructor called');

    afterNextRender(() => {
      console.log('🔄 ScField afterNextRender called');
      const fieldId = this.id();
      const customId = this.controlId();
      console.log('🆔 Field ID:', fieldId, customId ? '(custom)' : '(auto-generated)');

      // Set label for attribute
      const label = this.scLabel();
      console.log('🏷️ Label found:', label);
      label?.for.set(fieldId);

      // Auto-detect and set ID on the form control with data-slot="control"
      let controlRef = this.formControl();
      console.log('🎛️ Control ref from contentChild:', controlRef);

      // Fallback: Use querySelector if contentChild fails
      if (!controlRef) {
        const hostElement = this._elementRef.nativeElement;
        const controlElement = hostElement.querySelector('[data-slot="control"]') as HTMLElement;
        console.log('🔄 Fallback querySelector found:', controlElement);
        if (controlElement) {
          controlRef = { nativeElement: controlElement };
        }
      }

      if (controlRef) {
        const component = (controlRef.nativeElement as any)?.__ngContext__?.[8]; // Get component instance
        console.log('🎯 Component instance:', component);

        if (component) {
          // Set ID signal
          if (component.id?.set) {
            component.id.set(fieldId);
            console.log('✅ Set component ID to:', fieldId);
          }
        }

        // Set placeholder for floating label (required for :not(:placeholder-shown) to work)
        const isFloatingLabel = this.floatingLabel();
        console.log('🏷️ Is floating label:', isFloatingLabel);

        if (isFloatingLabel) {
          console.log('🚀 Setting placeholder for floating label');
          this.setFloatingLabelPlaceholder(controlRef.nativeElement, component);
        }
      } else {
        console.warn('❌ No control element found with data-slot="control"');
      }
    });
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
