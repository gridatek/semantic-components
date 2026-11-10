import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  isDevMode,
  model,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { SC_CHECKBOX_FIELD } from './checkbox-types';

export const SC_CHECKBOX = 'SC_CHECKBOX';

@Directive({
  selector: 'input[type="checkbox"][scCheckbox]',
  host: {
    'data-slot': 'checkbox',
    '[id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.disabled]': 'disabled() || null',
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
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-checkbox-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly indeterminate = input<boolean>(false);
  readonly checked = model<boolean>(false);

  // Priority: explicit id > field's generated id > own fallback id
  readonly id = computed(
    () => this.idInput() || this.checkboxField?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Bound automatically by the Field directive (FormUiControl contract).
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);

  // Matches ScInput: do not surface invalid until the control is touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  // Part of the FormUiControl contract, so the Field directive binds a
  // disabled field straight to it.
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  // Kept for ScCheckboxField, which derives its data-disabled from this.
  readonly disabledSignal = computed(() => this.disabled());

  constructor() {
    // The field draws the box: without one, the input (transparent) shows nothing.
    if (isDevMode() && !this.checkboxField) {
      throw new Error(
        'scCheckbox: put it inside a scCheckboxField (<label scCheckboxField> or <div scCheckboxField>) — the field draws the box.',
      );
    }
    // Sync indeterminate input to native property
    effect(() => {
      this.elementRef.nativeElement.indeterminate = this.indeterminate();
    });
  }

  protected onInputChange(event: Event): void {
    this.checked.set((event.target as HTMLInputElement).checked);
    // A click clears the native indeterminate; it stays the input's.
    this.elementRef.nativeElement.indeterminate = this.indeterminate();
  }

  protected readonly class = computed(() =>
    cn(
      // Transparent, over the box the field draws: the box's size, the click target.
      'peer m-0 size-full opacity-0',
      'disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );
}
