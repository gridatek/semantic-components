import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

/** Any icon, and a colour of yours on the rating (the full stars). */
@Component({
  selector: 'app-icons-rating-demo',
  imports: [ScRating, ScRatingIcon, SiHeartIcon],
  template: `
    <div
      scRating
      class="text-red-500"
      [(value)]="score"
      aria-label="How much you liked it"
      valueText="{value} of {max} hearts"
    >
      <ng-template scRatingIcon>
        <svg siHeartIcon></svg>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsRatingDemo {
  private readonly score = signal<number | null>(4);
}
