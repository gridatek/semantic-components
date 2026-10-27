import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { ScDiffViewer } from '@semantic-components/ui/diff-viewer';

/** One column, both line numbers, + and − — the words changed in a changed line marked. */
@Component({
  selector: 'app-unified-diff-viewer-demo',
  imports: [ScCodeBlock, ScDiffViewer, ScCodeBlockHeader, ScCodeBlockTitle],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>counter.ts</div>
        <span class="text-xs tabular-nums"
          >+{{ diff.additions() }} −{{ diff.deletions() }}</span
        >
      </div>
      <div
        scDiffViewer
        #diff="scDiffViewer"
        language="angular-ts"
        [oldText]="before"
        [newText]="after"
      ></div>
    </div>
  `,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class UnifiedDiffViewerDemo {
  readonly before = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>',
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}`;
  readonly after = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">Clicked {{ count() }} times</button>',
})
export class Counter {
  readonly count = signal(0);

  increment(): void {
    this.count.update((count) => count + 1);
  }
}`;
}
