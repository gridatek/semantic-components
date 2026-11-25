import { Directive, computed, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';

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

  private readonly styles = injectStyle().codeBlock;

  private readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
