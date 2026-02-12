import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicAlertDialogDemoContainer } from './demos/basic-alert-dialog-demo-container';
import { DestructiveAlertDialogDemoContainer } from './demos/destructive-alert-dialog-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-alert-dialog-page',
  imports: [
    BasicAlertDialogDemoContainer,
    DestructiveAlertDialogDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">AlertDialog</h1>
        <p class="text-muted-foreground">
          A modal dialog that interrupts the user with important content and
          expects a response.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-alert-dialog-demo-container />
        <app-destructive-alert-dialog-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertDialogPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'alert-dialog')!
    .status;
}
