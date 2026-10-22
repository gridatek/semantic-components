import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCodeEditorNextDemo } from './basic-code-editor-next-demo';

@Component({
  selector: 'app-basic-code-editor-next-demo-container',
  imports: [DemoContainer, BasicCodeEditorNextDemo],
  template: `
    <app-demo-container
      title="Basic"
      [code]="code"
      demoUrl="/demos/code-editor-next/basic-code-editor-next-demo"
    >
      <app-basic-code-editor-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCodeEditorNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
  ScCodeEditorNext,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

/** CodeMirror, colored by the app’s highlighter (Shiki, like a code block), in a code block for its frame, title and copy button. Tab indents; Escape then Tab moves on. */
@Component({
  selector: 'app-basic-code-editor-next-demo',
  imports: [
    ScCodeBlock,
    ScCodeEditorNext,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
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
        scCodeEditorNext
        aria-label="counter.ts"
        language="angular-ts"
        class="max-h-80"
        [(value)]="code"
      ></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-2xl' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCodeEditorNextDemo {
  readonly code = signal(\`import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>',
})
export class Counter {
  readonly count = signal(0);

  increment(): void {
    this.count.update((count) => count + 1);
  }
}\`);
}`;
}
