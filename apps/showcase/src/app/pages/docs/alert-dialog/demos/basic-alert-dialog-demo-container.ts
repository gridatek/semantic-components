import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAlertDialogDemo } from './basic-alert-dialog-demo';

@Component({
  selector: 'app-basic-alert-dialog-demo-container',
  imports: [DemoContainer, BasicAlertDialogDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-alert-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAlertDialogDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAlertDialogProvider,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialog,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogPortal,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-alert-dialog-demo',
  imports: [
    ScAlertDialogProvider,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialog,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogPortal,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
  ],
  encapsulation: ViewEncapsulation.None,
  template: \`
    <div sc-alert-dialog-provider>
      <button sc-button sc-alert-dialog-trigger variant="outline">
        Delete Account
      </button>
      <ng-template scAlertDialogPortal>
        <div sc-alert-dialog>
          <div sc-alert-dialog-header>
            <h2 sc-alert-dialog-title>Are you absolutely sure?</h2>
            <p sc-alert-dialog-description>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
          </div>
          <div sc-alert-dialog-footer>
            <button sc-alert-dialog-cancel>Cancel</button>
            <button sc-alert-dialog-action>Continue</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAlertDialogDemo {}`;
}
