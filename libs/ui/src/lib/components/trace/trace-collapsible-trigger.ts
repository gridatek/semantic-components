import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * The step's line as the button that opens it — on a `scCollapsibleTrigger`,
 * which gives it `aria-expanded`. Looks like the line, not a button.
 */
@Directive({
  selector: 'button[scTraceCollapsibleTrigger]',
  host: {
    'data-slot': 'trace-collapsible-trigger',
    '[class]': 'class()',
  },
})
export class ScTraceCollapsibleTrigger {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group/trace-collapsible-trigger text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 has-[[data-status=error]]:text-destructive flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-start transition-colors outline-none focus-visible:ring-3',
      this.classInput(),
    ),
  );
}
