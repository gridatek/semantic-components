import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSpotlightDemoContainer } from './demos/basic-spotlight-demo-container';
import { CustomOverlaySpotlightDemoContainer } from './demos/custom-overlay-spotlight-demo-container';
import { PlacementSpotlightDemoContainer } from './demos/placement-spotlight-demo-container';
import { InteractiveSpotlightDemoContainer } from './demos/interactive-spotlight-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-spotlight-page',
  imports: [
    BasicSpotlightDemoContainer,
    CustomOverlaySpotlightDemoContainer,
    PlacementSpotlightDemoContainer,
    InteractiveSpotlightDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Spotlight</h1>
        <p class="text-muted-foreground">
          Highlight specific UI elements with a spotlight overlay effect.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-spotlight-demo-container />
        <app-custom-overlay-spotlight-demo-container />
        <app-placement-spotlight-demo-container />
        <app-interactive-spotlight-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpotlightPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'spotlight')!
    .status;
}
