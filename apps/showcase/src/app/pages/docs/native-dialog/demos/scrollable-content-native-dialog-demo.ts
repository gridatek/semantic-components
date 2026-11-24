import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScNativeDialog,
  ScNativeDialogBody,
  ScNativeDialogClose,
  ScNativeDialogDescription,
  ScNativeDialogHeader,
  ScNativeDialogPortal,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Long content scrolls inside the dialog. */
@Component({
  selector: 'app-scrollable-content-native-dialog-demo',
  imports: [
    ScButton,
    ScNativeDialogProvider,
    ScNativeDialogTrigger,
    ScNativeDialogPortal,
    ScNativeDialog,
    ScNativeDialogBody,
    ScNativeDialogClose,
    ScNativeDialogHeader,
    ScNativeDialogTitle,
    ScNativeDialogDescription,
    SiXIcon,
  ],
  template: `
    <div scNativeDialogProvider>
      <button scButton variant="outline" scNativeDialogTrigger>
        Scrollable Content
      </button>
      <ng-template scNativeDialogPortal>
        <dialog scNativeDialog>
          <button scNativeDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>Scrollable Content</h2>
            <p scNativeDialogDescription>
              This is a dialog with scrollable content.
            </p>
          </div>
          <div scNativeDialogBody>
            @for (paragraph of paragraphs; track $index) {
              <p class="mb-4 leading-normal">{{ paragraph }}</p>
            }
          </div>
        </dialog>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableContentNativeDialogDemo {
  private readonly paragraphs = Array.from(
    { length: 10 },
    () =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  );
}
