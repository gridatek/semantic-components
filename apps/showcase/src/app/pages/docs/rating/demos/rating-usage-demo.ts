import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** A score out of five, read out by your value text; your icon, once: the rating draws the stars. */
@Component({
  selector: 'app-rating-usage-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: `
    <div class="flex flex-col items-center gap-2">
      <div
        scRating
        [(value)]="score"
        aria-label="Rating"
        valueText="{value} out of {max} stars"
      >
        <ng-template scRatingIcon>
          <svg siStarIcon></svg>
        </ng-template>
      </div>
      <p class="text-muted-foreground text-sm tabular-nums">
        {{ score() ?? 0 }} out of 5
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RatingUsageDemo {
  private readonly score = signal<number | null>(3);
}
