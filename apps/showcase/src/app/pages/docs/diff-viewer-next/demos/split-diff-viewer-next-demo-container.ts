import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SplitDiffViewerNextDemo } from './split-diff-viewer-next-demo';

@Component({
  selector: 'app-split-diff-viewer-next-demo-container',
  imports: [DemoContainer, SplitDiffViewerNextDemo],
  template: `
    <app-demo-container
      title="Split"
      [code]="code"
      demoUrl="/demos/diff-viewer-next/split-diff-viewer-next-demo"
    >
      <app-split-diff-viewer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitDiffViewerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
  type ScDiffView,
  ScDiffViewerNext,
} from '@semantic-components/code';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** Side by side: the old text facing the new, rows aligned, long lines wrapped. Your header holds the title, the counts and a switch for the view ([(view)]). */
@Component({
  selector: 'app-split-diff-viewer-next-demo',
  imports: [
    ScCodeBlock,
    ScDiffViewerNext,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>counter.ts</div>
        <span class="text-xs tabular-nums"
          >+{{ diff.additions() }} −{{ diff.deletions() }}</span
        >
        <div
          scToggleGroup
          size="sm"
          aria-label="View"
          class="ms-auto"
          [value]="view()"
          (valueChange)="show($event)"
        >
          <button scToggleGroupItem value="split">Split</button>
          <button scToggleGroupItem value="unified">Unified</button>
        </div>
      </div>
      <div
        scDiffViewerNext
        #diff="scDiffViewerNext"
        language="angular-ts"
        [oldText]="before"
        [newText]="after"
        [(view)]="view"
      ></div>
    </div>
  \`,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class SplitDiffViewerNextDemo {
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
  readonly view = signal<ScDiffView>('split');

  show(view: string | string[] | null): void {
    if (view === 'split' || view === 'unified') this.view.set(view);
  }
}`;
}
