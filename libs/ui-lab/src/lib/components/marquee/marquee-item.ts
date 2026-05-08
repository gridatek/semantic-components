import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeItem]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMarqueeItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('shrink-0', this.classInput()));
}
