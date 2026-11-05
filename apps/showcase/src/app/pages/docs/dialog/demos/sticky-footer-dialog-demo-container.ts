import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StickyFooterDialogDemo } from './sticky-footer-dialog-demo';

@Component({
  selector: 'app-sticky-footer-dialog-demo-container',
  imports: [DemoContainer, StickyFooterDialogDemo],
  template: `
    <app-demo-container
      title="Sticky Footer"
      demoUrl="/demos/dialog/sticky-footer-dialog-demo"
      [code]="code"
    >
      <app-sticky-footer-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyFooterDialogDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** The content scrolls, the footer stays. */
@Component({
  selector: 'app-sticky-footer-dialog-demo',
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
    SiXIcon,
  ],
  template: \`
    <div scDialogProvider>
      <button scButton variant="outline" scDialogTrigger>Sticky Footer</button>
      <ng-template scDialogPortal>
        <div scDialog>
          <button scButton variant="ghost" size="icon-sm" scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>Sticky Footer</h2>
            <p scDialogDescription>
              This dialog has a sticky footer that stays visible while the
              content scrolls.
            </p>
          </div>
          <div class="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
            @for (paragraph of paragraphs; track $index) {
              <p class="mb-4 leading-normal">{{ paragraph }}</p>
            }
          </div>
          <div scDialogFooter>
            <button scButton variant="outline" scDialogClose>Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StickyFooterDialogDemo {
  protected readonly paragraphs = Array.from(
    { length: 10 },
    () =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  );
}`;
}
