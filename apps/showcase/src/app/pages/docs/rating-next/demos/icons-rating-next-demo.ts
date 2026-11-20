import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextItem } from '@semantic-components/ui';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

/** Any icon, and a colour of yours on the stars (the full icon's). */
@Component({
  selector: 'app-icons-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextItem, SiHeartIcon],
  template: `
    <div
      scRatingNext
      [(value)]="score"
      aria-label="How much you liked it"
      valueText="{value} of {max} hearts"
    >
      @for (star of stars; track star) {
        <span scRatingNextItem class="text-red-500">
          <svg siHeartIcon></svg>
          <svg siHeartIcon></svg>
        </span>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsRatingNextDemo {
  private readonly stars = [1, 2, 3, 4, 5];
  private readonly score = signal<number | null>(4);
}
