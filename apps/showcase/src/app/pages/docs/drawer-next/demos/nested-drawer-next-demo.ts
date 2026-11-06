import { Component, ViewEncapsulation } from '@angular/core';
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

/** A drawer opened from another stacks on it: the one behind shrinks and dims. */
@Component({
  selector: 'app-nested-drawer-next-demo',
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
  template: `
    <div scDrawerNextProvider>
      <button scButton scDrawerNextTrigger variant="secondary">
        Open drawer
      </button>
      <ng-template scDrawerNextPortal>
        <div scDrawerNext>
          <div scDrawerNextHandle></div>
          <div scDrawerNextHeader>
            <h2 scDrawerNextTitle>Drawer</h2>
            <p scDrawerNextDescription>
              Open another drawer from the same direction.
            </p>
          </div>
          <div class="flex-1 p-4">
            <div
              class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
            ></div>
          </div>
          <div scDrawerNextFooter>
            <div scDrawerNextProvider>
              <button scButton scDrawerNextTrigger variant="outline">
                Open nested drawer
              </button>
              <ng-template scDrawerNextPortal>
                <div scDrawerNext>
                  <div scDrawerNextHandle></div>
                  <div scDrawerNextHeader>
                    <h2 scDrawerNextTitle>Nested drawer</h2>
                    <p scDrawerNextDescription>
                      The drawer behind shrinks and dims while this one is open.
                    </p>
                  </div>
                  <div class="flex-1 p-4">
                    <div
                      class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
                    ></div>
                  </div>
                  <div scDrawerNextFooter>
                    <div scDrawerNextProvider>
                      <button scButton scDrawerNextTrigger variant="outline">
                        Open third drawer
                      </button>
                      <ng-template scDrawerNextPortal>
                        <div scDrawerNext>
                          <div scDrawerNextHandle></div>
                          <div scDrawerNextHeader>
                            <h2 scDrawerNextTitle>Third drawer</h2>
                            <p scDrawerNextDescription>
                              Two drawers are stacked behind this one.
                            </p>
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
export class NestedDrawerNextDemo {}
