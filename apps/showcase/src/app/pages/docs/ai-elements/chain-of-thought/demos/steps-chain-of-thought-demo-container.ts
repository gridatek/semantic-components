import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { StepsChainOfThoughtDemo } from './steps-chain-of-thought-demo';

@Component({
  selector: 'app-steps-chain-of-thought-demo-container',
  imports: [DemoContainer, StepsChainOfThoughtDemo],
  template: `
    <app-demo-container
      title="Steps"
      demoUrl="/demos/ai-elements/steps-chain-of-thought-demo"
      [code]="code"
    >
      <app-steps-chain-of-thought-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsChainOfThoughtDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  SiArrowUpRightIcon,
  SiCircleAlertIcon,
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/** A step's status and title, in the matching tense: running, done, done linking out, failed. */
@Component({
  selector: 'app-steps-chain-of-thought-demo',
  imports: [
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
    SiCircleAlertIcon,
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siCircleAlertIcon></svg></span>
            <span scTraceTitle>Researched in 4 steps, 1 failed</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine status="running">
                <span scTraceIcon>
                  <svg
                    siLoaderCircleIcon
                    class="motion-safe:animate-spin"
                  ></svg>
                </span>
                <span scTraceTitle>Searching for the cache key</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>Searched for the build log</span>
              </span>
              <a
                href="https://nextjs.org/docs/app/api-reference/components/image"
                target="_blank"
                rel="noreferrer"
              >
                <span scTraceLine>
                  <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                  <span scTraceTitle>
                    Read the Image component docs
                    <span class="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
                </span>
              </a>
              <span scTraceLine status="error">
                <span scTraceIcon><svg siCircleAlertIcon></svg></span>
                <span scTraceTitle>Failed to search for deploy hooks</span>
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
export class StepsChainOfThoughtDemo {}`;
}
