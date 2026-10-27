import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IdenticalDiffViewerDemo } from './identical-diff-viewer-demo';

@Component({
  selector: 'app-identical-diff-viewer-demo-container',
  imports: [DemoContainer, IdenticalDiffViewerDemo],
  template: `
    <app-demo-container
      title="Identical"
      [code]="code"
      demoUrl="/demos/diff-viewer/identical-diff-viewer-demo"
    >
      <app-identical-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IdenticalDiffViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockFooter,
} from '@semantic-components/ui/code-block';
import { ScDiffViewer } from '@semantic-components/ui/diff-viewer';

/** identical(): nothing changed — show your own words. */
@Component({
  selector: 'app-identical-diff-viewer-demo',
  imports: [ScCodeBlock, ScDiffViewer, ScCodeBlockFooter],
  template: \`
    <div scCodeBlock>
      <div
        scDiffViewer
        #diff="scDiffViewer"
        [oldText]="text"
        [newText]="text"
      ></div>
      @if (diff.identical()) {
        <div scCodeBlockFooter>No differences.</div>
      }
    </div>
  \`,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class IdenticalDiffViewerDemo {
  readonly text = \`ng add @semantic-components/ui\`;
}`;
}
