import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-alert-dialog-usage-demo',
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
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlertDialogUsageDemo {}
