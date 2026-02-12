import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTooltipDemoContainer } from './demos/basic-tooltip-demo-container';
import { PositionsTooltipDemoContainer } from './demos/positions-tooltip-demo-container';
import { IconButtonTooltipDemoContainer } from './demos/icon-button-tooltip-demo-container';
import { DelayTooltipDemoContainer } from './demos/delay-tooltip-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    BasicTooltipDemoContainer,
    PositionsTooltipDemoContainer,
    IconButtonTooltipDemoContainer,
    DelayTooltipDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Tooltip</h1>
        <p class="text-muted-foreground">
          A simple directive-based tooltip for displaying text hints on hover or
          focus. For rich content with HTML, images, or interactive elements,
          use Hovercard instead.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-tooltip-demo-container />
        <app-positions-tooltip-demo-container />
        <app-icon-button-tooltip-demo-container />
        <app-delay-tooltip-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'tooltip')!
    .status;
}
