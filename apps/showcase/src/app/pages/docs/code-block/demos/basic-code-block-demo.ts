import { Component, ViewEncapsulation } from '@angular/core';
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
  SiFileCodeIcon,
} from '@semantic-icons/lucide-icons';

/** A header with a title and a copy button; the code highlighted in its language — the app provides the highlighter (provideCodeHighlighter). */
@Component({
  selector: 'app-basic-code-block-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiFileCodeIcon,
    SiCopyIcon,
    SiCheckIcon,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle><svg siFileCodeIcon></svg>counter.ts</div>
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
      <pre scCodeBlockContent [code]="source" language="angular-ts"></pre>
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
export class BasicCodeBlockDemo {
  readonly source = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`<button (click)="count.set(count() + 1)">{{ count() }}</button>\`,
})
export class Counter {
  readonly count = signal(0);
}`;
}
