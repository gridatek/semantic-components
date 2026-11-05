import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TerminalOutputCodeBlockDemo } from './terminal-output-code-block-demo';

@Component({
  selector: 'app-terminal-output-code-block-demo-container',
  imports: [DemoContainer, TerminalOutputCodeBlockDemo],
  template: `
    <app-demo-container
      title="Terminal Output"
      demoUrl="/demos/code-block/terminal-output-code-block-demo"
      [code]="code"
    >
      <app-terminal-output-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TerminalOutputCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** language="ansi": a terminal’s colours, from its ANSI codes; the copy takes the text without them. */
@Component({
  selector: 'app-terminal-output-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siTerminalIcon></svg>Terminal</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="text" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy output</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="output" language="ansi" wrap></pre>
      <span aria-live="polite" class="sr-only">
        @if (copy.copied()) {
          Copied
        }
      </span>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class TerminalOutputCodeBlockDemo {
  readonly output = \`\\x1b[32m✓\\x1b[0m 12 tests passed\\n\\x1b[33m!\\x1b[0m 1 test skipped\\n\\x1b[31m✗\\x1b[0m 2 tests failed\\n\\x1b[2mDone in 1.8s\\x1b[0m\`;
  /** The output without its colour codes (ESC [ … m), to copy. */
  protected readonly text = this.output
    .split(String.fromCharCode(27))
    .map((part, i) => (i === 0 ? part : part.replace(/^\\[[\\d;]*m/, '')))
    .join('');
}`;
}
