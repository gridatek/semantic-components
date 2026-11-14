import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlReasoningDemo } from './rtl-reasoning-demo';

@Component({
  selector: 'app-rtl-reasoning-demo-container',
  imports: [DemoContainer, RtlReasoningDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-reasoning-demo"
      [code]="code"
    >
      <app-rtl-reasoning-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlReasoningDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScMessage,
  ScMessageContent,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the question on the left, the thinking indented from the right. */
@Component({
  selector: 'app-rtl-reasoning-demo',
  imports: [
    Dir,
    ScBubble,
    ScBubbleContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScMessage,
    ScMessageContent,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
  ],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      class="flex w-full max-w-sm flex-col gap-4 py-6 text-sm"
    >
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>لماذا نشر صفحة الدفع بطيء جدًا؟</div>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMessageContent class="gap-4">
          <div scTrace>
            <div scCollapsible scTraceCollapsible [open]="true">
              <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                <span scTraceLine>
                  <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                  <span scTraceTitle>فكّر</span>
                  <span scTraceDescription>٥ ثوانٍ</span>
                </span>
              </button>
              <div scCollapsiblePanel>
                <div scTraceCollapsiblePanelContent class="whitespace-pre-wrap">
                  يمر سجل النشر بثلاث مراحل. التثبيت والبناء في الوقت المعتاد.
                  تحسين الصور يستغرق ٣ دقائق و٥٠ ثانية، ويُعاد في كل نشر لأن
                  مفتاح ذاكرته المؤقتة يتضمن معرّف الإيداع.
                </div>
              </div>
            </div>
          </div>
          <p>
            تحسين الصور هو عنق الزجاجة. اجعل مفتاح ذاكرته المؤقتة ملف القفل
            ومجلد الصور بدل معرّف الإيداع، وسيستغرق النشر أقل من دقيقتين.
          </p>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlReasoningDemo {}`;
}
