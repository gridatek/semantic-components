import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicPopoverDemoContainer } from './demos/basic-popover-demo-container';
import { TopPopoverDemoContainer } from './demos/top-popover-demo-container';
import { RightPopoverDemoContainer } from './demos/right-popover-demo-container';
import { LeftPopoverDemoContainer } from './demos/left-popover-demo-container';
import { AlignStartPopoverDemoContainer } from './demos/align-start-popover-demo-container';
import { AlignEndPopoverDemoContainer } from './demos/align-end-popover-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-popover-page',
  imports: [
    BasicPopoverDemoContainer,
    TopPopoverDemoContainer,
    RightPopoverDemoContainer,
    LeftPopoverDemoContainer,
    AlignStartPopoverDemoContainer,
    AlignEndPopoverDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Popover</h1>
        <p class="text-muted-foreground">
          Displays rich content in a portal, triggered by a button.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-popover-demo-container />
        <app-top-popover-demo-container />
        <app-right-popover-demo-container />
        <app-left-popover-demo-container />
        <app-align-start-popover-demo-container />
        <app-align-end-popover-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PopoverPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'popover')!
    .status;
}
