import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import type { FormCheckboxControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD, SC_FIELD_CHOICE } from '../field';

/** A switch's size: shadcn's two. */
export type ScSwitchSize = 'default' | 'sm';

/**
 * A switch: a native checkbox with role="switch", drawn by itself in the
 * style's look — the track, and its thumb (its ::before). Alone, in a switch
 * field beside its text, or in any field.
 */
@Directive({
  selector: 'input[scSwitch]',
  providers: [{ provide: SC_FIELD_CHOICE, useExisting: ScSwitch }],
  host: {
    // A checkbox shown as a switch: its own type and role, the markup needs neither.
    type: 'checkbox',
    'data-slot': 'switch',
    role: 'switch',
    '[attr.data-size]': 'size()',
    '[id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[disabled]': 'disabled()',
    '[checked]': 'checked()',
    '[class]': 'class()',
    '(change)': 'onChange()',
  },
  exportAs: 'scSwitch',
})
export class ScSwitch implements FormCheckboxControl {
  private readonly styles = injectStyle().switch;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-switch-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** On: two-way, or a [formField]. */
  readonly checked = model(false);
  readonly size = input<ScSwitchSize>('default');

  // Bound by the Field directive (FormCheckboxControl).
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false);
  readonly touched = input(false);

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  private readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Invalid once touched, as the other controls.
  private readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  private readonly class = computed(() =>
    cn(
      'appearance-none',
      this.styles.track,
      // The thumb: at the track's start, centred by its margins — not a
      // transform, which isn't snapped to pixels (uneven edges at 125%); the
      // style moves it.
      "before:absolute before:inset-y-0 before:start-0 before:my-auto before:content-['']",
      this.styles.thumb,
      this.classInput(),
    ),
  );

  private onChange(): void {
    this.checked.set(this.element.checked);
  }
}
