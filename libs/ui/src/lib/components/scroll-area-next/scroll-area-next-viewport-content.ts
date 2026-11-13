import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * What scrolls, inside the viewport: at least as wide as its content, so a
 * row wider than the box overflows sideways. Base UI's ScrollArea.Content,
 * named after the viewport it sits in (docs/content-body-naming.md).
 */
@Directive({
  selector: 'div[scScrollAreaNextViewportContent]',
  host: { '[class]': 'class()' },
})
export class ScScrollAreaNextViewportContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('min-w-fit', this.classInput()));
}
