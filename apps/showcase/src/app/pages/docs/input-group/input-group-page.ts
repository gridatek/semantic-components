import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicInputGroupDemoContainer } from './demos/basic-input-group-demo-container';
import { ButtonInputGroupDemoContainer } from './demos/button-input-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-input-group-page',
  imports: [
    BasicInputGroupDemoContainer,
    ButtonInputGroupDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Input Group</h1>
        <p class="text-muted-foreground">
          A composable input group for combining inputs with addons, buttons,
          and text.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-input-group-demo-container />
        <app-button-input-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'input-group')!
    .status;
}
