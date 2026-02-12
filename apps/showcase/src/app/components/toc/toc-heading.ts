import { Directive } from '@angular/core';

@Directive({
  selector: '[toc]',
  host: {
    'data-toc': '',
    class: 'scroll-mt-16',
  },
})
export class TocHeading {}
