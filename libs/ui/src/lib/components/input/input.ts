import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { SC_FIELD } from '../field';

/**
 * A native text field in the app's preset: its classes are the preset's
 * (`injectPreset().input`). In a field (`div[scField]`) it takes the field's
 * id and description; with Signal Forms (`[formField]`) it is invalid once
 * touched. It needs a name — a label, or `aria-label` — and warns in
 * development without one.
 */
@Directive({
  selector: 'input[scInput]',
  host: {
    // Read by the input group and the control group (focus, invalid, border).
    'data-slot': 'control',
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScInput {
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-input-');
  private readonly styles = injectPreset().input;

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  // Bound automatically by the Field directive (FormUiControl contract).
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Do not surface invalid until the control has been touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  protected readonly class = computed(() => cn(this.styles, this.classInput()));

  constructor() {
    ɵwarnIfUnnamed('scInput');
  }
}
