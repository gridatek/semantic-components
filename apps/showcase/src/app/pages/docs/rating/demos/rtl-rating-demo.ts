import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: from the right, ← raises it, the left half of a star its far half. */
@Component({
  selector: 'app-rtl-rating-demo',
  imports: [Dir, ScRating, ScRatingIcon, SiStarIcon],
  template: `
    <div dir="rtl" lang="ar">
      <div
        scRating
        [(value)]="score"
        [step]="0.5"
        aria-label="التقييم"
        valueText="{value} من {max} نجوم"
      >
        <ng-template scRatingIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRatingDemo {
  private readonly score = signal<number | null>(3.5);
}
