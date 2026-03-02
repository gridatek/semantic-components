import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlignEndPopoverDemoContainer } from './demos/align-end-popover-demo-container';
import { AlignStartPopoverDemoContainer } from './demos/align-start-popover-demo-container';
import { BasicPopoverDemoContainer } from './demos/basic-popover-demo-container';
import { LeftPopoverDemoContainer } from './demos/left-popover-demo-container';
import { RightPopoverDemoContainer } from './demos/right-popover-demo-container';
import { TopPopoverDemoContainer } from './demos/top-popover-demo-container';

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
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Popover</h1>
        <p class="text-muted-foreground">
          Displays rich content in a portal, triggered by a button.
        </p>
        <app-component-badges path="popover" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
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
export default class PopoverPage {}
