import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarquee]',
  host: {
    'data-slot': 'marquee',
    '[class]': 'class()',
    '[style.--duration]': 'duration() + "s"',
    '[style.--gap]': 'gap() + "px"',
    '[attr.data-direction]': 'direction()',
    '[attr.data-pause-on-hover]': 'pauseOnHover() || null',
    '[attr.data-reverse]': 'reverse() || null',
    '[attr.data-paused]': 'paused() || null',
  },
})
export class ScMarquee {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly duration = input<number>(40);
  readonly gap = input<number>(16);
  readonly pauseOnHover = input<boolean>(true);
  readonly reverse = input<boolean>(false);
  /** Stops the motion, e.g. from a pause button (WCAG 2.2.2). */
  readonly paused = input<boolean>(false);

  protected readonly class = computed(() => cn(this.classInput()));
}
