import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * What scrolls, inside the viewport: at least as wide as its content, so a
 * row wider than the box overflows sideways. As Base UI's ScrollArea.Content.
 */
@Directive({
  selector: 'div[scScrollAreaNextContent]',
  host: { '[class]': 'class()' },
})
export class ScScrollAreaNextContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('min-w-fit', this.classInput()));
}
