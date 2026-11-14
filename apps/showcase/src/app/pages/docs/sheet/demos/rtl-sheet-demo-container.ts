import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSheetDemo } from './rtl-sheet-demo';

@Component({
  selector: 'app-rtl-sheet-demo-container',
  imports: [DemoContainer, RtlSheetDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/sheet/rtl-sheet-demo"
      [code]="code"
    >
      <app-rtl-sheet-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSheetDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScSheet,
  ScSheetClose,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: its text and its ✕ follow; inline-start is the right. */
@Component({
  selector: 'app-rtl-sheet-demo',
  imports: [
    Dir,
    ScButton,
    ScSheet,
    ScSheetClose,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scSheetProvider side="inline-start">
        <button scButton scSheetTrigger variant="outline">البداية</button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>تعديل الملف الشخصي</h2>
              <p scSheetDescription>أجرِ تغييراتك هنا.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetProvider side="inline-end">
        <button scButton scSheetTrigger variant="outline">النهاية</button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>تعديل الملف الشخصي</h2>
              <p scSheetDescription>أجرِ تغييراتك هنا.</p>
            </div>
            <button scSheetClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSheetDemo {}`;
}
