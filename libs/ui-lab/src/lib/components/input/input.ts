import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, Directive, inject, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'input[sc-input]',
  host: {
    'data-slot': 'input',
    '[attr.id]': 'id()',
    '[attr.aria-invalid]': 'invalid() || null',
    '[attr.disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScInput {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly formField = inject(FormField, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-input-');

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
      'dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
