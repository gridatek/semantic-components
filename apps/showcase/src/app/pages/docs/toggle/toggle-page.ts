import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicToggleDemoContainer } from './demos/basic-toggle-demo-container';
import { DisabledToggleDemoContainer } from './demos/disabled-toggle-demo-container';
import { OutlineToggleDemoContainer } from './demos/outline-toggle-demo-container';
import { SizesToggleDemoContainer } from './demos/sizes-toggle-demo-container';
import { ToolbarToggleDemoContainer } from './demos/toolbar-toggle-demo-container';
import { WithTextToggleDemoContainer } from './demos/with-text-toggle-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-toggle-page',
  imports: [
    BasicToggleDemoContainer,
    OutlineToggleDemoContainer,
    WithTextToggleDemoContainer,
    SizesToggleDemoContainer,
    DisabledToggleDemoContainer,
    ToolbarToggleDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Toggle</h1>
        <p class="text-muted-foreground">
          A two-state button that can be either on or off.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-toggle-demo-container />
        <app-outline-toggle-demo-container />
        <app-with-text-toggle-demo-container />
        <app-sizes-toggle-demo-container />
        <app-disabled-toggle-demo-container />
        <app-toolbar-toggle-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TogglePage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'toggle')!
    .status;
}
