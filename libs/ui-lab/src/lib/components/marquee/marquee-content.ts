import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeContent]',
  host: {
    'data-slot': 'marquee-content',
    '[class]': 'class()',
  },
})
export class ScMarqueeContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex shrink-0 items-center justify-around', this.classInput()),
  );
}
