import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** Actions straight in the block, without a header: at the top end, shown on hover or focus — always on a touch screen. size="sm" for a tighter block. */
@Component({
  selector: 'app-floating-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCopyIcon,
    SiCheckIcon,
  ],
  template: `
    <div scCodeBlock size="sm">
      <div scCodeBlockActions>
        <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
          <span class="sr-only">Copy command</span>
        </button>
      </div>
      <pre scCodeBlockContent [code]="source" language="bash"></pre>
      <span aria-live="polite" class="sr-only">
        @if (copy.copied()) {
          Copied
        }
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-xl' },
  encapsulation: ViewEncapsulation.None,
})
export class FloatingCodeBlockDemo {
  readonly source = `npx ng add @semantic-components/ui`;
}
