import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoCloseButtonNativeDialogDemo } from './no-close-button-native-dialog-demo';

@Component({
  selector: 'app-no-close-button-native-dialog-demo-container',
  imports: [DemoContainer, NoCloseButtonNativeDialogDemo],
  template: `
    <app-demo-container
      title="No Close Button"
      demoUrl="/demos/native-dialog/no-close-button-native-dialog-demo"
      [code]="code"
    >
      <app-no-close-button-native-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonNativeDialogDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScNativeDialog,
  ScNativeDialogDescription,
  ScNativeDialogHeader,
  ScNativeDialogPortal,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
} from '@semantic-components/ui';

/** No ✕: Escape or a click outside closes it. */
@Component({
  selector: 'app-no-close-button-native-dialog-demo',
  imports: [
    ScButton,
    ScNativeDialogProvider,
    ScNativeDialogTrigger,
    ScNativeDialogPortal,
    ScNativeDialog,
    ScNativeDialogHeader,
    ScNativeDialogTitle,
    ScNativeDialogDescription,
  ],
  template: \`
    <div scNativeDialogProvider>
      <button scButton variant="outline" scNativeDialogTrigger>
        No Close Button
      </button>
      <ng-template scNativeDialogPortal>
        <dialog scNativeDialog>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>No Close Button</h2>
            <p scNativeDialogDescription>
              This dialog doesn't have a close button in the top-right corner.
            </p>
          </div>
        </dialog>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCloseButtonNativeDialogDemo {}`;
}
