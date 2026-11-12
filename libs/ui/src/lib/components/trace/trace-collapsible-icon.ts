import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * The trigger's chevron — your SVG, pointing to the end (a chevron right):
 * turned down when open, mirrored in right-to-left when closed.
 */
@Directive({
  selector: 'span[scTraceCollapsibleIcon]',
  host: {
    'data-slot': 'trace-collapsible-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTraceCollapsibleIcon {
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.collapsibleIcon, this.classInput()),
  );
}
