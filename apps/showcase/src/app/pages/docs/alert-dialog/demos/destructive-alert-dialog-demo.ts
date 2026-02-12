import {
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
  encapsulation: ViewEncapsulation.None,
  template: `
    <div sc-alert-dialog-provider>
      <button sc-button sc-alert-dialog-trigger variant="destructive">
        Delete All
      </button>
      <ng-template scAlertDialogPortal>
        <div sc-alert-dialog>
          <div sc-alert-dialog-header>
            <h2 sc-alert-dialog-title>Delete all items?</h2>
            <p sc-alert-dialog-description>
              This will permanently delete all items in your collection. This
              action cannot be reversed.
            </p>
          </div>
          <div sc-alert-dialog-footer>
            <button sc-alert-dialog-cancel>Cancel</button>
            <button sc-alert-dialog-action variant="destructive">
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
