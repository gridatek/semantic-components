import { Directive } from '@angular/core';

@Directive({
  selector: '[appToc]',
  host: {
    'data-toc': '',
    class: 'scroll-mt-16',
  },
})
export class TocHeading {}
