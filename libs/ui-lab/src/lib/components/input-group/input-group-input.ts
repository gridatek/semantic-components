import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'input[sc-input-group-input]',
  host: {
    'data-slot': 'input-group-control',
    '[class]': 'class()',
  },
})
export class ScInputGroupInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent flex-1 h-full px-2.5 text-base md:text-sm outline-none placeholder:text-muted-foreground min-w-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
