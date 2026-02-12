import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaxRatingFieldDemo } from './max-rating-field-demo';

@Component({
  selector: 'app-max-rating-field-demo-container',
  imports: [DemoContainer, MaxRatingFieldDemo],
  template: `
    <app-demo-container title="Custom Maximum" [code]="code">
      <app-max-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxRatingFieldDemoContainer {
  readonly code = `import {
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
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-max-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div sc-rating-field [(value)]="rating">
        <div sc-rating-item-group class="flex gap-0.5">
          @for (i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; track i) {
            <span
              sc-rating-item
              [value]="i"
              class="cursor-pointer transition-transform hover:scale-110"
            >
              <svg
                si-star-icon
                class="size-5 transition-colors"
                [class.fill-yellow-400]="i <= rating()"
                [class.text-yellow-400]="i <= rating()"
                [class.text-gray-300]="i > rating()"
              ></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-sm text-muted-foreground">Rating: {{ rating() }} / 10</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxRatingFieldDemo {
  readonly rating = signal(7);
}`;
}
