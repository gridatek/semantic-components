import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FoldedDiffViewerDemo } from './folded-diff-viewer-demo';

@Component({
  selector: 'app-folded-diff-viewer-demo-container',
  imports: [DemoContainer, FoldedDiffViewerDemo],
  template: `
    <app-demo-container
      title="Folded"
      [code]="code"
      demoUrl="/demos/diff-viewer/folded-diff-viewer-demo"
    >
      <app-folded-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FoldedDiffViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
  ScDiffViewer,
  ScDiffViewerFold,
} from '@semantic-components/code';

/** Settings with \`count\` keys. */
function settings(count: number): Record<string, string> {
  return Object.fromEntries(
    Array.from({ length: count }, (_, i) => [\`key\${i}\`, \`value \${i}\`]),
  );
}

/** context: unchanged lines kept around each change; the rest folded — your scDiffViewerFold template writes the button, a click shows them. */
@Component({
  selector: 'app-folded-diff-viewer-demo',
  imports: [
    ScCodeBlock,
    ScDiffViewer,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScDiffViewerFold,
  ],
  template: \`
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>settings.json</div>
      </div>
      <div
        scDiffViewer
        language="json"
        [context]="2"
        [oldText]="before"
        [newText]="after"
      >
        <ng-template scDiffViewerFold let-count>
          Show {{ count }} unchanged lines
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class FoldedDiffViewerDemo {
  readonly before = JSON.stringify(settings(14), null, 2);
  readonly after = JSON.stringify(
    { ...settings(14), key7: 'changed' },
    null,
    2,
  );
}`;
}
