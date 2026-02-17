import { _IdGenerator } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'textarea[scTextarea]',
  host: {
    '[attr.data-slot]': 'dataSlot()',
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

  readonly variant = input<'default' | 'group'>('default');
  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  protected readonly dataSlot = computed(() =>
    this.variant() === 'group' ? 'input-group-control' : 'textarea',
  );

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
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
      this.variant() === 'group'
        ? 'rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 resize-none px-2.5 text-base md:text-sm outline-none placeholder:text-muted-foreground field-sizing-content min-h-16 min-w-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
        : 'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
