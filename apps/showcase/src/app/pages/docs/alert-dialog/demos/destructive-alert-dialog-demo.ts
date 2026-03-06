import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
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
} from '@semantic-components/ui';

@Component({
  selector: 'app-destructive-alert-dialog-demo',
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="destructive">
        Delete All
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog>
          <div scAlertDialogHeader>
            <h2 scAlertDialogTitle>Delete all items?</h2>
            <p scAlertDialogDescription>
              This will permanently delete all items in your collection. This
              action cannot be reversed.
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Cancel</button>
            <button scAlertDialogAction variant="destructive">
              Delete All
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestructiveAlertDialogDemo {}
