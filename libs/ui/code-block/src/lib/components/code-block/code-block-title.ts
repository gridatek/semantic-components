import { Directive, computed, input } from '@angular/core';
import { cn, injectPreset } from '@semantic-components/ui';

/** The block's title — a file name, a language; an icon of yours before it. */
@Directive({
  selector: 'div[scCodeBlockTitle]',
  host: {
    'data-slot': 'code-block-title',
    '[class]': 'class()',
  },
})
export class ScCodeBlockTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly styles = injectPreset().codeBlock;

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
