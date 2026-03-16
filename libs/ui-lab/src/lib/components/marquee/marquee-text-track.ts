import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeTextTrack]',
  host: {
    'data-slot': 'marquee-text-track',
    '[class]': 'class()',
  },
})
export class ScMarqueeTextTrack {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('whitespace-nowrap', this.classInput()),
  );
}
