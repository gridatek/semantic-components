import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';

/** The block's header: its title, then its actions at the end. */
@Directive({
  selector: 'div[scCodeBlockHeader]',
  host: {
    'data-slot': 'code-block-header',
    '[class]': 'class()',
  },
})
export class ScCodeBlockHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly styles = injectPreset().codeBlock;

  protected readonly class = computed(() =>
    cn(
      this.styles.header,
      "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
