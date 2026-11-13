import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMessageDemo } from './rtl-message-demo';

@Component({
  selector: 'app-rtl-message-demo-container',
  imports: [DemoContainer, RtlMessageDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/message/rtl-message-demo"
      [code]="code"
    >
      <app-rtl-message-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMessageDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageFooter,
  ScMessageHeader,
} from '@semantic-components/ui';

/** In a right-to-left page: theirs on the right, yours on the left, the footer at your message’s end. */
@Component({
  selector: 'app-rtl-message-demo',
  imports: [
    Dir,
    ScAvatar,
    ScAvatarFallback,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageFooter,
    ScMessageHeader,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-6 py-6" dir="rtl" lang="ar">
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>ل</span></span>
        </div>
        <div scMessageContent>
          <div scMessageHeader>ليلى</div>
          <div scBubble variant="muted">
            <div scBubbleContent>فشل البناء أثناء تثبيت الحزم.</div>
          </div>
        </div>
      </div>
      <div scMessage alignment="end">
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>أ</span></span>
        </div>
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>هل يمكنك مشاركة الخطأ؟</div>
          </div>
          <div scMessageFooter>قُرئت 10:42</div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMessageDemo {}`;
}
