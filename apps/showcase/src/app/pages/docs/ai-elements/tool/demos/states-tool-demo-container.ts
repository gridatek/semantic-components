import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { StatesToolDemo } from './states-tool-demo';

@Component({
  selector: 'app-states-tool-demo-container',
  imports: [DemoContainer, StatesToolDemo],
  template: `
    <app-demo-container
      title="States"
      demoUrl="/demos/ai-elements/states-tool-demo"
      [code]="code"
    >
      <app-states-tool-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StatesToolDemoContainer {
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
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import { SiTerminalIcon } from '@semantic-icons/lucide-icons';

/** Each tool state as a line: ran, failed, denied, running. */
@Component({
  selector: 'app-states-tool-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockContent,
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
    SiTerminalIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Ran git status --short</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scCodeBlock size="sm">
              <pre
                scCodeBlockContent
                wrap
                class="max-h-64"
                [code]="status"
              ></pre>
            </div>
          </div>
        </div>
      </div>
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Failed to run pnpm dev</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scCodeBlock size="sm">
              <pre
                scCodeBlockContent
                wrap
                class="max-h-64"
                [code]="'Command timed out after 120 seconds.'"
              ></pre>
            </div>
          </div>
        </div>
      </div>
      <span scTraceLine>
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Denied rm -rf dist</span>
      </span>
      <span scTraceLine status="running">
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Running pnpm test</span>
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatesToolDemo {
  protected readonly status =
    ' M app/api/chat/route.ts\\n M components/chat.tsx';
}`;
}
