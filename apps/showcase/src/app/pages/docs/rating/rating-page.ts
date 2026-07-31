import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicRatingDemoContainer } from './demos/basic-rating-demo-container';
import { CustomIconsRatingDemoContainer } from './demos/custom-icons-rating-demo-container';
import { DisabledRatingDemoContainer } from './demos/disabled-rating-demo-container';
import { FormRatingDemoContainer } from './demos/form-rating-demo-container';
import { HalfRatingDemoContainer } from './demos/half-rating-demo-container';
import { MaxRatingDemoContainer } from './demos/max-rating-demo-container';
import { ReadonlyRatingDemoContainer } from './demos/readonly-rating-demo-container';

@Component({
  selector: 'app-rating-page',
  imports: [
    BasicRatingDemoContainer,
    HalfRatingDemoContainer,
    ReadonlyRatingDemoContainer,
    DisabledRatingDemoContainer,
    CustomIconsRatingDemoContainer,
    MaxRatingDemoContainer,
    FormRatingDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Rating</h1>
        <p class="text-muted-foreground">
          A composable rating component for feedback and reviews.
        </p>
        <app-component-badges path="rating" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-rating-demo-container />
        <app-half-rating-demo-container />
        <app-readonly-rating-demo-container />
        <app-disabled-rating-demo-container />
        <app-custom-icons-rating-demo-container />
        <app-max-rating-demo-container />
        <app-form-rating-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RatingPage {}
