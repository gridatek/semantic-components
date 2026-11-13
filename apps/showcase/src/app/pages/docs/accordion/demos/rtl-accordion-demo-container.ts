import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAccordionDemo } from './rtl-accordion-demo';

@Component({
  selector: 'app-rtl-accordion-demo-container',
  imports: [DemoContainer, RtlAccordionDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/accordion/rtl-accordion-demo"
      [code]="code"
    >
      <app-rtl-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAccordionDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the chevron on the left. */
@Component({
  selector: 'app-rtl-accordion-demo',
  imports: [
    Dir,
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionPanelContent,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-lg">
      <div scAccordion [value]="['item-1']">
        <div scAccordionItem value="item-1">
          <h3 scAccordionHeader>
            <button scAccordionTrigger>
              كيف يمكنني إعادة تعيين كلمة المرور؟
              <svg siChevronDownIcon scAccordionTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionPanel>
            <ng-template scAccordionPanelContent>
              انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أدخل عنوان بريدك
              الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي
              صلاحية الرابط خلال 24 ساعة.
            </ng-template>
          </div>
        </div>
        <div scAccordionItem value="item-2">
          <h3 scAccordionHeader>
            <button scAccordionTrigger>
              هل يمكنني تغيير خطة الاشتراك الخاصة بي؟
              <svg siChevronDownIcon scAccordionTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionPanel>
            <ng-template scAccordionPanelContent>
              نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من إعدادات حسابك. ستظهر
              التغييرات في دورة الفوترة التالية.
            </ng-template>
          </div>
        </div>
        <div scAccordionItem value="item-3">
          <h3 scAccordionHeader>
            <button scAccordionTrigger>
              ما هي طرق الدفع التي تقبلونها؟
              <svg siChevronDownIcon scAccordionTriggerIcon></svg>
            </button>
          </h3>
          <div scAccordionPanel>
            <ng-template scAccordionPanelContent>
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
export class RtlAccordionDemo {}`;
}
