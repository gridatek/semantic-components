import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActionToastDemoContainer } from './demos/action-toast-demo-container';
import { BasicToastDemoContainer } from './demos/basic-toast-demo-container';
import { DestructiveToastDemoContainer } from './demos/destructive-toast-demo-container';
import { DurationToastDemoContainer } from './demos/duration-toast-demo-container';
import { TitleToastDemoContainer } from './demos/title-toast-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-toast-page',
  imports: [
    BasicToastDemoContainer,
    TitleToastDemoContainer,
    ActionToastDemoContainer,
    DestructiveToastDemoContainer,
    DurationToastDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Toast</h1>
        <p class="text-muted-foreground">
          A succinct message that is displayed temporarily to provide feedback.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-toast-demo-container />
        <app-title-toast-demo-container />
        <app-action-toast-demo-container />
        <app-destructive-toast-demo-container />
        <app-duration-toast-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToastPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'toast')!.status;
}
