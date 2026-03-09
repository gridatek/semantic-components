import { Directive, inject } from '@angular/core';
import { SC_INFINITE_SCROLL } from './infinite-scroll';

@Directive({
  selector: '[scInfiniteScrollLoader]',
  host: {
    'data-slot': 'infinite-scroll-loader',
  },
})
export class ScInfiniteScrollLoader {
  readonly infiniteScroll = inject(SC_INFINITE_SCROLL);
}
