import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScField,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** scDialogClose on any button: here the footer’s Close, as well as the ✕. */
@Component({
  selector: 'app-close-button-dialog-demo',
  imports: [
    ScButton,
    ScDialogProvider,
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScDialogClose,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScField,
    ScLabel,
    ScInput,
    SiXIcon,
  ],
  template: `
    <div scDialogProvider>
      <button scButton variant="outline" scDialogTrigger>Share</button>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-md">
          <button scButton variant="ghost" size="icon-sm" scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>Share link</h2>
            <p scDialogDescription>
              Anyone who has this link will be able to view this.
            </p>
          </div>
          <div scField>
            <label scLabel class="sr-only">Link</label>
            <input
              scInput
              value="https://semantic-components.dev/docs/components/dialog"
              readonly
            />
          </div>
          <div scDialogFooter class="sm:justify-start">
            <button scButton scDialogClose>Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CloseButtonDialogDemo {}
