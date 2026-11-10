import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

/**
 * A native checkbox in the preset's look, drawn by itself: its box, and its
 * check or minus (its ::before). Alone (a table's row), in a checkbox field
 * beside its text, or in any field.
 */
@Directive({
  selector: 'input[type="checkbox"][scCheckbox]',
  host: {
    'data-slot': 'checkbox',
    '[id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[disabled]': 'disabled()',
    '[checked]': 'checked()',
    '[class]': 'class()',
    '(change)': 'onChange()',
  },
  exportAs: 'scCheckbox',
})
export class ScCheckbox implements FormCheckboxControl {
  private readonly styles = injectPreset().checkbox;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-checkbox-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** Checked: two-way, or a [formField]. */
  readonly checked = model(false);
  /** Neither checked nor not (a "select all" over some): shows a minus. */
  readonly indeterminate = input(false, { transform: booleanAttribute });

  // Bound by the Field directive (FormCheckboxControl).
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false);
  readonly touched = input(false);

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  protected readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Invalid once touched, as the other controls.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  protected readonly class = computed(() =>
    cn(
      "appearance-none before:content-['']",
      this.styles.item,
      this.styles.mark,
      this.classInput(),
    ),
  );

  constructor() {
    // A property only, no attribute.
    effect(() => {
      this.element.indeterminate = this.indeterminate();
    });
  }

  protected onChange(): void {
    this.checked.set(this.element.checked);
    // A click clears the native indeterminate; it stays the input's.
    this.element.indeterminate = this.indeterminate();
  }
}
