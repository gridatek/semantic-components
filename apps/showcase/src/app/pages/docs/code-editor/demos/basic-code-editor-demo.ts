import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { ScCodeEditor } from '@semantic-components/ui/code-editor';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** CodeMirror, colored by the app’s highlighter (Shiki, like a code block), in a code block for its frame, title and copy button. Tab indents; Escape then Tab moves on. */
@Component({
  selector: 'app-basic-code-editor-demo',
  imports: [
    ScCodeBlock,
    ScCodeEditor,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>counter.ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code()" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy code</span>
          </button>
        </div>
      </div>
      <div
        scCodeEditor
        aria-label="counter.ts"
        language="typescript"
        class="max-h-80"
        [(value)]="code"
      ></div>
    </div>
  `,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCodeEditorDemo {
  readonly code = signal(`import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>',
})
export class Counter {
  readonly count = signal(0);

  increment(): void {
    this.count.update((count) => count + 1);
  }
}`);
}
