import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WhitespaceDiffViewerNextDemo } from './whitespace-diff-viewer-next-demo';

@Component({
  selector: 'app-whitespace-diff-viewer-next-demo-container',
  imports: [DemoContainer, WhitespaceDiffViewerNextDemo],
  template: `
    <app-demo-container
      title="Ignore whitespace"
      [code]="code"
      demoUrl="/demos/diff-viewer-next/whitespace-diff-viewer-next-demo"
    >
      <app-whitespace-diff-viewer-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WhitespaceDiffViewerNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScCodeBlock, ScDiffViewerNext } from '@semantic-components/code';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** ignoreWhitespace: lines that differ only in spaces and tabs count as unchanged (ignoreCase, the same for letter case). */
@Component({
  selector: 'app-whitespace-diff-viewer-next-demo',
  imports: [ScCodeBlock, ScDiffViewerNext, ScSwitch, ScSwitchField],
  template: \`
    <label scSwitchField class="mb-3">
      <input
        type="checkbox"
        scSwitch
        [checked]="ignore()"
        (change)="ignore.set(!ignore())"
      />
      Ignore whitespace
    </label>
    <div scCodeBlock>
      <div
        scDiffViewerNext
        #diff="scDiffViewerNext"
        language="typescript"
        [ignoreWhitespace]="ignore()"
        [oldText]="before"
        [newText]="after"
      ></div>
    </div>
    <p class="text-muted-foreground mt-2 text-sm" data-testid="counts">
      +{{ diff.additions() }} −{{ diff.deletions() }}
    </p>
  \`,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class WhitespaceDiffViewerNextDemo {
  readonly ignore = signal(false);
  readonly before = \`function sum(a, b) {
  return a + b;
}\`;
  readonly after = \`function sum(a, b) {
    return a+b;
}\`;
}`;
}
