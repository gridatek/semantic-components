import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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
  template: `
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
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPlanDemo {}
