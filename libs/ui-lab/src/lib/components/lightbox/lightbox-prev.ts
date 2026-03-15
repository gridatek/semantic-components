import { Directive, computed, inject, input } from '@angular/core';
import { ScCarousel } from '@semantic-components/carousel';
import { cn } from '@semantic-components/ui';
import { SC_LIGHTBOX_PROVIDER } from './lightbox-provider';

@Directive({
  selector: 'button[scLightboxPrev]',
  host: {
    '[class]': 'class()',
    type: 'button',
    '[disabled]': '!carousel.canScrollPrev()',
    '[attr.aria-disabled]': '!carousel.canScrollPrev() || null',
    '(click)': 'carousel.scrollPrev()',
  },
})
export class ScLightboxPrev {
  readonly provider = inject(SC_LIGHTBOX_PROVIDER);
  readonly carousel = inject(ScCarousel);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      "absolute top-1/2 left-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 [&_svg:not([class*='size-'])]:size-6",
      this.classInput(),
    ),
  );
}
