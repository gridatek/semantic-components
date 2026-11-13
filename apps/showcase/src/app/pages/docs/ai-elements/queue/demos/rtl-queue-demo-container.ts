import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlQueueDemo } from './rtl-queue-demo';

@Component({
  selector: 'app-rtl-queue-demo-container',
  imports: [DemoContainer, RtlQueueDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-queue-demo"
      [code]="code"
    >
      <app-rtl-queue-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlQueueDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiCircleDotIcon,
  SiCircleIcon,
  SiListChecksIcon,
  SiListTodoIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the two sections, their todos indented from the right. */
@Component({
  selector: 'app-rtl-queue-demo',
  imports: [
    Dir,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleDotIcon,
    SiCircleIcon,
    SiListChecksIcon,
    SiListTodoIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siListTodoIcon></svg></span>
            <span scTraceTitle>٢ للإنجاز</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine status="running">
                <span scTraceIcon><svg siCircleDotIcon></svg></span>
                <span scTraceTitle>إضافة مفتاح في صفحة الإعدادات</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleIcon></svg></span>
                <span scTraceTitle>فحص التباين في المخططات</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siListChecksIcon></svg></span>
            <span scTraceTitle>٢ مكتملة</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>إضافة نسخة داكنة لرموز السمة</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>قراءة السمة من ملف تعريف الارتباط</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlQueueDemo {}`;
}
