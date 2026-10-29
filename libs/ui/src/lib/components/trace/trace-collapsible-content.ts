import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * A step's details, indented under it — inside the `scCollapsibleBody`.
 * Muted: a block with its own background inside sets `text-foreground`.
 */
@Directive({
  selector: 'div[scTraceCollapsibleContent]',
  host: {
    'data-slot': 'trace-collapsible-content',
    '[class]': 'class()',
  },
})
export class ScTraceCollapsibleContent {
  readonly classInput = input<string>('', { alias: 'class' });

  // Not shadcn's: text-sm, the lines' size, not the page's.
  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground ms-[calc(--spacing(2)-1px)] mt-2 mb-1 min-w-0 border-s ps-4 pe-1 text-sm leading-relaxed wrap-break-word',
      this.classInput(),
    ),
  );
}
