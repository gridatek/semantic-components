import { Directive } from '@angular/core';

@Directive({
  selector: 'div[scRangeSliderTrack]',
  host: {
    'aria-hidden': 'true',
    class: 'absolute h-1 w-full rounded-full bg-muted',
  },
})
export class ScRangeSliderTrack {}
