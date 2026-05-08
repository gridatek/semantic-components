import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeTextSegment]',
  host: {
    '[class]': 'class()',
  },
})
export class ScMarqueeTextSegment {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-block px-4', this.classInput()),
  );
}
