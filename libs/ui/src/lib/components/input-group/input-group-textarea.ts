import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'textarea[sc-input-group-textarea]',
  host: {
    'data-slot': 'input-group-control',
    '[class]': 'class()',
  },
})
export class ScInputGroupTextarea {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 resize-none px-2.5 text-base md:text-sm outline-none placeholder:text-muted-foreground field-sizing-content min-h-16 min-w-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
