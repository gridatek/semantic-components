import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicAlertDialogDemoContainer } from './demos/basic-alert-dialog-demo-container';
import { DestructiveAlertDialogDemoContainer } from './demos/destructive-alert-dialog-demo-container';

@Component({
  selector: 'app-alert-dialog-page',
  imports: [
    BasicAlertDialogDemoContainer,
    DestructiveAlertDialogDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Alert Dialog</h1>
        <p class="text-muted-foreground">
          A modal dialog that interrupts the user with important content and
          expects a response.
        </p>
        <app-component-badges path="alert-dialog" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-alert-dialog-demo-container />
        <app-destructive-alert-dialog-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertDialogPage {}
