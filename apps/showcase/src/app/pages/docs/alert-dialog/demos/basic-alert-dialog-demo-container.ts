import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAlertDialogDemo } from './basic-alert-dialog-demo';

@Component({
  selector: 'app-basic-alert-dialog-demo-container',
  imports: [DemoContainer, BasicAlertDialogDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/alert-dialog/basic-alert-dialog-demo"
      [code]="code"
    >
      <app-basic-alert-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAlertDialogDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui';

/** A title, a description, Cancel and the action. Cancel first: the least harmful answer, and focused first. */
@Component({
  selector: 'app-basic-alert-dialog-demo',
  imports: [
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
  ],
  template: \`
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="outline">
        Show Dialog
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAlertDialogDemo {}`;
}
