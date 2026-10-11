import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scMarqueeTextSegment]',
  host: {
    'data-slot': 'marquee-text-segment',
    '[class]': 'class()',
    '[attr.aria-hidden]': 'repeat() || null',
  },
})
export class ScMarqueeTextSegment {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Repeats of the first segment are hidden from assistive technology. */
  protected readonly repeat = signal(false);

  protected readonly class = computed(() =>
    cn('inline-block px-4', this.classInput()),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      const first = element.parentElement?.querySelector(
        '[data-slot=marquee-text-segment]',
      );
      this.repeat.set(first !== element);
    });
  }
}
