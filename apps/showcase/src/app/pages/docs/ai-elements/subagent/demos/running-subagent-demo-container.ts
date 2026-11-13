import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RunningSubagentDemo } from './running-subagent-demo';

@Component({
  selector: 'app-running-subagent-demo-container',
  imports: [DemoContainer, RunningSubagentDemo],
  template: `
    <app-demo-container
      title="Running"
      demoUrl="/demos/ai-elements/running-subagent-demo"
      [code]="code"
    >
      <app-running-subagent-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RunningSubagentDemoContainer {
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
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/** While the subagent runs: a running line, the tool calls so far inside. */
@Component({
  selector: 'app-running-subagent-demo',
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
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="running">
            <span scTraceIcon>
              <svg siLoaderCircleIcon class="motion-safe:animate-spin"></svg>
            </span>
            <span scTraceTitle>Running the research agent</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>Ran grep -rn cacheKey scripts</span>
              </span>
              <span scTraceLine status="running">
                <span scTraceIcon>
                  <svg
                    siLoaderCircleIcon
                    class="motion-safe:animate-spin"
                  ></svg>
                </span>
                <span scTraceTitle
                  >Running sed -n 13,15p scripts/optimize-images.ts</span
                >
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
export class RunningSubagentDemo {}`;
}
