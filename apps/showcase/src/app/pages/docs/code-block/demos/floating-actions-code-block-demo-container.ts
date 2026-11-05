import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FloatingActionsCodeBlockDemo } from './floating-actions-code-block-demo';

@Component({
  selector: 'app-floating-actions-code-block-demo-container',
  imports: [DemoContainer, FloatingActionsCodeBlockDemo],
  template: `
    <app-demo-container
      title="Floating Actions"
      demoUrl="/demos/code-block/floating-actions-code-block-demo"
      [code]="code"
    >
      <app-floating-actions-code-block-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FloatingActionsCodeBlockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** Actions straight in the block, no header: over the code, shown on hover or focus (always on touch). */
@Component({
  selector: 'app-floating-actions-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeBlock>
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
export class FloatingActionsCodeBlockDemo {
  readonly output = \`$ pnpm build
> next build

✓ Compiled successfully in 4.2s
✓ Linting and checking validity of types
✓ Generating static pages (12/12)\`;
}`;
}
