import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { ScTocRegistry } from './toc-registry';

/**
 * A table of contents of its own: the headings and the `nav[scToc]` inside
 * are kept apart from the page's (an article in a page, a demo in the docs).
 */
@Directive({
  selector: '[scTocScope]',
  providers: [ScTocRegistry],
  host: {
    '[class]': 'class()',
  },
})
export class ScTocScope {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
