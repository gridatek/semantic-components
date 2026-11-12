import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';

/**
 * The block's buttons (copy…). In the header: at its end. Straight in the
 * block: over the code at the top end, shown on hover or focus (always on a
 * touch screen).
 */
@Directive({
  selector: 'div[scCodeBlockActions]',
  host: {
    'data-slot': 'code-block-actions',
    '[class]': 'class()',
  },
})
export class ScCodeBlockActions {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly styles = injectPreset().codeBlock;

  protected readonly class = computed(() =>
    cn(this.styles.actions, this.classInput()),
  );
}
