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
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingFieldGroup,
    ScRatingFieldItem,
    ScRatingFieldIcon,
    SiHeartIcon,
  ],
  template: `
    <div class="flex flex-col gap-2">
      <div
        scRatingField
        [(value)]="rating"
        [style.--sc-rating-active-color]="'var(--color-red-500)'"
      >
        <div scRatingFieldGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingFieldItem [value]="i">
              <svg siHeartIcon scRatingFieldIcon></svg>
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
export class CustomIconsRatingFieldDemo {
  readonly rating = signal(4);
}
