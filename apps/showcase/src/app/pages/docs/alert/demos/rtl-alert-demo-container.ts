import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAlertDemo } from './rtl-alert-demo';

@Component({
  selector: 'app-rtl-alert-demo-container',
  imports: [DemoContainer, RtlAlertDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/alert/rtl-alert-demo"
      [code]="code"
    >
      <app-rtl-alert-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAlertDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScAlert,
  ScAlertAction,
  ScAlertDescription,
  ScAlertTitle,
  ScButton,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the icon on the right, the action in the left corner. */
@Component({
  selector: 'app-rtl-alert-demo',
  imports: [
    Dir,
    ScAlert,
    ScAlertAction,
    ScAlertDescription,
    ScAlertTitle,
    ScButton,
    SiCircleCheckIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="grid w-full max-w-md gap-4">
      <div scAlert>
        <svg siCircleCheckIcon></svg>
        <div scAlertTitle>تم تحديث الحساب بنجاح</div>
        <div scAlertDescription>
          تم حفظ معلومات ملفك الشخصي. ستظهر التغييرات على الفور.
        </div>
      </div>
      <div scAlert>
        <div scAlertTitle>الوضع الداكن متاح الآن</div>
        <div scAlertDescription>فعّله من إعدادات ملفك الشخصي للبدء.</div>
        <div scAlertAction>
          <button scButton size="xs">تفعيل</button>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAlertDemo {}`;
}
