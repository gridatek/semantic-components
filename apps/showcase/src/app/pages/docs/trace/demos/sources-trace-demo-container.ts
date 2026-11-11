import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SourcesTraceDemo } from './sources-trace-demo';

@Component({
  selector: 'app-sources-trace-demo-container',
  imports: [DemoContainer, SourcesTraceDemo],
  template: `
    <app-demo-container
      title="Sources"
      demoUrl="/demos/trace/sources-trace-demo"
      [code]="code"
    >
      <app-sources-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SourcesTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleContent,
  ScTraceCollapsibleIcon,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiArrowUpRightIcon,
  SiChevronRightIcon,
  SiGlobeIcon,
} from '@semantic-icons/lucide-icons';

/** A collapsible row whose content is a trace of links. */
@Component({
  selector: 'app-sources-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiGlobeIcon,
    SiArrowUpRightIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scCollapsible [open]="true" scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siGlobeIcon></svg></span>
            <span scTraceTitle>Used 3 sources</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsibleContent>
            <div scTrace>
              <a
                href="https://angular.dev/guide/signals"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Signals guide<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
              <a
                href="https://angular.dev/guide/forms/signals/overview"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Signal Forms overview<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
              <a
                href="https://tailwindcss.com/docs/transition-property"
                target="_blank"
                rel="noopener"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siGlobeIcon></svg></span>
                  <span scTraceTitle
                    >Tailwind transitions<span class="sr-only">
                      (opens in a new tab)</span
                    ></span
                  >
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
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
export class SourcesTraceDemo {}`;
}
