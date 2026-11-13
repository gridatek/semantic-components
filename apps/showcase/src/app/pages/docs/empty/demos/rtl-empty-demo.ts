import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiFolderCodeIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page. */
@Component({
  selector: 'app-rtl-empty-demo',
  imports: [
    Dir,
    ScButton,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiFolderCodeIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="w-full">
      <div scEmpty class="border">
        <div scEmptyHeader>
          <div scEmptyMedia variant="icon"><svg siFolderCodeIcon></svg></div>
          <h2 scEmptyTitle>لا توجد مشاريع بعد</h2>
          <div scEmptyDescription>
            لم تنشئ أي مشروع بعد. ابدأ بإنشاء مشروعك الأول.
          </div>
        </div>
        <div scEmptyBody>
          <div class="flex justify-center gap-2">
            <button scButton>إنشاء مشروع</button>
            <button scButton variant="outline">استيراد مشروع</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEmptyDemo {}
