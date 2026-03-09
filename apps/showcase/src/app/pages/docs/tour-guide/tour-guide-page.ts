import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FullTourGuideDemoContainer } from './demos/full-tour-guide-demo-container';
import { MinimalTourGuideDemoContainer } from './demos/minimal-tour-guide-demo-container';

@Component({
  selector: 'app-tour-guide-page',
  imports: [
    FullTourGuideDemoContainer,
    MinimalTourGuideDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>TourGuide</h1>
        <p class="text-muted-foreground">
          Step-by-step UI tour component for onboarding users and highlighting
          features.
        </p>
        <app-component-badges path="tour-guide" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-full-tour-guide-demo-container />
        <app-minimal-tour-guide-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TourGuidePage {}
