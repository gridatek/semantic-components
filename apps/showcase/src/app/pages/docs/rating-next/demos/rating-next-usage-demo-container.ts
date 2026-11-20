import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RatingNextUsageDemo } from './rating-next-usage-demo';

@Component({
  selector: 'app-rating-next-usage-demo-container',
  imports: [DemoContainer, RatingNextUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      demoUrl="/demos/rating-next/rating-next-usage-demo"
      [code]="code"
    >
      <app-rating-next-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RatingNextUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRatingNext,
  ScRatingNextItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** A score out of five, read out by your value text; each star is your icon twice (empty, full). */
@Component({
  selector: 'app-rating-next-usage-demo',
  imports: [ScRatingNext, ScRatingNextItem, SiStarIcon],
  template: \`
    <div class="flex flex-col items-center gap-2">
      <div
        scRatingNext
        [(value)]="score"
        aria-label="Rating"
        valueText="{value} out of {max} stars"
      >
        @for (star of stars; track star) {
          <span scRatingNextItem>
            <svg siStarIcon></svg>
            <svg siStarIcon></svg>
          </span>
        }
      </div>
      <p class="text-muted-foreground text-sm tabular-nums">
        {{ score() ?? 0 }} out of 5
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RatingNextUsageDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(3);
}`;
}
