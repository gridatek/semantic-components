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
    <app-demo-container
      title="Basic"
      demoUrl="/demos/alert-dialog/basic-alert-dialog-demo"
      [code]="code"
    >
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
} from '@semantic-components/ui';
import { ScButton } from '@semantic-components/ui';

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
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="outline">
        Delete Account
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog>
          <div scAlertDialogHeader>
            <h2 scAlertDialogTitle>Are you absolutely sure?</h2>
            <p scAlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Cancel</button>
            <button scAlertDialogAction>Continue</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAlertDialogDemo {}`;
}
