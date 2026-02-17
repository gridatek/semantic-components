import { Directive } from '@angular/core';

@Directive({
  selector: '[scInfiniteScrollEnd]',
  host: {
    'data-slot': 'infinite-scroll-end',
  },
})
export class ScInfiniteScrollEnd {}
