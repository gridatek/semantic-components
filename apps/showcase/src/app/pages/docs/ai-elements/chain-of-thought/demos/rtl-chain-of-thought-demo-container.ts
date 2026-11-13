import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlChainOfThoughtDemo } from './rtl-chain-of-thought-demo';

@Component({
  selector: 'app-rtl-chain-of-thought-demo-container',
  imports: [DemoContainer, RtlChainOfThoughtDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-chain-of-thought-demo"
      [code]="code"
    >
      <app-rtl-chain-of-thought-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlChainOfThoughtDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
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
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the steps indented from the right, under their summary. */
@Component({
  selector: 'app-rtl-chain-of-thought-demo',
  imports: [
    Dir,
    ScBadge,
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
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siCircleCheckIcon></svg></span>
            <span scTraceTitle>بحث في ٣ خطوات</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>قرأ سجل البناء لـ dpl_8Kx2</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>بحث في الويب عن مفتاح ذاكرة الصور</span>
              </span>
              <div scCollapsible scTraceCollapsible [open]="true">
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span scTraceLine>
                    <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                    <span scTraceTitle>بحث في الشيفرة عن cacheKey</span>
                  </span>
                </button>
                <div scCollapsiblePanel>
                  <div
                    scTraceCollapsiblePanelContent
                    class="flex flex-wrap gap-1.5"
                  >
                    <span scBadge variant="secondary" class="font-mono"
                      >next.config.ts</span
                    >
                    <span scBadge variant="secondary" class="font-mono"
                      >scripts/optimize-images.ts</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlChainOfThoughtDemo {}`;
}
