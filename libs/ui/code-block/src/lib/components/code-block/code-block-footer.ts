import { Directive, computed, input } from '@angular/core';
import { cn, injectPreset } from '@semantic-components/ui';

/** The block's footer: a note, a status, under the code. */
@Directive({
  selector: 'div[scCodeBlockFooter]',
  host: {
    'data-slot': 'code-block-footer',
    '[class]': 'class()',
  },
})
export class ScCodeBlockFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly styles = injectPreset().codeBlock;

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
