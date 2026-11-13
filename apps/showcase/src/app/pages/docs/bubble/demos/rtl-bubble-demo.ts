import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
} from '@semantic-components/ui';

/** In a right-to-left page: start is the right, end the left; the reactions follow. */
@Component({
  selector: 'app-rtl-bubble-demo',
  imports: [ScBubble, ScBubbleContent, ScBubbleReactions],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="muted">
        <div scBubbleContent>مرحبًا! هل تريد أن ترى فقاعات المحادثة؟</div>
        <div scBubbleReactions role="img" aria-label="تفاعل: إعجاب">
          <span>👍</span>
        </div>
      </div>
      <div scBubble alignment="end">
        <div scBubbleContent>بالتأكيد. أرني أفضل عرض لديك.</div>
      </div>
      <div scBubble variant="muted">
        <div scBubbleContent>أنت تقرأ عرضًا يعرض نفسه.</div>
        <div
          scBubbleReactions
          alignment="start"
          role="img"
          aria-label="تفاعلات: نار، عيون"
        >
          <span>🔥</span>
          <span>👀</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlBubbleDemo {}
