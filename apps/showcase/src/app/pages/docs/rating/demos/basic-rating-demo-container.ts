import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicRatingDemo } from './basic-rating-demo';

@Component({
  selector: 'app-basic-rating-demo-container',
  imports: [DemoContainer, BasicRatingDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicRatingDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRating [(value)]="rating">
        <div scRatingGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">Rating: {{ rating() }} / 5</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicRatingDemo {
  readonly rating = signal(3);
}`;
}
