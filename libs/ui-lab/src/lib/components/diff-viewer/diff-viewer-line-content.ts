import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'span[scDiffViewerLineContent]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerLineContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('px-2', this.classInput()));
}
