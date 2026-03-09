import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTooltipDemoContainer } from './demos/basic-tooltip-demo-container';
import { DelayTooltipDemoContainer } from './demos/delay-tooltip-demo-container';
import { IconButtonTooltipDemoContainer } from './demos/icon-button-tooltip-demo-container';
import { PositionsTooltipDemoContainer } from './demos/positions-tooltip-demo-container';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    BasicTooltipDemoContainer,
    PositionsTooltipDemoContainer,
    IconButtonTooltipDemoContainer,
    DelayTooltipDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tooltip</h1>
        <p class="text-muted-foreground">
          A simple directive-based tooltip for displaying text hints on hover or
          focus. For rich content with HTML, images, or interactive elements,
          use Hovercard instead.
        </p>
        <app-component-badges path="tooltip" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
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
export default class TooltipPage {}
