import { Directive } from '@angular/core';

@Directive({
  selector: '[sc-infinite-scroll-end]',
  host: {
    'data-slot': 'infinite-scroll-end',
  },
})
export class ScInfiniteScrollEnd {}
