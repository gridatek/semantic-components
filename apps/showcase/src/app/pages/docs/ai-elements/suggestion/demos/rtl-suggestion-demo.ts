import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

/** Right to left: the row starts on the right and scrolls toward the left. */
@Component({
  selector: 'app-rtl-suggestion-demo',
  imports: [Dir, ScButton],
  template: `
    <div
      dir="rtl"
      lang="ar"
      class="scroll-fade-x flex w-full max-w-lg scrollbar-none gap-2 overflow-x-auto overscroll-x-contain py-6"
    >
      @for (suggestion of suggestions; track suggestion) {
        <button scButton variant="outline" size="sm" class="shrink-0">
          {{ suggestion }}
        </button>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSuggestionDemo {
  protected readonly suggestions = [
    'أضف مفتاح الوضع الداكن',
    'أصلح البناء الفاشل',
    'اكتب اختبارات للنموذج',
    'أضف حالة تحميل',
    'ابحث عن الحزم غير المستخدمة',
  ];
}
