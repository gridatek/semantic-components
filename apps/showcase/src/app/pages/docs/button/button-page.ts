import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AsLinkButtonDemoContainer } from './demos/as-link-button-demo-container';
import { DisabledButtonDemoContainer } from './demos/disabled-button-demo-container';
import { DisabledLinkButtonDemoContainer } from './demos/disabled-link-button-demo-container';
import { LoadingButtonDemoContainer } from './demos/loading-button-demo-container';
import { SizesButtonDemoContainer } from './demos/sizes-button-demo-container';
import { VariantsButtonDemoContainer } from './demos/variants-button-demo-container';
import { WithIconsButtonDemoContainer } from './demos/with-icons-button-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-button-page',
  imports: [
    VariantsButtonDemoContainer,
    SizesButtonDemoContainer,
    WithIconsButtonDemoContainer,
    DisabledButtonDemoContainer,
    DisabledLinkButtonDemoContainer,
    AsLinkButtonDemoContainer,
    LoadingButtonDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Button</h1>
        <p class="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-variants-button-demo-container />
        <app-sizes-button-demo-container />
        <app-with-icons-button-demo-container />
        <app-disabled-button-demo-container />
        <app-disabled-link-button-demo-container />
        <app-as-link-button-demo-container />
        <app-loading-button-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'button')!
    .status;
}
