import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
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
  private readonly styles = injectPreset().trace;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );
}
