import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WhitespaceDiffViewerDemo } from './whitespace-diff-viewer-demo';

@Component({
  selector: 'app-whitespace-diff-viewer-demo-container',
  imports: [DemoContainer, WhitespaceDiffViewerDemo],
  template: `
    <app-demo-container
      title="Ignore whitespace"
      [code]="code"
      demoUrl="/demos/diff-viewer/whitespace-diff-viewer-demo"
    >
      <app-whitespace-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WhitespaceDiffViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSwitch, ScSwitchField } from '@semantic-components/ui';
import { ScCodeBlock } from '@semantic-components/ui/code-block';
import { ScDiffViewer } from '@semantic-components/ui/diff-viewer';

/** ignoreWhitespace: lines that differ only in spaces and tabs count as unchanged (ignoreCase, the same for letter case). */
@Component({
  selector: 'app-whitespace-diff-viewer-demo',
  imports: [ScCodeBlock, ScDiffViewer, ScSwitch, ScSwitchField],
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
        scDiffViewer
        #diff="scDiffViewer"
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
export class WhitespaceDiffViewerDemo {
  readonly ignore = signal(false);
  readonly before = \`function sum(a, b) {
  return a + b;
}\`;
  readonly after = \`function sum(a, b) {
    return a+b;
}\`;
}`;
}
