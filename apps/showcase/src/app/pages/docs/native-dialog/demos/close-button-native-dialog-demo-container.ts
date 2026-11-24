import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CloseButtonNativeDialogDemo } from './close-button-native-dialog-demo';

@Component({
  selector: 'app-close-button-native-dialog-demo-container',
  imports: [DemoContainer, CloseButtonNativeDialogDemo],
  template: `
    <app-demo-container
      title="Custom Close Button"
      demoUrl="/demos/native-dialog/close-button-native-dialog-demo"
      [code]="code"
    >
      <app-close-button-native-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CloseButtonNativeDialogDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScInput,
  ScLabel,
  ScNativeDialog,
  ScNativeDialogClose,
  ScNativeDialogDescription,
  ScNativeDialogFooter,
  ScNativeDialogHeader,
  ScNativeDialogPortal,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** scNativeDialogClose on any button: here the footer’s Close, as well as the ✕. */
@Component({
  selector: 'app-close-button-native-dialog-demo',
  imports: [
    ScButton,
    ScNativeDialogProvider,
    ScNativeDialogTrigger,
    ScNativeDialogPortal,
    ScNativeDialog,
    ScNativeDialogClose,
    ScNativeDialogHeader,
    ScNativeDialogTitle,
    ScNativeDialogDescription,
    ScNativeDialogFooter,
    ScField,
    ScLabel,
    ScInput,
    SiXIcon,
  ],
  template: \`
    <div scNativeDialogProvider>
      <button scButton variant="outline" scNativeDialogTrigger>Share</button>
      <ng-template scNativeDialogPortal>
        <dialog scNativeDialog class="sm:max-w-md">
          <button scNativeDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>Share link</h2>
            <p scNativeDialogDescription>
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
          <div scNativeDialogFooter class="sm:justify-start">
            <button scNativeDialogClose variant="default" size="default">
              Close
            </button>
          </div>
        </dialog>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CloseButtonNativeDialogDemo {}`;
}
