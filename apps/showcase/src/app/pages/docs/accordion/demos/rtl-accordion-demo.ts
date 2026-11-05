import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the chevron on the left. */
@Component({
  selector: 'app-rtl-accordion-demo',
  imports: [
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionContent,
    SiChevronDownIcon,
  ],
  template: `
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
            <ng-template scAccordionContent>
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
            <ng-template scAccordionContent>
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
            <ng-template scAccordionContent>
              نقبل جميع بطاقات الائتمان الرئيسية و PayPal والتحويلات المصرفية.
              تتم معالجة جميع المدفوعات بأمان من خلال شركاء الدفع لدينا.
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAccordionDemo {}
