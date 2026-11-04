import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogMedia,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui';
import { SiBluetoothIcon } from '@semantic-icons/lucide-icons';

/** size="sm" with media: the icon above the title. */
@Component({
  selector: 'app-small-media-alert-dialog-demo',
  imports: [
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogMedia,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
    SiBluetoothIcon,
  ],
  template: `
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="outline">
        Show Dialog
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog size="sm">
          <div scAlertDialogHeader>
            <div scAlertDialogMedia>
              <svg siBluetoothIcon></svg>
            </div>
            <h2 scAlertDialogTitle>Allow accessory to connect?</h2>
            <p scAlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Don&apos;t allow</button>
            <button scAlertDialogAction>Allow</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SmallMediaAlertDialogDemo {}
