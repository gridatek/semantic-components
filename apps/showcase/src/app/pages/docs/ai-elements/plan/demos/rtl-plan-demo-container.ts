import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlPlanDemo } from './rtl-plan-demo';

@Component({
  selector: 'app-rtl-plan-demo-container',
  imports: [DemoContainer, RtlPlanDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-plan-demo"
      [code]="code"
    >
      <app-rtl-plan-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPlanDemoContainer {
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
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiCircleDotIcon,
  SiCircleIcon,
  SiRouteIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the steps indented from the right, the count after the title. */
@Component({
  selector: 'app-rtl-plan-demo',
  imports: [
    Dir,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleDotIcon,
    SiCircleIcon,
    SiRouteIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="running">
            <span scTraceIcon><svg siRouteIcon></svg></span>
            <span scTraceTitle>الخطة: الانتقال إلى Base UI</span>
            <span scTraceDescription>اكتملت ٢ من ٤</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>تثبيت ‎&#64;base-ui/react</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>استبدال استيرادات Radix</span>
              </span>
              <span scTraceLine status="running">
                <span scTraceIcon><svg siCircleDotIcon></svg></span>
                <span scTraceTitle>إعادة تسمية asChild إلى render</span>
              </span>
              <span scTraceLine status="pending">
                <span scTraceIcon><svg siCircleIcon></svg></span>
                <span scTraceTitle>تشغيل مدقق الأنواع</span>
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
export class RtlPlanDemo {}`;
}
