import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scInfiniteScrollSentinel]',
  host: {
    'data-slot': 'infinite-scroll-sentinel',
    '[class]': 'class()',
  },
})
export class ScInfiniteScrollSentinel {
  readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('h-px w-full', this.classInput()),
  );
}
