import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SidesDrawerNextDemo } from './sides-drawer-next-demo';

@Component({
  selector: 'app-sides-drawer-next-demo-container',
  imports: [DemoContainer, SidesDrawerNextDemo],
  template: `
    <app-demo-container
      title="Sides"
      demoUrl="/demos/drawer-next/sides-drawer-next-demo"
      [code]="code"
    >
      <app-sides-drawer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesDrawerNextDemoContainer {
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

/** swipeDirection: down (default), up, left, right — the way a swipe dismisses it, and the edge it sits at. */
@Component({
  selector: 'app-sides-drawer-next-demo',
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
    <div class="flex flex-wrap gap-2">
      <div scDrawerNextProvider swipeDirection="up">
        <button
          scButton
          scDrawerNextTrigger
          variant="outline"
          class="capitalize"
        >
          up
        </button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>Drawer</h2>
              <p scDrawerNextDescription>Swipe up to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerNextProvider swipeDirection="right">
        <button
          scButton
          scDrawerNextTrigger
          variant="outline"
          class="capitalize"
        >
          right
        </button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>Drawer</h2>
              <p scDrawerNextDescription>Swipe right to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerNextProvider swipeDirection="down">
        <button
          scButton
          scDrawerNextTrigger
          variant="outline"
          class="capitalize"
        >
          down
        </button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>Drawer</h2>
              <p scDrawerNextDescription>Swipe down to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerNextProvider swipeDirection="left">
        <button
          scButton
          scDrawerNextTrigger
          variant="outline"
          class="capitalize"
        >
          left
        </button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>Drawer</h2>
              <p scDrawerNextDescription>Swipe left to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesDrawerNextDemo {}`;
}
