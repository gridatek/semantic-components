import { Component, ViewEncapsulation } from '@angular/core';
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

/** swipeDirection: down (default), up, left, right — the way a swipe dismisses it, and the edge it sits at. */
@Component({
  selector: 'app-sides-drawer-demo',
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
  template: `
    <div class="flex flex-wrap gap-2">
      <div scDrawerProvider swipeDirection="up">
        <button scButton scDrawerTrigger variant="outline" class="capitalize">
          up
        </button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>Drawer</h2>
              <p scDrawerDescription>Swipe up to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerProvider swipeDirection="right">
        <button scButton scDrawerTrigger variant="outline" class="capitalize">
          right
        </button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>Drawer</h2>
              <p scDrawerDescription>Swipe right to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerProvider swipeDirection="down">
        <button scButton scDrawerTrigger variant="outline" class="capitalize">
          down
        </button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>Drawer</h2>
              <p scDrawerDescription>Swipe down to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerProvider swipeDirection="left">
        <button scButton scDrawerTrigger variant="outline" class="capitalize">
          left
        </button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>Drawer</h2>
              <p scDrawerDescription>Swipe left to close it.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>Close</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SidesDrawerDemo {}
