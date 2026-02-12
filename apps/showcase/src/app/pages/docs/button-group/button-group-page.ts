import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonGroupDemoContainer } from './demos/button-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-button-group-page',
  imports: [ButtonGroupDemoContainer, TocHeading, ComponentStatusBadge],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Button Group</h1>
        <p class="text-muted-foreground">
          Groups buttons together with merged borders and rounding.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-button-group-demo-container />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonGroupPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'button-group')!
    .status;
}
