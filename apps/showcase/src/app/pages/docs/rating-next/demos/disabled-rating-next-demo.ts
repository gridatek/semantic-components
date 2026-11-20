import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextItem } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Disabled: out of the tab order, no press or key changes it. */
@Component({
  selector: 'app-disabled-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextItem, SiStarIcon],
  template: `
    <div
      scRatingNext
      disabled
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingNextDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(2);
}
