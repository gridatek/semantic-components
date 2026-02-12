import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

export const SC_CHECKBOX = 'SC_CHECKBOX';

@Directive({
  selector: 'input[type="checkbox"][sc-checkbox]',
  host: {
    'data-slot': 'checkbox',
    '[id]': 'id()',
    '[class]': 'class()',
    '[checked]': 'checked()',
    '(change)': 'onInputChange($event)',
  },
  exportAs: SC_CHECKBOX,
})
export class ScCheckbox implements FormCheckboxControl {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly checkboxField = inject(SC_CHECKBOX_FIELD, {
    optional: true,
  });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-checkbox-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly indeterminate = input<boolean>(false);
  readonly checked = model<boolean>(false);

  // Priority: explicit id > field's generated id > own fallback id
  readonly id = computed(
    () => this.idInput() || this.checkboxField?.id() || this.fallbackId,
  );

  // Expose disabled state as a signal
  readonly disabledSignal = signal(false);

  constructor() {
    // Sync indeterminate input to native property
    effect(() => {
      this.elementRef.nativeElement.indeterminate = this.indeterminate();
    });

    // Track disabled state
    effect(() => {
      this.disabledSignal.set(this.elementRef.nativeElement.disabled);
    });
  }

  protected onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked.set(input.checked);
    this.disabledSignal.set(input.disabled);
  }

  protected readonly class = computed(() =>
    cn(
      'peer size-4 cursor-pointer opacity-0',
      'disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );
}
