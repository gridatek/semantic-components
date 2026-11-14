import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlTestResultsDemo } from './rtl-test-results-demo';

@Component({
  selector: 'app-rtl-test-results-demo-container',
  imports: [DemoContainer, RtlTestResultsDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-test-results-demo"
      [code]="code"
    >
      <app-rtl-test-results-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTestResultsDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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
  SiCheckIcon,
  SiFlaskConicalIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the run's summary, its tests indented from the right. */
@Component({
  selector: 'app-rtl-test-results-demo',
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
    SiCheckIcon,
    SiFlaskConicalIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siFlaskConicalIcon></svg></span>
            <span scTraceTitle>شُغّل اختباران، فشل واحد</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCheckIcon></svg></span>
                <span scTraceTitle>ينشئ مستخدمًا</span>
              </span>
              <span scTraceLine status="error">
                <span scTraceIcon><svg siXIcon></svg></span>
                <span scTraceTitle>يحدّث ملف المستخدم</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTestResultsDemo {}`;
}
