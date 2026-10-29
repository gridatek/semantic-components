import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** Where a step is: still running, failed, waiting — done when not set. */
export type ScTraceLineStatus = 'running' | 'error' | 'pending';

/**
 * One step: its icon, its title, its description. Text on its own; a link or
 * a button around it makes it one.
 */
@Directive({
  selector: 'span[scTraceLine]',
  host: {
    'data-slot': 'trace-line',
    '[attr.data-status]': 'status()',
    '[class]': 'class()',
  },
})
export class ScTraceLine {
  readonly classInput = input<string>('', { alias: 'class' });
  /** Running: its title shimmers; error: in red; pending: its icon dimmed. */
  readonly status = input<ScTraceLineStatus>();

  // Pending dims the icon, not the text: the text keeps its 4.5:1.
  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:*:data-[slot=trace-icon]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer flex w-fit max-w-full min-w-0 items-center gap-2 text-sm transition-colors',
      this.classInput(),
    ),
  );
}
