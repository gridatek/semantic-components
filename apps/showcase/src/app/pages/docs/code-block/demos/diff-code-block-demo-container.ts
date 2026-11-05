import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DiffCodeBlockDemo } from './diff-code-block-demo';

@Component({
  selector: 'app-diff-code-block-demo-container',
  imports: [DemoContainer, DiffCodeBlockDemo],
  template: `
    <app-demo-container
      title="Diff"
      demoUrl="/demos/code-block/diff-code-block-demo"
      [code]="code"
    >
      <app-diff-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DiffCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** addedLines and removedLines: a change, marked + and −. */
@Component({
  selector: 'app-diff-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>greeting.ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy code</span>
          </button>
        </div>
      </div>
      <pre
        scCodeBlockContent
        [code]="source"
        language="typescript"
        [removedLines]="[2]"
        [addedLines]="[3]"
      ></pre>
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
export class DiffCodeBlockDemo {
  readonly source = \`export function greet(name: string) {
  return 'Hello ' + name;
  return \\\`Hello, \\\${name}!\\\`;
}\`;
}`;
}
