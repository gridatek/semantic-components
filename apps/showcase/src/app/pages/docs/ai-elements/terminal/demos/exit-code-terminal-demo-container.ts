import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { ExitCodeTerminalDemo } from './exit-code-terminal-demo';

@Component({
  selector: 'app-exit-code-terminal-demo-container',
  imports: [DemoContainer, ExitCodeTerminalDemo],
  template: `
    <app-demo-container
      title="Exit code"
      demoUrl="/demos/ai-elements/exit-code-terminal-demo"
      [code]="code"
    >
      <app-exit-code-terminal-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ExitCodeTerminalDemoContainer {
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

const LINT_OUTPUT = \`> acme-chat@0.1.0 lint
> eslint .

app/api/chat/route.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/chat.tsx
  42:5  error  React Hook useEffect has a missing dependency: 'messages'  react-hooks/exhaustive-deps

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.\`;

/** A command that exits with any code but 0 failed: an error line, its output open. */
@Component({
  selector: 'app-exit-code-terminal-demo',
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
      <span scTraceLine>
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Ran pnpm install</span>
      </span>
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>pnpm lint exited with code 1</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scCodeBlock size="sm">
              <pre
                scCodeBlockContent
                wrap
                class="max-h-64"
                [code]="output"
              ></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExitCodeTerminalDemo {
  protected readonly output = LINT_OUTPUT;
}`;
}
