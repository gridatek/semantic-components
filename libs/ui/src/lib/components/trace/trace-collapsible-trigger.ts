import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.collapsibleTrigger, this.classInput()),
  );
}
