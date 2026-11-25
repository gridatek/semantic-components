import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'textarea[scTextarea]',
  host: {
    'data-slot': 'control',
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'ariaInvalid()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScTextarea {
  private readonly styles = injectStyle().textarea;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-textarea-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
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

  // Do not surface invalid until the control has been touched.
  private readonly ariaInvalid = computed(
    () => (this.touched() && this.invalid()) || null,
  );

  private readonly class = computed(() => cn(this.styles, this.classInput()));
}
