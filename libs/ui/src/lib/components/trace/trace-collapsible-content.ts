import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * A step's details, indented under it — inside the `scCollapsiblePanel`.
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
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });

  // Not shadcn's: text-sm, the lines' size, not the page's.
  protected readonly class = computed(() =>
    cn(this.styles.collapsibleContent, this.classInput()),
  );
}
