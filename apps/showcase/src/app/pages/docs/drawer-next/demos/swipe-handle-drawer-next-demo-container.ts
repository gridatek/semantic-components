import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwipeHandleDrawerNextDemo } from './swipe-handle-drawer-next-demo';

@Component({
  selector: 'app-swipe-handle-drawer-next-demo-container',
  imports: [DemoContainer, SwipeHandleDrawerNextDemo],
  template: `
    <app-demo-container
      title="Swipe handle"
      demoUrl="/demos/drawer-next/swipe-handle-drawer-next-demo"
      [code]="code"
    >
      <app-swipe-handle-drawer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwipeHandleDrawerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDrawerNext,
  ScDrawerNextClose,
  ScDrawerNextDescription,
  ScDrawerNextFooter,
  ScDrawerNextHandle,
  ScDrawerNextHeader,
  ScDrawerNextPortal,
  ScDrawerNextProvider,
  ScDrawerNextTitle,
  ScDrawerNextTrigger,
} from '@semantic-components/ui';

/** A bar to drag it by: with a mouse, drag the handle (or the edges); a finger or a pen drags from anywhere. */
@Component({
  selector: 'app-swipe-handle-drawer-next-demo',
  imports: [
    ScButton,
    ScDrawerNext,
    ScDrawerNextClose,
    ScDrawerNextDescription,
    ScDrawerNextFooter,
    ScDrawerNextHandle,
    ScDrawerNextHeader,
    ScDrawerNextPortal,
    ScDrawerNextProvider,
    ScDrawerNextTitle,
    ScDrawerNextTrigger,
  ],
  template: \`
    <div scDrawerNextProvider>
      <button scButton scDrawerNextTrigger variant="secondary">
        Open drawer
      </button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <div scDrawerNextHandle></div>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Drawer</h2>
            <p scDrawerNextDescription>Drawer with a swipe handle.</p>
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
export class SwipeHandleDrawerNextDemo {}`;
}
