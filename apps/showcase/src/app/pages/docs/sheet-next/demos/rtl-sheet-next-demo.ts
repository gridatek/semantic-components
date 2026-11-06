import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScSheetNext,
  ScSheetNextClose,
  ScSheetNextDescription,
  ScSheetNextHeader,
  ScSheetNextPortal,
  ScSheetNextProvider,
  ScSheetNextTitle,
  ScSheetNextTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: its text and its ✕ follow; inline-start is the right. */
@Component({
  selector: 'app-rtl-sheet-next-demo',
  imports: [
    ScButton,
    ScSheetNext,
    ScSheetNextClose,
    ScSheetNextDescription,
    ScSheetNextHeader,
    ScSheetNextPortal,
    ScSheetNextProvider,
    ScSheetNextTitle,
    ScSheetNextTrigger,
    SiXIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scSheetNextProvider side="inline-start">
        <button scButton scSheetNextTrigger variant="outline">البداية</button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>تعديل الملف الشخصي</h2>
              <p scSheetNextDescription>أجرِ تغييراتك هنا.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
      <div scSheetNextProvider side="inline-end">
        <button scButton scSheetNextTrigger variant="outline">النهاية</button>
        <ng-template scSheetNextPortal>
          <div scSheetNext>
            <div scSheetNextHeader>
              <h2 scSheetNextTitle>تعديل الملف الشخصي</h2>
              <p scSheetNextDescription>أجرِ تغييراتك هنا.</p>
            </div>
            <button scSheetNextClose>
              <svg siXIcon></svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSheetNextDemo {}
