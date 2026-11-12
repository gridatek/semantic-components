import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });
  /** Running: its title shimmers; error: in red; pending: its icon dimmed. */
  readonly status = input<ScTraceLineStatus>();

  // Pending dims the icon, not the text: the text keeps its 4.5:1.
  protected readonly class = computed(() =>
    cn(this.styles.line, this.classInput()),
  );
}
