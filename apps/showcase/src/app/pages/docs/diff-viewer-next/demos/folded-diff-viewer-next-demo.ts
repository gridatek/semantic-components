import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
  ScDiffViewerNext,
  ScDiffViewerNextFold,
} from '@semantic-components/code';

/** Settings with `count` keys. */
function settings(count: number): Record<string, string> {
  return Object.fromEntries(
    Array.from({ length: count }, (_, i) => [`key${i}`, `value ${i}`]),
  );
}

/** context: unchanged lines kept around each change; the rest folded — your scDiffViewerNextFold template writes the button, a click shows them. */
@Component({
  selector: 'app-folded-diff-viewer-next-demo',
  imports: [
    ScCodeBlock,
    ScDiffViewerNext,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScDiffViewerNextFold,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>settings.json</div>
      </div>
      <div
        scDiffViewerNext
        language="json"
        [context]="2"
        [oldText]="before"
        [newText]="after"
      >
        <ng-template scDiffViewerNextFold let-count>
          Show {{ count }} unchanged lines
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-3xl' },
  encapsulation: ViewEncapsulation.None,
})
export class FoldedDiffViewerNextDemo {
  readonly before = JSON.stringify(settings(14), null, 2);
  readonly after = JSON.stringify(
    { ...settings(14), key7: 'changed' },
    null,
    2,
  );
}
