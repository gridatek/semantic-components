import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlDrawerDemo } from './rtl-drawer-demo';

@Component({
  selector: 'app-rtl-drawer-demo-container',
  imports: [DemoContainer, RtlDrawerDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/drawer/rtl-drawer-demo"
      [code]="code"
    >
      <app-rtl-drawer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDrawerDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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

/** In a right-to-left page: its text follows; inline-start is the right, inline-end the left. */
@Component({
  selector: 'app-rtl-drawer-demo',
  imports: [
    Dir,
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
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scDrawerProvider>
        <button scButton scDrawerTrigger variant="outline">أسفل</button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>الدرج</h2>
              <p scDrawerDescription>اسحب للأسفل لإغلاقه.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerProvider swipeDirection="inline-start">
        <button scButton scDrawerTrigger variant="outline">البداية</button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>الدرج</h2>
              <p scDrawerDescription>في بداية السطر.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
      <div scDrawerProvider swipeDirection="inline-end">
        <button scButton scDrawerTrigger variant="outline">النهاية</button>
        <ng-template scDrawerPortal>
          <div scDrawer>
            <div scDrawerHandle></div>
            <div scDrawerHeader>
              <h2 scDrawerTitle>الدرج</h2>
              <p scDrawerDescription>في نهاية السطر.</p>
            </div>
            <div class="flex-1 p-4">
              <div
                class="bg-muted h-48 w-full rounded-2xl group-data-[swipe-axis=x]/drawer-popup:h-full"
              ></div>
            </div>
            <div scDrawerFooter>
              <button scDrawerClose>إغلاق</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDrawerDemo {}`;
}
