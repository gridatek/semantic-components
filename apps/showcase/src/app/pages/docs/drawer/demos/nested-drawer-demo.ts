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

/** A drawer opened from another stacks on it: the one behind shrinks and dims. */
@Component({
  selector: 'app-nested-drawer-demo',
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
    <div scDrawerProvider>
      <button scButton scDrawerTrigger variant="secondary">Open drawer</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHandle></div>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Drawer</h2>
            <p scDrawerDescription>
              Open another drawer from the same direction.
            </p>
          </div>
          <div class="flex-1 p-4">
            <div
              class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
            ></div>
          </div>
          <div scDrawerFooter>
            <div scDrawerProvider>
              <button scButton scDrawerTrigger variant="outline">
                Open nested drawer
              </button>
              <ng-template scDrawerPortal>
                <div scDrawer>
                  <div scDrawerHandle></div>
                  <div scDrawerHeader>
                    <h2 scDrawerTitle>Nested drawer</h2>
                    <p scDrawerDescription>
                      The drawer behind shrinks and dims while this one is open.
                    </p>
                  </div>
                  <div class="flex-1 p-4">
                    <div
                      class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
                    ></div>
                  </div>
                  <div scDrawerFooter>
                    <div scDrawerProvider>
                      <button scButton scDrawerTrigger variant="outline">
                        Open third drawer
                      </button>
                      <ng-template scDrawerPortal>
                        <div scDrawer>
                          <div scDrawerHandle></div>
                          <div scDrawerHeader>
                            <h2 scDrawerTitle>Third drawer</h2>
                            <p scDrawerDescription>
                              Two drawers are stacked behind this one.
                            </p>
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
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedDrawerDemo {}
