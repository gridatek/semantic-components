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
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

/** A switch's size: shadcn's two. */
export type ScSwitchNextSize = 'default' | 'sm';

/**
 * A switch: a native checkbox with role="switch", drawn by itself in the
 * preset's look — the track, and its thumb (its ::before). Alone, in a switch
 * field beside its text, or in any field.
 */
@Directive({
  selector: 'input[type="checkbox"][scSwitchNext]',
  host: {
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
  exportAs: 'scSwitchNext',
})
export class ScSwitchNext implements FormCheckboxControl {
  private readonly styles = injectPreset().switch;
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-switch-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** On: two-way, or a [formField]. */
  readonly checked = model(false);
  readonly size = input<ScSwitchNextSize>('default');

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
      'appearance-none',
      this.styles.track,
      // The thumb: at the track's start, centred by its margins — not a
      // transform, which isn't snapped to pixels (uneven edges at 125%); the
      // preset moves it.
      "before:absolute before:inset-y-0 before:start-0 before:my-auto before:content-['']",
      this.styles.thumb,
      this.classInput(),
    ),
  );

  protected onChange(): void {
    this.checked.set(this.element.checked);
  }
}
