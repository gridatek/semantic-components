import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyRatingDemo } from './readonly-rating-demo';

@Component({
  selector: 'app-readonly-rating-demo-container',
  imports: [DemoContainer, ReadonlyRatingDemo],
  template: `
    <app-demo-container title="Readonly" [code]="code">
      <app-readonly-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyRatingDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-readonly-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div scRating [value]="4" [readonly]="true">
          <div scRatingGroup>
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
        <div scRating [value]="3.5" [readonly]="true" [allowHalf]="true">
          <div scRatingGroup>
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReadonlyRatingDemo {}`;
}
