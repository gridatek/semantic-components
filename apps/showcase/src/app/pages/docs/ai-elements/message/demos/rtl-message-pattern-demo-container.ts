import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlMessagePatternDemo } from './rtl-message-pattern-demo';

@Component({
  selector: 'app-rtl-message-pattern-demo-container',
  imports: [DemoContainer, RtlMessagePatternDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-message-pattern-demo"
      [code]="code"
    >
      <app-rtl-message-pattern-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMessagePatternDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScMessage,
  ScMessageContent,
  ScMessageFooter,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiRefreshCcwIcon,
  SiThumbsDownIcon,
  SiThumbsUpIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the question on the left, the reply's actions under it from the right. */
@Component({
  selector: 'app-rtl-message-pattern-demo',
  imports: [
    Dir,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMessage,
    ScMessageContent,
    ScMessageFooter,
    SiCopyIcon,
    SiRefreshCcwIcon,
    SiThumbsDownIcon,
    SiThumbsUpIcon,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      class="flex w-full max-w-md flex-col gap-8 py-6 text-sm"
    >
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>كيف أضيف نافذة للإعدادات؟</div>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMessageContent class="gap-2">
          <p>
            ثبّت مكوّن النافذة، ثم افتحها من زر الترس في رأس الصفحة. ينتقل
            التركيز إلى النافذة عند فتحها، ويغلقها زر Esc.
          </p>
          <div scMessageFooter class="px-0">
            <button scButton variant="ghost" size="icon-sm">
              <svg siCopyIcon></svg>
              <span class="sr-only">نسخ</span>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              aria-pressed="false"
            >
              <svg siThumbsUpIcon></svg>
              <span class="sr-only">إجابة جيدة</span>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon-sm"
              aria-pressed="false"
            >
              <svg siThumbsDownIcon></svg>
              <span class="sr-only">إجابة سيئة</span>
            </button>
            <button scButton variant="ghost" size="icon-sm">
              <svg siRefreshCcwIcon></svg>
              <span class="sr-only">إعادة المحاولة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMessagePatternDemo {}`;
}
