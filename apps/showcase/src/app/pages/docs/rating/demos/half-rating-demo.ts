import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-half-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiStarIcon],
  template: `
    <div class="flex flex-col gap-2">
      <div scRating [(value)]="rating" [allowHalf]="true">
        <div scRatingGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon></svg>
              <svg siStarIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Rating: {{ rating() }} / 5 (click left/right half of stars)
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingDemo {
  readonly rating = signal(3.5);
}
