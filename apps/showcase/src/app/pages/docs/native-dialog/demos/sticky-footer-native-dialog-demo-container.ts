import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StickyFooterNativeDialogDemo } from './sticky-footer-native-dialog-demo';

@Component({
  selector: 'app-sticky-footer-native-dialog-demo-container',
  imports: [DemoContainer, StickyFooterNativeDialogDemo],
  template: `
    <app-demo-container
      title="Sticky Footer"
      demoUrl="/demos/native-dialog/sticky-footer-native-dialog-demo"
      [code]="code"
    >
      <app-sticky-footer-native-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyFooterNativeDialogDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScNativeDialog,
  ScNativeDialogBody,
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

/** The content scrolls, the footer stays. */
@Component({
  selector: 'app-sticky-footer-native-dialog-demo',
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
    ScNativeDialogFooter,
    SiXIcon,
  ],
  template: \`
    <div scNativeDialogProvider>
      <button scButton variant="outline" scNativeDialogTrigger>Sticky Footer</button>
      <ng-template scNativeDialogPortal>
        <dialog scNativeDialog>
          <button scNativeDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scNativeDialogHeader>
            <h2 scNativeDialogTitle>Sticky Footer</h2>
            <p scNativeDialogDescription>
              This dialog has a sticky footer that stays visible while the
              content scrolls.
            </p>
          </div>
          <div scNativeDialogBody>
            @for (paragraph of paragraphs; track $index) {
              <p class="mb-4 leading-normal">{{ paragraph }}</p>
            }
          </div>
          <div scNativeDialogFooter>
            <button scNativeDialogClose variant="outline" size="default">
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
export class StickyFooterNativeDialogDemo {
  private readonly paragraphs = Array.from(
    { length: 10 },
    () =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  );
}`;
}
