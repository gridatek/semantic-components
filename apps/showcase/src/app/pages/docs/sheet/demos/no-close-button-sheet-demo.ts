import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScKbd,
  ScSheet,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';

/** No ✕: Escape, a press on the backdrop, or your own close button in the footer. */
@Component({
  selector: 'app-no-close-button-sheet-demo',
  imports: [
    ScKbd,
    ScButton,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
  ],
  template: `
    <div scSheetProvider [(open)]="open">
      <button scButton scSheetTrigger variant="outline">Open</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <div scSheetHeader>
            <h2 scSheetTitle>No close button</h2>
            <p scSheetDescription>
              Press <kbd scKbd>Escape</kbd> or the backdrop to close it.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonSheetDemo {
  private readonly open = signal(false);
}
