import { Directive } from '@angular/core';

@Directive({
  selector: '[scInfiniteScrollLoader]',
  host: {
    'data-slot': 'infinite-scroll-loader',
  },
})
export class ScInfiniteScrollLoader {}
