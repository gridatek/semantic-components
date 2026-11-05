import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveCodeBlockDemo } from './destructive-code-block-demo';

@Component({
  selector: 'app-destructive-code-block-demo-container',
  imports: [DemoContainer, DestructiveCodeBlockDemo],
  template: `
    <app-demo-container
      title="Destructive"
      demoUrl="/demos/code-block/destructive-code-block-demo"
      [code]="code"
    >
      <app-destructive-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveCodeBlockDemoContainer {
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
  SiCircleAlertIcon,
  SiCopyIcon,
} from '@semantic-icons/lucide-icons';

/** variant="destructive": an error, in the destructive color. */
@Component({
  selector: 'app-destructive-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    SiCircleAlertIcon,
  ],
  template: \`
    <div scCodeBlock variant="destructive">
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siCircleAlertIcon></svg>Error</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="error" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy error</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="error" wrap></pre>
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
export class DestructiveCodeBlockDemo {
  readonly error = \`Error: Cannot find module './config'
    at resolve (node:internal/modules/cjs/loader:1145:15)
    at load (src/app.ts:3:1)\`;
}`;
}
