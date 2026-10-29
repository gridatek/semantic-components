import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * The steps of a run — an agent's searches, reads, commands — a line each.
 * Lines inside a link or a button take its focus ring.
 */
@Directive({
  selector: 'div[scTrace]',
  host: {
    'data-slot': 'trace',
    '[class]': 'class()',
  },
})
export class ScTrace {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-start *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:ring-3 *:has-[>[data-slot=trace-line]]:focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
