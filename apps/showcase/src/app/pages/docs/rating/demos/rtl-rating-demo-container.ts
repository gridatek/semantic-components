import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlRatingDemo } from './rtl-rating-demo';

@Component({
  selector: 'app-rtl-rating-demo-container',
  imports: [DemoContainer, RtlRatingDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/rating/rtl-rating-demo"
      [code]="code"
    >
      <app-rtl-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRatingDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: from the right, ← raises it, the left half of a star its far half. */
@Component({
  selector: 'app-rtl-rating-demo',
  imports: [Dir, ScRating, ScRatingIcon, SiStarIcon],
  template: \`
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
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRatingDemo {
  private readonly score = signal<number | null>(3.5);
}`;
}
