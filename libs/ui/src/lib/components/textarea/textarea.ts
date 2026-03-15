import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'textarea[scTextarea]',
  host: {
    'data-slot': 'control',
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'invalid() || null',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScTextarea {
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly formField = inject(FormField, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-textarea-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly disabledInput = input<boolean, unknown>(false, {
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

  readonly invalid = computed(
    () =>
      (this.formField?.state().touched() &&
        this.formField?.state().invalid()) ??
      false,
  );

  readonly disabled = computed(
    () => this.formField?.state().disabled() ?? this.disabledInput(),
  );

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50 in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:h-full in-data-[slot=input-group]:focus-visible:ring-0 in-data-[slot=input-group]:focus-visible:border-transparent in-data-[slot=input-group]:aria-invalid:ring-0 in-data-[slot=input-group]:disabled:bg-transparent in-data-[slot=input-group]:dark:bg-transparent in-data-[slot=input-group]:dark:disabled:bg-transparent in-data-[slot=input-group]:resize-none in-data-[slot=input-group]:min-w-0',
      this.classInput(),
    ),
  );
}
