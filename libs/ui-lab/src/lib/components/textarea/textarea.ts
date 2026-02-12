import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, Directive, inject, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field/field';

@Directive({
  selector: 'textarea[sc-textarea]',
  host: {
    'data-slot': 'textarea',
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'invalid() || null',
    '[attr.disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScTextarea {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly formField = inject(FormField, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-textarea-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly invalid = computed(() => this.formField?.state().invalid() ?? false);

  readonly disabled = computed(
    () => this.formField?.state().disabled() ?? false,
  );

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
