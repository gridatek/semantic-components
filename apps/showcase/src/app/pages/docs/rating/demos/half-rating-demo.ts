import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** By halves (step 0.5): the left half of a star gives a half, the arrows move by halves. */
@Component({
  selector: 'app-half-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: `
    <div class="flex flex-col items-center gap-2">
      <div
        scRating
        [(value)]="score"
        [step]="0.5"
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
export class HalfRatingDemo {
  private readonly score = signal<number | null>(3.5);
}
