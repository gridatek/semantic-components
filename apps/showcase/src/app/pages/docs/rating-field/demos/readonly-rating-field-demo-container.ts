import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyRatingFieldDemo } from './readonly-rating-field-demo';

@Component({
  selector: 'app-readonly-rating-field-demo-container',
  imports: [DemoContainer, ReadonlyRatingFieldDemo],
  template: `
    <app-demo-container title="Readonly" [code]="code">
      <app-readonly-rating-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyRatingFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScRatingField,
  ScRatingItemGroup,
  ScRatingFieldItem,
} from '@semantic-components/ui-lab';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-readonly-rating-field-demo',
  imports: [ScRatingField, ScRatingItemGroup, ScRatingFieldItem, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div sc-rating-field [value]="4" [readonly]="true">
          <div sc-rating-item-group class="flex gap-0.5">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span sc-rating-item [value]="i">
                <svg
                  si-star-icon
                  class="size-6"
                  [class.fill-yellow-400]="i <= 4"
                  [class.text-yellow-400]="i <= 4"
                  [class.text-gray-300]="i > 4"
                ></svg>
              </span>
            }
          </div>
        </div>
        <p class="text-sm text-muted-foreground">Average: 4.0 / 5</p>
      </div>

      <div class="flex flex-col gap-2">
        <div sc-rating-field [value]="3.5" [readonly]="true" [allowHalf]="true">
          <div sc-rating-item-group class="flex gap-0.5">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span sc-rating-item [value]="i">
                <svg
                  si-star-icon
                  class="size-6"
                  [class.fill-yellow-400]="i <= 3.5"
                  [class.text-yellow-400]="i <= 3.5"
                  [class.text-gray-300]="i > 3.5"
                ></svg>
              </span>
            }
          </div>
        </div>
        <p class="text-sm text-muted-foreground">Average: 3.5 / 5</p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyRatingFieldDemo {}`;
}
