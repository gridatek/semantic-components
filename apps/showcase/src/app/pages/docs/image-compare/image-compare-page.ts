import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicImageCompareDemoContainer } from './demos/basic-image-compare-demo-container';
import { LabelsImageCompareDemoContainer } from './demos/labels-image-compare-demo-container';
import { NoLabelsImageCompareDemoContainer } from './demos/no-labels-image-compare-demo-container';
import { VerticalImageCompareDemoContainer } from './demos/vertical-image-compare-demo-container';
import { PositionImageCompareDemoContainer } from './demos/position-image-compare-demo-container';
import { ControlledImageCompareDemoContainer } from './demos/controlled-image-compare-demo-container';
import { SquareImageCompareDemoContainer } from './demos/square-image-compare-demo-container';
import { KeyboardImageCompareDemoContainer } from './demos/keyboard-image-compare-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-image-compare-page',
  imports: [
    BasicImageCompareDemoContainer,
    LabelsImageCompareDemoContainer,
    NoLabelsImageCompareDemoContainer,
    VerticalImageCompareDemoContainer,
    PositionImageCompareDemoContainer,
    ControlledImageCompareDemoContainer,
    SquareImageCompareDemoContainer,
    KeyboardImageCompareDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ImageCompare</h1>
        <p class="text-muted-foreground">
          Before/after image comparison slider with keyboard support.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-image-compare-demo-container />
        <app-labels-image-compare-demo-container />
        <app-no-labels-image-compare-demo-container />
        <app-vertical-image-compare-demo-container />
        <app-position-image-compare-demo-container />
        <app-controlled-image-compare-demo-container />
        <app-square-image-compare-demo-container />
        <app-keyboard-image-compare-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageComparePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'image-compare')!
    .status;
}
