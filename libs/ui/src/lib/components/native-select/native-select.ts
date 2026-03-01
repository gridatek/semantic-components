import { _IdGenerator } from '@angular/cdk/a11y';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Directive({
  selector: 'select[scNativeSelect]',
  host: {
    'data-slot': 'native-select',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScNativeSelect {
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-native-select-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaDescribedByInput = input('', { alias: 'aria-describedby' });
  readonly size = input<'default' | 'sm'>('default');

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () => this.ariaDescribedByInput() || this.field?.descriptionId() || null,
  );

  protected readonly class = computed(() =>
    cn(
      'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 w-full min-w-0 appearance-none rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
      this.classInput(),
    ),
  );
}
