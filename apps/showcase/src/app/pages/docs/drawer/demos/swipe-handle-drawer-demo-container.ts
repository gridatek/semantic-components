import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SwipeHandleDrawerDemo } from './swipe-handle-drawer-demo';

@Component({
  selector: 'app-swipe-handle-drawer-demo-container',
  imports: [DemoContainer, SwipeHandleDrawerDemo],
  template: `
    <app-demo-container
      title="Swipe handle"
      demoUrl="/demos/drawer/swipe-handle-drawer-demo"
      [code]="code"
    >
      <app-swipe-handle-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SwipeHandleDrawerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerFooter,
  ScDrawerHandle,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

/** A bar to drag it by: with a mouse, drag the handle (or the edges); a finger or a pen drags from anywhere. */
@Component({
  selector: 'app-swipe-handle-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerFooter,
    ScDrawerHandle,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: \`
    <div scDrawerProvider>
      <button scButton scDrawerTrigger variant="secondary">Open drawer</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHandle></div>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Drawer</h2>
            <p scDrawerDescription>Drawer with a swipe handle.</p>
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
export class SwipeHandleDrawerDemo {}`;
}
