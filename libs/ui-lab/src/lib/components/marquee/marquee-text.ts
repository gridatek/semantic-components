import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scMarqueeText]',
  host: {
    'data-slot': 'marquee-text',
    '[class]': 'class()',
    '[style.--text-duration]': 'duration() + "s"',
    '[attr.data-pause-on-hover]': 'pauseOnHover() || null',
    '[attr.data-reverse]': 'reverse() || null',
  },
})
export class ScMarqueeText {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly duration = input<number>(20);
  readonly pauseOnHover = input<boolean>(true);
  readonly reverse = input<boolean>(false);

  protected readonly class = computed(() => cn('w-full', this.classInput()));
}
