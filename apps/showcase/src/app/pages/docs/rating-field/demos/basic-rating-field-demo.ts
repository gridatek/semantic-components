import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingFieldGroup,
  ScRatingFieldIcon,
  ScRatingFieldItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingFieldGroup,
    ScRatingFieldItem,
    ScRatingFieldIcon,
    SiStarIcon,
  ],
  template: `
    <div class="flex flex-col gap-2">
      <div scRatingField [(value)]="rating">
        <div scRatingFieldGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingFieldItem [value]="i">
              <svg siStarIcon scRatingFieldIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Rating: {{ rating() }} / 5</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRatingFieldDemo {
  readonly rating = signal(3);
}
