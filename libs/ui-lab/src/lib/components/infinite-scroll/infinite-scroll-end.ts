import { Directive, inject } from '@angular/core';
import { SC_INFINITE_SCROLL } from './infinite-scroll';

@Directive({
  selector: '[scInfiniteScrollEnd]',
  host: {
    'data-slot': 'infinite-scroll-end',
  },
})
export class ScInfiniteScrollEnd {
  readonly infiniteScroll = inject(SC_INFINITE_SCROLL);
}
