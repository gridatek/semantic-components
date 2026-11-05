import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAccordionNextDemo } from './rtl-accordion-next-demo';

@Component({
  selector: 'app-rtl-accordion-next-demo-container',
  imports: [DemoContainer, RtlAccordionNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/accordion-next/rtl-accordion-next-demo"
      [code]="code"
    >
      <app-rtl-accordion-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAccordionNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordionNext,
  ScAccordionNextContent,
  ScAccordionNextHeader,
  ScAccordionNextItem,
  ScAccordionNextPanel,
  ScAccordionNextTrigger,
  ScAccordionNextTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the chevron on the left. */
@Component({
  selector: 'app-rtl-accordion-next-demo',
  imports: [
    ScAccordionNext,
    ScAccordionNextItem,
    ScAccordionNextHeader,
    ScAccordionNextTrigger,
    ScAccordionNextTriggerIcon,
    ScAccordionNextPanel,
    ScAccordionNextContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-lg">
      <div scAccordionNext [value]="['item-1']">
        <div scAccordionNextItem value="item-1">
          <h3 scAccordionNextHeader>
            <button scAccordionNextTrigger>
              كيف يمكنني إعادة تعيين كلمة المرور؟
              <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionNextPanel>
            <ng-template scAccordionNextContent>
              انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أدخل عنوان بريدك
              الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي
              صلاحية الرابط خلال 24 ساعة.
            </ng-template>
          </div>
        </div>
        <div scAccordionNextItem value="item-2">
          <h3 scAccordionNextHeader>
            <button scAccordionNextTrigger>
              هل يمكنني تغيير خطة الاشتراك الخاصة بي؟
              <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionNextPanel>
            <ng-template scAccordionNextContent>
              نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من إعدادات حسابك. ستظهر
              التغييرات في دورة الفوترة التالية.
            </ng-template>
          </div>
        </div>
        <div scAccordionNextItem value="item-3">
          <h3 scAccordionNextHeader>
            <button scAccordionNextTrigger>
              ما هي طرق الدفع التي تقبلونها؟
              <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionNextPanel>
            <ng-template scAccordionNextContent>
              نقبل جميع بطاقات الائتمان الرئيسية و PayPal والتحويلات المصرفية.
              تتم معالجة جميع المدفوعات بأمان من خلال شركاء الدفع لدينا.
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAccordionNextDemo {}`;
}
