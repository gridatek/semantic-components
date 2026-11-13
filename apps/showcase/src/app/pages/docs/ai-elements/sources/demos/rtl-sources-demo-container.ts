import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlSourcesDemo } from './rtl-sources-demo';

@Component({
  selector: 'app-rtl-sources-demo-container',
  imports: [DemoContainer, RtlSourcesDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-sources-demo"
      [code]="code"
    >
      <app-rtl-sources-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSourcesDemoContainer {
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
import { SiArrowUpRightIcon, SiGlobeIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the links indented from the right, the outward arrow mirrored. */
@Component({
  selector: 'app-rtl-sources-demo',
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
    SiArrowUpRightIcon,
    SiGlobeIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siGlobeIcon></svg></span>
            <span scTraceTitle>استُخدم مصدران</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <a
                href="https://docs.astro.build/en/install-and-setup/"
                target="_blank"
                rel="noreferrer"
              >
                <span scTraceLine>
                  <span scTraceTitle>
                    تثبيت Astro | docs.astro.build
                    <span class="sr-only"> (يُفتح في علامة تبويب جديدة)</span>
                  </span>
                  <span scTraceIcon
                    ><svg siArrowUpRightIcon class="rtl:-scale-x-100"></svg
                  ></span>
                </span>
              </a>
              <a
                href="https://pnpm.io/cli/create"
                target="_blank"
                rel="noreferrer"
              >
                <span scTraceLine>
                  <span scTraceTitle>
                    pnpm.io
                    <span class="sr-only"> (يُفتح في علامة تبويب جديدة)</span>
                  </span>
                  <span scTraceIcon
                    ><svg siArrowUpRightIcon class="rtl:-scale-x-100"></svg
                  ></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSourcesDemo {}`;
}
