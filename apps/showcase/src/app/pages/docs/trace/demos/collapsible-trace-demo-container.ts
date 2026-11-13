import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CollapsibleTraceDemo } from './collapsible-trace-demo';

@Component({
  selector: 'app-collapsible-trace-demo-container',
  imports: [DemoContainer, CollapsibleTraceDemo],
  template: `
    <app-demo-container
      title="Collapsible"
      demoUrl="/demos/trace/collapsible-trace-demo"
      [code]="code"
    >
      <app-collapsible-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleIcon,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiSearchIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-collapsible-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiChevronRightIcon,
    SiSearchIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div scTrace>
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Ran node --version</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>v24.18.0</div>
        </div>
      </div>
      <div scCollapsible [open]="true" scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siSearchIcon></svg></span>
            <span scTraceTitle>Searched for provideRouter</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <ul class="list-inside list-disc">
              <li>src/main.ts</li>
              <li>src/app/app.config.ts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class CollapsibleTraceDemo {}`;
}
