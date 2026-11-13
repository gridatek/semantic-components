import { Dir } from '@angular/cdk/bidi';
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
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiArrowDownIcon, SiTerminalIcon } from '@semantic-icons/lucide-icons';

/** Right to left: your turns on the left, the agent's on the right. */
@Component({
  selector: 'app-rtl-chat-demo',
  imports: [
    Dir,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageContent,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiArrowDownIcon,
    SiTerminalIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="h-80 w-full max-w-md">
      <div scMessageScroller>
        <div scMessageScrollerViewport aria-label="المحادثة">
          <div scMessageScrollerContent class="gap-6 p-4">
            <div scMessageScrollerItem messageId="q1" scrollAnchor>
              <div scMessage alignment="end">
                <div scMessageContent>
                  <div scBubble alignment="end" variant="muted">
                    <div scBubbleContent>شغّل البناء قبل أن أنشره.</div>
                  </div>
                </div>
              </div>
            </div>
            <div scMessageScrollerItem messageId="a1">
              <div scMessage>
                <div scMessageContent class="gap-3">
                  <div scTrace>
                    <span scTraceLine>
                      <span scTraceIcon><svg siTerminalIcon></svg></span>
                      <span scTraceTitle>شغّل pnpm build</span>
                    </span>
                  </div>
                  <p>
                    نجح البناء، فهو جاهز للنشر: لا أخطاء في الأنواع، وأُنشئت كل
                    الصفحات الثابتة الاثنتي عشرة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button scMessageScrollerButton>
          <svg siArrowDownIcon></svg>
          <span class="sr-only">الانتقال إلى آخر رسالة</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlChatDemo {}
