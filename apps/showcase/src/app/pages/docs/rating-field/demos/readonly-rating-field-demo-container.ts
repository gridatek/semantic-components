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
  host: { class: 'block w-full' },
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
  ScRatingFieldItem,
  ScRatingIcon,
  ScRatingItemGroup,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-readonly-rating-field-demo',
  imports: [
    ScRatingField,
    ScRatingItemGroup,
    ScRatingFieldItem,
    ScRatingIcon,
    SiStarIcon,
  ],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div scRatingField [value]="4" [readonly]="true">
          <div scRatingItemGroup>
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span scRatingItem [value]="i">
                <svg siStarIcon scRatingIcon></svg>
              </span>
            }
          </div>
        </div>
        <p class="text-muted-foreground text-sm">Average: 4.0 / 5</p>
      </div>

      <div class="flex flex-col gap-2">
        <div scRatingField [value]="3.5" [readonly]="true" [allowHalf]="true">
          <div scRatingItemGroup>
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span scRatingItem [value]="i">
                <svg siStarIcon scRatingIcon></svg>
                <svg siStarIcon scRatingIcon></svg>
              </span>
            }
          </div>
        </div>
        <p class="text-muted-foreground text-sm">Average: 3.5 / 5</p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyRatingFieldDemo {}`;
}
