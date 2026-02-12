import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicRatingFieldDemo } from './basic-rating-field-demo';

@Component({
  selector: 'app-basic-rating-field-demo-container',
  imports: [DemoContainer, BasicRatingFieldDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRatingFieldDemoContainer {
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
  selector: 'app-basic-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: \`
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
                si-star-icon
                class="size-6 transition-colors"
                [class.fill-yellow-400]="i <= rating()"
                [class.text-yellow-400]="i <= rating()"
                [class.text-gray-300]="i > rating()"
              ></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-sm text-muted-foreground">Rating: {{ rating() }} / 5</p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRatingFieldDemo {
  readonly rating = signal(3);
}`;
}
