import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DefaultAlertDemoContainer } from './demos/default-alert-demo-container';
import { DestructiveAlertDemoContainer } from './demos/destructive-alert-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-alert-page',
  imports: [
    DefaultAlertDemoContainer,
    DestructiveAlertDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Alert</h1>
        <p class="text-muted-foreground">
          Displays a callout for important information.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-default-alert-demo-container />
        <app-destructive-alert-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'alert')!.status;
}
