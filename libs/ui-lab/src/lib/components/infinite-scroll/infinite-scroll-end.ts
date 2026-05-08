import { Directive, inject } from '@angular/core';
import { SC_INFINITE_SCROLL } from './infinite-scroll';

@Directive({
  selector: '[scInfiniteScrollEnd]',
  host: {},
})
export class ScInfiniteScrollEnd {
  readonly infiniteScroll = inject(SC_INFINITE_SCROLL);
}
