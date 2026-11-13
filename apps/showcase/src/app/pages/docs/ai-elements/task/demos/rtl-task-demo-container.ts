import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlTaskDemo } from './rtl-task-demo';

@Component({
  selector: 'app-rtl-task-demo-container',
  imports: [DemoContainer, RtlTaskDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-task-demo"
      [code]="code"
    >
      <app-rtl-task-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTaskDemoContainer {
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
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: a done task closed, the running one open. */
@Component({
  selector: 'app-rtl-task-demo',
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
    SiLoaderCircleIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siCircleCheckIcon></svg></span>
            <span scTraceTitle>عُثر على ملفات المشروع</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceTitle>قُرئ app/layout.tsx</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="running">
            <span scTraceIcon>
              <svg siLoaderCircleIcon class="motion-safe:animate-spin"></svg>
            </span>
            <span scTraceTitle>تحديث بيانات الصفحة الوصفية</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceTitle>عُدّل app/layout.tsx</span>
              </span>
              <span scTraceLine status="running">
                <span scTraceTitle>تعديل app/page.tsx</span>
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
export class RtlTaskDemo {}`;
}
