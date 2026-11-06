import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScSheetNext,
  ScSheetNextDescription,
  ScSheetNextHeader,
  ScSheetNextPortal,
  ScSheetNextProvider,
  ScSheetNextTitle,
  ScSheetNextTrigger,
} from '@semantic-components/ui';

/** No ✕: Escape, a press on the backdrop, or your own close button in the footer. */
@Component({
  selector: 'app-no-close-button-sheet-next-demo',
  imports: [
    ScButton,
    ScSheetNext,
    ScSheetNextDescription,
    ScSheetNextHeader,
    ScSheetNextPortal,
    ScSheetNextProvider,
    ScSheetNextTitle,
    ScSheetNextTrigger,
  ],
  template: `
    <div scSheetNextProvider [(open)]="open">
      <button scButton scSheetNextTrigger variant="outline">Open</button>
      <ng-template scSheetNextPortal>
        <div scSheetNext>
          <div scSheetNextHeader>
            <h2 scSheetNextTitle>No close button</h2>
            <p scSheetNextDescription>
              Press Escape or the backdrop to close it.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonSheetNextDemo {
  protected readonly open = signal(false);
}
