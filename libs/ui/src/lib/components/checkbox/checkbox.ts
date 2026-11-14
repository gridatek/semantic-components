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
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_FIELD, SC_FIELD_CHOICE } from '../field';
import { ScCheckboxGroup } from './checkbox-group';

/**
 * A native checkbox in the preset's look, drawn by itself: its box, and its
 * check or minus (its ::before). Alone (a table's row), in a checkbox field
 * beside its text, or in any field. In a checkbox group: its value is ticked
 * in the group's, or as the parent it ticks them all.
 */
@Directive({
  selector: 'input[scCheckbox]',
  providers: [{ provide: SC_FIELD_CHOICE, useExisting: ScCheckbox }],
  host: {
    // Its own type: the markup needs none.
    type: 'checkbox',
    'data-slot': 'checkbox',
    '[id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[disabled]': 'isDisabled()',
    '[checked]': 'isChecked()',
    '[value]': 'nativeValue()',
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
  private readonly group = inject(ScCheckboxGroup, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-checkbox-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** Checked: two-way, or a [formField]. */
  readonly checked = model(false);
  /** Neither checked nor not (a "select all" over some): shows a minus. */
  readonly indeterminate = input(false, { transform: booleanAttribute });
  /**
   * In a checkbox group: its option, ticked in the group's value. Written
   * `value` (as Base UI); `valueInput` in the class — FormCheckboxControl keeps
   * `value` for value controls.
   */
  readonly valueInput = input<unknown>(undefined, { alias: 'value' });
  /** In a checkbox group: ticks all of its allValues, or none. */
  readonly parent = input(false, { transform: booleanAttribute });

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

  /** In a group, as one of its options or its parent. */
  private readonly inGroup = computed(
    () => !!this.group && (this.parent() || this.valueInput() !== undefined),
  );

  protected readonly isChecked = computed(() => {
    if (!this.inGroup()) return this.checked();
    return this.parent()
      ? this.group!.allTicked()
      : this.group!.has(this.valueInput());
  });

  // A parent is mixed when some of its group are ticked — or when told so
  // (a nested group partly ticked, as Base UI's nested parent).
  private readonly isIndeterminate = computed(
    () =>
      (this.inGroup() && this.parent() && this.group!.someTicked()) ||
      this.indeterminate(),
  );

  protected readonly isDisabled = computed(
    () => this.disabled() || (this.inGroup() && this.group!.disabled()),
  );

  /** The native value: its option, as text. */
  protected readonly nativeValue = computed(() => {
    const value = this.valueInput();
    return value === undefined || value === null ? 'on' : String(value);
  });

  // Invalid once touched, as the other controls: its own, or its group's.
  protected readonly ariaInvalid = computed(
    () =>
      (this.touched() && this.invalid()) ||
      (this.inGroup() && this.group!.showInvalid()) ||
      null,
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
      this.element.indeterminate = this.isIndeterminate();
    });
  }

  protected onChange(): void {
    const ticked = this.element.checked;
    if (this.inGroup()) {
      if (this.parent()) this.group!.setAll(ticked);
      else this.group!.set(this.valueInput(), ticked);
    } else {
      this.checked.set(ticked);
    }
    // A click clears the native indeterminate, and may tick what the group
    // doesn't: both stay the state's.
    this.element.indeterminate = this.isIndeterminate();
    this.element.checked = this.isChecked();
  }
}
