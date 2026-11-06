import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NonModalDrawerDemo } from './non-modal-drawer-demo';

@Component({
  selector: 'app-non-modal-drawer-demo-container',
  imports: [DemoContainer, NonModalDrawerDemo],
  template: `
    <app-demo-container
      title="Non-modal"
      demoUrl="/demos/drawer/non-modal-drawer-demo"
      [code]="code"
    >
      <app-non-modal-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NonModalDrawerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDrawer,
  ScDrawerClose,
  ScDrawerFooter,
  ScDrawerHandle,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

/** [modal]="false": no backdrop, the page stays usable; disablePointerDismissal: a press outside leaves it open. */
@Component({
  selector: 'app-non-modal-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerFooter,
    ScDrawerHandle,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: \`
    <div
      scDrawerProvider
      [modal]="false"
      disablePointerDismissal
      swipeDirection="right"
    >
      <button scButton scDrawerTrigger variant="outline">Non modal</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHandle></div>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Non modal drawer</h2>
          </div>
          <div class="flex-1 p-4">
            <div
              class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
            ></div>
          </div>
          <div scDrawerFooter>
            <button scDrawerClose variant="default">Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NonModalDrawerDemo {}`;
}
