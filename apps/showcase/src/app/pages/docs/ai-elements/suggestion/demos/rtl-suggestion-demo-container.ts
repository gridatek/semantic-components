import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlSuggestionDemo } from './rtl-suggestion-demo';

@Component({
  selector: 'app-rtl-suggestion-demo-container',
  imports: [DemoContainer, RtlSuggestionDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-suggestion-demo"
      [code]="code"
    >
      <app-rtl-suggestion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSuggestionDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

/** Right to left: the row starts on the right and scrolls toward the left. */
@Component({
  selector: 'app-rtl-suggestion-demo',
  imports: [Dir, ScButton],
  template: \`
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
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
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
}`;
}
