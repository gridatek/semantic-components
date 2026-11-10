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
import { SC_FIELD } from '../field';
import { ScRadioGroup } from './radio-group';

@Directive({
  // type="radio" stays in the markup: Signal Forms types a native radio's
  // [formField] by the template's type (a union value fails without it).
  selector: 'input[type="radio"][scRadio]',
  host: {
    'data-slot': 'radio',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
  },
})
export class ScRadio {
  private readonly styles = injectPreset().radioGroup;
  private readonly radioGroup = inject(ScRadioGroup, { optional: true });
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-radio-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', {
    alias: 'class',
  });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly disabledInput = input(false, {
    alias: 'disabled',
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

  readonly disabled = computed(
    () => this.disabledInput() || (this.radioGroup?.disabled() ?? false),
  );

  // Bound automatically by the Field directive (FormUiControl contract).
  // Value, checked and disabled already come from its native-input support;
  // aria-invalid does not, so it has to be surfaced here.
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);

  // Do not surface invalid until the control has been touched.
  protected readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  protected readonly class = computed(() =>
    cn(
      "appearance-none before:content-['']",
      this.styles.item,
      this.styles.dot,
      this.classInput(),
    ),
  );
}
