import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicRatingFieldDemoContainer } from './demos/basic-rating-field-demo-container';
import { HalfRatingFieldDemoContainer } from './demos/half-rating-field-demo-container';
import { ReadonlyRatingFieldDemoContainer } from './demos/readonly-rating-field-demo-container';
import { DisabledRatingFieldDemoContainer } from './demos/disabled-rating-field-demo-container';
import { CustomIconsRatingFieldDemoContainer } from './demos/custom-icons-rating-field-demo-container';
import { MaxRatingFieldDemoContainer } from './demos/max-rating-field-demo-container';
import { FormRatingFieldDemoContainer } from './demos/form-rating-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-rating-field-page',
  imports: [
    BasicRatingFieldDemoContainer,
    HalfRatingFieldDemoContainer,
    ReadonlyRatingFieldDemoContainer,
    DisabledRatingFieldDemoContainer,
    CustomIconsRatingFieldDemoContainer,
    MaxRatingFieldDemoContainer,
    FormRatingFieldDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Rating Field</h1>
        <p class="text-muted-foreground">
          A composable rating field for feedback and reviews.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-rating-field-demo-container />
        <app-half-rating-field-demo-container />
        <app-readonly-rating-field-demo-container />
        <app-disabled-rating-field-demo-container />
        <app-custom-icons-rating-field-demo-container />
        <app-max-rating-field-demo-container />
        <app-form-rating-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatingFieldPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'rating-field')!
    .status;
}
