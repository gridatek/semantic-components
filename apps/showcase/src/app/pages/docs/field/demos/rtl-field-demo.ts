import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldSeparator,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

const MONTHS = [
  '٠١',
  '٠٢',
  '٠٣',
  '٠٤',
  '٠٥',
  '٠٦',
  '٠٧',
  '٠٨',
  '٠٩',
  '١٠',
  '١١',
  '١٢',
];

/** In a right-to-left page: the payment form, in Arabic. */
@Component({
  selector: 'app-rtl-field-demo',
  imports: [
    Dir,
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldSeparator,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div class="w-full max-w-md">
        <div scFieldGroup>
          <fieldset scFieldset>
            <legend scLegend>طريقة الدفع</legend>
            <p scFieldDescription>جميع المعاملات آمنة ومشفرة</p>
            <div scFieldGroup>
              <div scField>
                <label scLabel>الاسم على البطاقة</label>
                <input scInput placeholder="Evil Rabbit" />
              </div>
              <div scField>
                <label scLabel>رقم البطاقة</label>
                <input scInput placeholder="1234 5678 9012 3456" />
                <p scFieldDescription>أدخل رقم البطاقة المكون من 16 رقمًا</p>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div scField>
                  <div scSelect [(value)]="month" [items]="months">
                    <div scSelectLabel>الشهر</div>
                    <div scSelectTrigger>
                      <span scSelectValue></span>
                      <svg scSelectIcon siChevronDownIcon></svg>
                    </div>
                    <ng-template scSelectPortal>
                      <div scSelectPopup>
                        <div scSelectList>
                          @for (item of months; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div scField>
                  <div scSelect [(value)]="year" [items]="years">
                    <div scSelectLabel>السنة</div>
                    <div scSelectTrigger>
                      <span scSelectValue></span>
                      <svg scSelectIcon siChevronDownIcon></svg>
                    </div>
                    <ng-template scSelectPortal>
                      <div scSelectPopup>
                        <div scSelectList>
                          @for (item of years; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div scField>
                  <label scLabel>CVV</label>
                  <input scInput placeholder="123" />
                </div>
              </div>
            </div>
          </fieldset>
          <div scFieldSeparator></div>
          <fieldset scFieldset>
            <legend scLegend>عنوان الفوترة</legend>
            <p scFieldDescription>
              عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك
            </p>
            <div scFieldGroup>
              <div scCheckboxField>
                <input scCheckbox [(checked)]="sameAsShipping" />
                <label scLabel class="font-normal">نفس عنوان الشحن</label>
              </div>
            </div>
          </fieldset>
          <fieldset scFieldset>
            <div scFieldGroup>
              <div scField>
                <label scLabel>تعليقات</label>
                <textarea
                  scTextarea
                  placeholder="أضف أي تعليقات إضافية"
                  class="resize-none"
                ></textarea>
              </div>
            </div>
          </fieldset>
          <div scField orientation="horizontal">
            <button scButton type="button">إرسال</button>
            <button scButton type="button" variant="outline">إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlFieldDemo {
  protected readonly months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ].map((value, i) => ({
    value,
    label: MONTHS[i],
  }));
  protected readonly years = Array.from({ length: 10 }, (_, i) => ({
    value: String(2026 + i),
    label: String(2026 + i),
  }));
  protected readonly month = signal('');
  protected readonly year = signal('');
  protected readonly sameAsShipping = signal(true);
}
