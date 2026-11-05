import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HeaderCodeBlockDemo } from './header-code-block-demo';

@Component({
  selector: 'app-header-code-block-demo-container',
  imports: [DemoContainer, HeaderCodeBlockDemo],
  template: `
    <app-demo-container
      title="Header"
      demoUrl="/demos/code-block/header-code-block-demo"
      [code]="code"
    >
      <app-header-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderCodeBlockDemoContainer {
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

/** A title (your icon and text) and its actions at the end. */
@Component({
  selector: 'app-header-code-block-demo',
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
          <button [scCodeBlockCopy]="output" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy output</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="output"></pre>
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
export class HeaderCodeBlockDemo {
  readonly output = \`$ pnpm build
> next build

✓ Compiled successfully in 4.2s
✓ Linting and checking validity of types
✓ Generating static pages (12/12)\`;
}`;
}
