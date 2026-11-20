import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlRatingNextDemo } from './rtl-rating-next-demo';

@Component({
  selector: 'app-rtl-rating-next-demo-container',
  imports: [DemoContainer, RtlRatingNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/rating-next/rtl-rating-next-demo"
      [code]="code"
    >
      <app-rtl-rating-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRatingNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRatingNext,
  ScRatingNextItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: from the right, ← raises it, the left half of a star its far half. */
@Component({
  selector: 'app-rtl-rating-next-demo',
  imports: [Dir, ScRatingNext, ScRatingNextItem, SiStarIcon],
  template: \`
    <div dir="rtl" lang="ar">
      <div
        scRatingNext
        [(value)]="score"
        [step]="0.5"
        aria-label="التقييم"
        valueText="{value} من {max} نجوم"
      >
        @for (star of stars; track star) {
          <span scRatingNextItem>
            <svg siStarIcon></svg>
            <svg siStarIcon></svg>
          </span>
        }
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRatingNextDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(3.5);
}`;
}
