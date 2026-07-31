import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRatingDemo } from './disabled-rating-demo';

@Component({
  selector: 'app-disabled-rating-demo-container',
  imports: [DemoContainer, DisabledRatingDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScRating,
  ScRatingGroup,
  ScRatingIcon,
  ScRatingItem,
} from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-rating-demo',
  imports: [ScRating, ScRatingGroup, ScRatingItem, ScRatingIcon, SiStarIcon],
  template: \`
    <div class="flex flex-col gap-2">
      <div scRating [(value)]="rating" [disabled]="true">
        <div scRatingGroup>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <span scRatingItem [value]="i">
              <svg siStarIcon scRatingIcon></svg>
            </span>
          }
        </div>
      </div>
      <p class="text-muted-foreground text-sm">
        Rating: {{ rating() }} / 5 (disabled)
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingDemo {
  readonly rating = signal(2);
}`;
}
