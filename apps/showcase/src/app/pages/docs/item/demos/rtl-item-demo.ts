import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import {
  SiBadgeCheckIcon,
  SiChevronLeftIcon,
  SiShieldAlertIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the media on the right, the actions on the left. */
@Component({
  selector: 'app-rtl-item-demo',
  imports: [
    Dir,
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiShieldAlertIcon,
    SiBadgeCheckIcon,
    SiChevronLeftIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-md flex-col gap-6">
      <div scItem variant="outline">
        <div scItemMedia variant="icon"><svg siShieldAlertIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>تنبيه أمني</div>
          <p scItemDescription>تم رصد تسجيل دخول من جهاز غير معروف.</p>
        </div>
        <div scItemActions>
          <button scButton size="sm" variant="outline">مراجعة</button>
        </div>
      </div>
      <a scItem variant="outline" size="sm" href="#rtl">
        <div scItemMedia><svg siBadgeCheckIcon class="size-5"></svg></div>
        <div scItemBody>
          <div scItemTitle>تم التحقق من ملفك الشخصي.</div>
        </div>
        <div scItemActions>
          <svg siChevronLeftIcon class="size-4"></svg>
        </div>
      </a>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlItemDemo {}
