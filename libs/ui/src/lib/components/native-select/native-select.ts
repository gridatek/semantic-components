import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { SC_FIELD } from '../field';

/**
 * The browser's own select, in the preset's look: its list, keyboard and
 * mobile picker are the browser's. In a `scNativeSelectContainer`, beside
 * your chevron. Its id and description from a `scField`; `[formField]` on it.
 */
@Directive({
  selector: 'select[scNativeSelect]',
  host: {
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.disabled]': 'disabled() || null',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScNativeSelect {
  private readonly styles = injectPreset().nativeSelect;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-native-select-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  /** Its height: `default`, or `sm` (smaller). */
  readonly size = input<'default' | 'sm'>('default');
  // Bound automatically by the Field directive (FormUiControl contract).
  readonly invalid = input<boolean>(false);
  readonly touched = input<boolean>(false);
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  private readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  private readonly ariaDescribedBy = computed(
    () =>
      this.ariaDescribedByInput() ||
      this.field?.descriptionIds().join(' ') ||
      null,
  );

  // Not invalid until it has been touched.
  private readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  private readonly class = computed(() =>
    cn(this.styles.select, this.classInput()),
  );
}
