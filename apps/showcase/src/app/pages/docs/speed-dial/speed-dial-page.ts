import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSpeedDialDemoContainer } from './demos/basic-speed-dial-demo-container';
import { CustomIconsSpeedDialDemoContainer } from './demos/custom-icons-speed-dial-demo-container';
import { DirectionsSpeedDialDemoContainer } from './demos/directions-speed-dial-demo-container';
import { DisabledActionsSpeedDialDemoContainer } from './demos/disabled-actions-speed-dial-demo-container';
import { SizesSpeedDialDemoContainer } from './demos/sizes-speed-dial-demo-container';
import { WithoutLabelsSpeedDialDemoContainer } from './demos/without-labels-speed-dial-demo-container';

@Component({
  selector: 'app-speed-dial-page',
  imports: [
    BasicSpeedDialDemoContainer,
    DirectionsSpeedDialDemoContainer,
    CustomIconsSpeedDialDemoContainer,
    SizesSpeedDialDemoContainer,
    WithoutLabelsSpeedDialDemoContainer,
    DisabledActionsSpeedDialDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Speed Dial</h1>
        <p class="text-muted-foreground">
          A floating action button that expands to reveal a set of related
          actions.
        </p>
        <app-component-badges path="speed-dial" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-speed-dial-demo-container />
        <app-directions-speed-dial-demo-container />
        <app-custom-icons-speed-dial-demo-container />
        <app-sizes-speed-dial-demo-container />
        <app-without-labels-speed-dial-demo-container />
        <app-disabled-actions-speed-dial-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpeedDialPage {}
