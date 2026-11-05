import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeCodeBlockDemo } from './size-code-block-demo';

@Component({
  selector: 'app-size-code-block-demo-container',
  imports: [DemoContainer, SizeCodeBlockDemo],
  template: `
    <app-demo-container
      title="Size"
      demoUrl="/demos/code-block/size-code-block-demo"
      [code]="code"
    >
      <app-size-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeCodeBlockDemoContainer {
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

/** size="sm": tighter, smaller text. */
@Component({
  selector: 'app-size-code-block-demo',
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
    <div class="flex flex-col gap-4">
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
        <pre scCodeBlockContent [code]="output" wrap></pre>
        <span aria-live="polite" class="sr-only">
          @if (copy.copied()) {
            Copied
          }
        </span>
      </div>
      <div scCodeBlock size="sm">
        <div scCodeBlockHeader>
          <div scCodeBlockTitle><svg siTerminalIcon></svg>Terminal</div>
          <div scCodeBlockActions>
            <button [scCodeBlockCopy]="output" #small="scCodeBlockCopy">
              @if (small.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">Copy output</span>
            </button>
          </div>
        </div>
        <pre scCodeBlockContent [code]="output" wrap></pre>
        <span aria-live="polite" class="sr-only">
          @if (small.copied()) {
            Copied
          }
        </span>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeCodeBlockDemo {
  readonly output = \`$ pnpm build
> next build

✓ Compiled successfully in 4.2s
✓ Linting and checking validity of types
✓ Generating static pages (12/12)\`;
}`;
}
