import { Directive } from '@angular/core';

@Directive({
  selector: '[sc-infinite-scroll-loader]',
  host: {
    'data-slot': 'infinite-scroll-loader',
  },
})
export class ScInfiniteScrollLoader {}
