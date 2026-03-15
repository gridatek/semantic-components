import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeFade]',
  host: {
    'data-slot': 'marquee-fade',
    '[class]': 'class()',
    '[attr.data-direction]': 'direction()',
    '[style.mask-image]': 'maskImage()',
    '[style.-webkit-mask-image]': 'maskImage()',
  },
})
export class ScMarqueeFade {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly fadeSize = input<string>('5rem');

  protected readonly class = computed(() =>
    cn('relative overflow-hidden', this.classInput()),
  );

  protected readonly maskImage = computed(() => {
    const size = this.fadeSize();
    const isVertical = this.direction() === 'vertical';

    if (isVertical) {
      return `linear-gradient(to bottom, transparent, black ${size}, black calc(100% - ${size}), transparent)`;
    }

    return `linear-gradient(to right, transparent, black ${size}, black calc(100% - ${size}), transparent)`;
  });
}
