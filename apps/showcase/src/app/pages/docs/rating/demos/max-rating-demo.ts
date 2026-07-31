import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiStarIcon],
  template: `
    <div class="flex flex-col gap-2">
      <div scRating [(value)]="rating">
        <div scRatingGroup>
          @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon class="size-5"></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Rating: {{ rating() }} / 10</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MaxRatingDemo {
  readonly rating = signal(7);
}
