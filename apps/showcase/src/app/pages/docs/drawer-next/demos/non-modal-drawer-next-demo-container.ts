import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NonModalDrawerNextDemo } from './non-modal-drawer-next-demo';

@Component({
  selector: 'app-non-modal-drawer-next-demo-container',
  imports: [DemoContainer, NonModalDrawerNextDemo],
  template: `
    <app-demo-container
      title="Non-modal"
      demoUrl="/demos/drawer-next/non-modal-drawer-next-demo"
      [code]="code"
    >
      <app-non-modal-drawer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NonModalDrawerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDrawerNext,
  ScDrawerNextClose,
  ScDrawerNextFooter,
  ScDrawerNextHandle,
  ScDrawerNextHeader,
  ScDrawerNextPortal,
  ScDrawerNextProvider,
  ScDrawerNextTitle,
  ScDrawerNextTrigger,
} from '@semantic-components/ui';

/** [modal]="false": no backdrop, the page stays usable; disablePointerDismissal: a press outside leaves it open. */
@Component({
  selector: 'app-non-modal-drawer-next-demo',
  imports: [
    ScButton,
    ScDrawerNext,
    ScDrawerNextClose,
    ScDrawerNextFooter,
    ScDrawerNextHandle,
    ScDrawerNextHeader,
    ScDrawerNextPortal,
    ScDrawerNextProvider,
    ScDrawerNextTitle,
    ScDrawerNextTrigger,
  ],
  template: \`
    <div
      scDrawerNextProvider
      [modal]="false"
      disablePointerDismissal
      swipeDirection="right"
    >
      <button scButton scDrawerNextTrigger variant="outline">Non modal</button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <div scDrawerNextHandle></div>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Non modal drawer</h2>
          </div>
          <div class="flex-1 p-4">
            <div
              class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
            ></div>
          </div>
          <div scDrawerNextFooter>
            <button scDrawerNextClose variant="default">Close</button>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NonModalDrawerNextDemo {}`;
}
