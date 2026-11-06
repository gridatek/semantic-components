import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoCloseButtonSheetDemo } from './no-close-button-sheet-demo';

@Component({
  selector: 'app-no-close-button-sheet-demo-container',
  imports: [DemoContainer, NoCloseButtonSheetDemo],
  template: `
    <app-demo-container
      title="No close button"
      demoUrl="/demos/sheet/no-close-button-sheet-demo"
      [code]="code"
    >
      <app-no-close-button-sheet-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonSheetDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
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
    ScButton,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
  ],
  template: \`
    <div scSheetProvider [(open)]="open">
      <button scButton scSheetTrigger variant="outline">Open</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <div scSheetHeader>
            <h2 scSheetTitle>No close button</h2>
            <p scSheetDescription>Press Escape or the backdrop to close it.</p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonSheetDemo {
  protected readonly open = signal(false);
}`;
}
