import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[scInfiniteScrollSentinel]',
  host: {
    'data-slot': 'infinite-scroll-sentinel',
    style: 'height: 1px; width: 100%;',
  },
})
export class ScInfiniteScrollSentinel {
  readonly elementRef = inject(ElementRef<HTMLElement>);
}
