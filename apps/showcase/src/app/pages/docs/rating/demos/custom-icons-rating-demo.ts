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
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiHeartIcon],
  template: `
    <div class="flex flex-col gap-2">
      <div
        scRating
        [(value)]="rating"
        [style.--sc-rating-active-color]="'var(--color-red-500)'"
      >
        <div scRatingGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siHeartIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Hearts: {{ rating() }} / 5</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsRatingDemo {
  readonly rating = signal(4);
}
