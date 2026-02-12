import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FullTourGuideDemoContainer } from './demos/full-tour-guide-demo-container';
import { MinimalTourGuideDemoContainer } from './demos/minimal-tour-guide-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-tour-guide-page',
  imports: [
    FullTourGuideDemoContainer,
    MinimalTourGuideDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">TourGuide</h1>
        <p class="text-muted-foreground">
          Step-by-step UI tour component for onboarding users and highlighting
          features.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-full-tour-guide-demo-container />
        <app-minimal-tour-guide-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TourGuidePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'tour-guide')!
    .status;
}
