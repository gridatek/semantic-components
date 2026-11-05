import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Long content scrolls inside the dialog. */
@Component({
  selector: 'app-scrollable-content-dialog-demo',
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
    SiXIcon,
  ],
  template: `
    <div scDialogProvider>
      <button scButton variant="outline" scDialogTrigger>
        Scrollable Content
      </button>
      <ng-template scDialogPortal>
        <div scDialog>
          <button scButton variant="ghost" size="icon-sm" scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>Scrollable Content</h2>
            <p scDialogDescription>This is a dialog with scrollable content.</p>
          </div>
          <div class="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
            @for (paragraph of paragraphs; track $index) {
              <p class="mb-4 leading-normal">{{ paragraph }}</p>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableContentDialogDemo {
  protected readonly paragraphs = Array.from(
    { length: 10 },
    () =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  );
}
