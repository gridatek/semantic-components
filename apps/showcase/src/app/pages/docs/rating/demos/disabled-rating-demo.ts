import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Disabled: out of the tab order, no press or key changes it. */
@Component({
  selector: 'app-disabled-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: `
    <div
      scRating
      disabled
      [(value)]="score"
      aria-label="Rating"
      valueText="{value} out of {max} stars"
    >
      <ng-template scRatingIcon>
        <svg siStarIcon></svg>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingDemo {
  private readonly score = signal<number | null>(2);
}
