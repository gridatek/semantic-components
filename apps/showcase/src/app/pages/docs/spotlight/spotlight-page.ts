import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSpotlightDemoContainer } from './demos/basic-spotlight-demo-container';
import { CustomOverlaySpotlightDemoContainer } from './demos/custom-overlay-spotlight-demo-container';
import { InteractiveSpotlightDemoContainer } from './demos/interactive-spotlight-demo-container';
import { PlacementSpotlightDemoContainer } from './demos/placement-spotlight-demo-container';

@Component({
  selector: 'app-spotlight-page',
  imports: [
    BasicSpotlightDemoContainer,
    CustomOverlaySpotlightDemoContainer,
    PlacementSpotlightDemoContainer,
    InteractiveSpotlightDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Spotlight</h1>
        <p class="text-muted-foreground">
          Highlight specific UI elements with a spotlight overlay effect.
        </p>
        <app-component-badges path="spotlight" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
export default class SpotlightPage {}
