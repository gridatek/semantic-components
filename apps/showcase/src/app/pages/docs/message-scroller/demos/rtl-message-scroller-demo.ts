import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
} from '@semantic-components/ui';
import { SiArrowDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-message-scroller-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageContent,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    SiArrowDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div class="bg-background h-80 overflow-hidden rounded-xl border">
        <div scMessageScroller>
          <div scMessageScrollerViewport aria-label="المحادثة">
            <div scMessageScrollerContent class="p-4">
              @for (message of messages; track message.id) {
                <div
                  scMessageScrollerItem
                  [messageId]="message.id"
                  [scrollAnchor]="message.role === 'user'"
                >
                  <div
                    scMessage
                    [align]="message.role === 'user' ? 'end' : 'start'"
                  >
                    <div scMessageContent>
                      <div
                        scBubble
                        [align]="message.role === 'user' ? 'end' : 'start'"
                        [variant]="
                          message.role === 'user' ? 'default' : 'muted'
                        "
                      >
                        <div scBubbleContent>{{ message.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <button scMessageScrollerButton>
            <svg siArrowDownIcon></svg>
            <span class="sr-only">الانتقال إلى آخر رسالة</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMessageScrollerDemo {
  readonly messages = [
    { id: 'q1', role: 'user', text: 'ماذا يفعل مُمرِّر الرسائل؟' },
    {
      id: 'a1',
      role: 'assistant',
      text: 'يُبقي المحادثة حيث تريد: في نهايتها عند الفتح، وعلى سؤالك أثناء وصول الجواب، وعلى الرسالة التي تقرؤها عند تحميل الرسائل الأقدم.',
    },
    { id: 'q2', role: 'user', text: 'وإذا مرّرت إلى الأعلى؟' },
    {
      id: 'a2',
      role: 'assistant',
      text: 'يتوقّف عن المتابعة. تصل الرسائل الجديدة دون أن تُحرّكك، ويظهر زرّ للعودة إلى آخر رسالة.',
    },
    { id: 'q3', role: 'user', text: 'هل يمكن التمرير بلوحة المفاتيح؟' },
    {
      id: 'a3',
      role: 'assistant',
      text: 'نعم: المحادثة منطقة تصل إليها بمفتاح Tab، وتمرّرها الأسهم و Page Up و Page Down و Home و End.',
    },
    { id: 'q4', role: 'user', text: 'وهل تسمع قارئات الشاشة الرسائل الجديدة؟' },
    {
      id: 'a4',
      role: 'assistant',
      text: 'نعم: الرسائل سجلّ، فتُعلَن كلّ رسالة جديدة عند إضافتها.',
    },
  ];
}
