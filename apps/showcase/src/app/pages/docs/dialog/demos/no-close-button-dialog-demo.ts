import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';

/** No ✕: Escape or a click outside closes it. */
@Component({
  selector: 'app-no-close-button-dialog-demo',
  imports: [
    ScButton,
    ScDialogProvider,
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
  ],
  template: `
    <div scDialogProvider>
      <button scButton variant="outline" scDialogTrigger>
        No Close Button
      </button>
      <ng-template scDialogPortal>
        <div scDialog>
          <div scDialogHeader>
            <h2 scDialogTitle>No Close Button</h2>
            <p scDialogDescription>
              This dialog doesn't have a close button in the top-right corner.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonDialogDemo {}
