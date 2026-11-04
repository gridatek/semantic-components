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
import { SiCircleFadingPlusIcon } from '@semantic-icons/lucide-icons';

/** An icon in the media part, beside the title (above it on a phone). */
@Component({
  selector: 'app-media-alert-dialog-demo',
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
    SiCircleFadingPlusIcon,
  ],
  template: `
    <div scAlertDialogProvider>
      <button scButton scAlertDialogTrigger variant="outline">
        Share Project
      </button>
      <ng-template scAlertDialogPortal>
        <div scAlertDialog>
          <div scAlertDialogHeader>
            <div scAlertDialogMedia>
              <svg siCircleFadingPlusIcon></svg>
            </div>
            <h2 scAlertDialogTitle>Share this project?</h2>
            <p scAlertDialogDescription>
              Anyone with the link will be able to view and edit this project.
            </p>
          </div>
          <div scAlertDialogFooter>
            <button scAlertDialogCancel>Cancel</button>
            <button scAlertDialogAction>Share</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaAlertDialogDemo {}
