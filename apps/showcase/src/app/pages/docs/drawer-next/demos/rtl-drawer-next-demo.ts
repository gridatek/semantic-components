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

/** In a right-to-left page: its text follows; inline-start is the right, inline-end the left. */
@Component({
  selector: 'app-rtl-drawer-next-demo',
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
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scDrawerNextProvider>
        <button scButton scDrawerNextTrigger variant="outline">أسفل</button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>الدرج</h2>
              <p scDrawerNextDescription>اسحب للأسفل لإغلاقه.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerNextProvider swipeDirection="inline-start">
        <button scButton scDrawerNextTrigger variant="outline">البداية</button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>الدرج</h2>
              <p scDrawerNextDescription>في بداية السطر.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerNextProvider swipeDirection="inline-end">
        <button scButton scDrawerNextTrigger variant="outline">النهاية</button>
        <ng-template scDrawerNextPortal>
          <div scDrawerNext>
            <div scDrawerNextHandle></div>
            <div scDrawerNextHeader>
              <h2 scDrawerNextTitle>الدرج</h2>
              <p scDrawerNextDescription>في نهاية السطر.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerNextFooter>
              <button scDrawerNextClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDrawerNextDemo {}
