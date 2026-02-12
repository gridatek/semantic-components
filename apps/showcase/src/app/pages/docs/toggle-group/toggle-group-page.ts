import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DisabledToggleGroupDemoContainer } from './demos/disabled-toggle-group-demo-container';
import { MultipleToggleGroupDemoContainer } from './demos/multiple-toggle-group-demo-container';
import { OutlineToggleGroupDemoContainer } from './demos/outline-toggle-group-demo-container';
import { SingleToggleGroupDemoContainer } from './demos/single-toggle-group-demo-container';
import { SizesToggleGroupDemoContainer } from './demos/sizes-toggle-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-toggle-group-page',
  imports: [
    SingleToggleGroupDemoContainer,
    MultipleToggleGroupDemoContainer,
    OutlineToggleGroupDemoContainer,
    SizesToggleGroupDemoContainer,
    DisabledToggleGroupDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ToggleGroup</h1>
        <p class="text-muted-foreground">
          A set of two-state buttons that can be toggled on or off.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-single-toggle-group-demo-container />
        <app-multiple-toggle-group-demo-container />
        <app-outline-toggle-group-demo-container />
        <app-sizes-toggle-group-demo-container />
        <app-disabled-toggle-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToggleGroupPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'toggle-group')!
    .status;
}
