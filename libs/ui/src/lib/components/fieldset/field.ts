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

  protected readonly class = computed(() =>
    cn(
      '*:data-[slot=control]:mt-2 [&>[data-slot=control]+[data-slot=description]]:mt-2',
      this.classInput(),
    ),
  );

  readonly id = signal<string>(inject(_IdGenerator).getId('sc-field-'));

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
      }
    });
  }
}
