import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRatingDemo } from './disabled-rating-demo';

@Component({
  selector: 'app-disabled-rating-demo-container',
  imports: [DemoContainer, DisabledRatingDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/rating/disabled-rating-demo"
      [code]="code"
    >
      <app-disabled-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRating, ScRatingIcon } from '@semantic-components/ui';
import { SiStarIcon } from '@semantic-icons/lucide-icons';

/** Disabled: out of the tab order, no press or key changes it. */
@Component({
  selector: 'app-disabled-rating-demo',
  imports: [ScRating, ScRatingIcon, SiStarIcon],
  template: \`
    <div
      scRating
      disabled
      [(value)]="score"
      aria-label="Rating"
      valueText="{value} out of {max} stars"
    >
      <ng-template scRatingIcon>
        <svg siStarIcon></svg>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledRatingDemo {
  private readonly score = signal<number | null>(2);
}`;
}
