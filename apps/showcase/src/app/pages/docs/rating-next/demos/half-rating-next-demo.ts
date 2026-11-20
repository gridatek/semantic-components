import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextItem } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** By halves (step 0.5): the left half of a star gives a half, the arrows move by halves. */
@Component({
  selector: 'app-half-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextItem, SiStarIcon],
  template: `
    <div class="flex flex-col items-center gap-2">
      <div
        scRatingNext
        [(value)]="score"
        [step]="0.5"
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HalfRatingNextDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(3.5);
}
