import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicSpeedDialDemoContainer } from './demos/basic-speed-dial-demo-container';
import { DirectionsSpeedDialDemoContainer } from './demos/directions-speed-dial-demo-container';
import { CustomIconsSpeedDialDemoContainer } from './demos/custom-icons-speed-dial-demo-container';
import { SizesSpeedDialDemoContainer } from './demos/sizes-speed-dial-demo-container';
import { WithoutLabelsSpeedDialDemoContainer } from './demos/without-labels-speed-dial-demo-container';
import { DisabledActionsSpeedDialDemoContainer } from './demos/disabled-actions-speed-dial-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

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
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">SpeedDial</h1>
        <p class="text-muted-foreground">
          A floating action button that expands to reveal a set of related
          actions.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class SpeedDialPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'speed-dial')!
    .status;
}
