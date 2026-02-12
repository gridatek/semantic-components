import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingItemGroup,
  ScRatingFieldItem,
} from '@semantic-components/ui-lab';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiHeartIcon],
  template: `
    <div class="flex flex-col gap-2">
      <div sc-rating-field [(value)]="rating">
        <div sc-rating-item-group class="flex gap-0.5">
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span
              sc-rating-item
              [value]="i"
              class="cursor-pointer transition-transform hover:scale-110"
            >
              <svg
                si-heart-icon
                class="size-6 transition-colors"
                [class.fill-red-500]="i <= rating()"
                [class.text-red-500]="i <= rating()"
                [class.text-gray-300]="i > rating()"
              ></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-sm text-muted-foreground">Hearts: {{ rating() }} / 5</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsRatingFieldDemo {
  readonly rating = signal(4);
}
