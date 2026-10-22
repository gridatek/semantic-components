import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UnifiedDiffViewerNextDemo } from './unified-diff-viewer-next-demo';

@Component({
  selector: 'app-unified-diff-viewer-next-demo-container',
  imports: [DemoContainer, UnifiedDiffViewerNextDemo],
  template: `
    <app-demo-container
      title="Unified"
      [code]="code"
      demoUrl="/demos/diff-viewer-next/unified-diff-viewer-next-demo"
    >
      <app-unified-diff-viewer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class UnifiedDiffViewerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
  ScDiffViewerNext,
} from '@semantic-components/code';

/** One column, both line numbers, + and − — the words changed in a changed line marked. */
@Component({
  selector: 'app-unified-diff-viewer-next-demo',
  imports: [ScCodeBlock, ScDiffViewerNext, ScCodeBlockHeader, ScCodeBlockTitle],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>counter.ts</div>
        <span class="text-xs tabular-nums"
          >+{{ diff.additions() }} −{{ diff.deletions() }}</span
        >
      </div>
      <div
        scDiffViewerNext
        #diff="scDiffViewerNext"
        language="angular-ts"
        [oldText]="before"
        [newText]="after"
      ></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class UnifiedDiffViewerNextDemo {
  readonly before = \`import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>',
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}\`;
  readonly after = \`import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">Clicked {{ count() }} times</button>',
})
export class Counter {
  readonly count = signal(0);

  increment(): void {
    this.count.update((count) => count + 1);
  }
}\`;
}`;
}
