import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SummaryJsonViewerDemo } from './summary-json-viewer-demo';

@Component({
  selector: 'app-summary-json-viewer-demo-container',
  imports: [DemoContainer, SummaryJsonViewerDemo],
  template: `
    <app-demo-container
      title="Summary Words"
      demoUrl="/demos/json-viewer/summary-json-viewer-demo"
      [code]="code"
    >
      <app-summary-json-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SummaryJsonViewerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer, ScJsonViewerSummary } from '@semantic-components/ui';

@Component({
  selector: 'app-summary-json-viewer-demo',
  imports: [ScJsonViewer, ScJsonViewerSummary],
  template: \`
    <ul scJsonViewer aria-label="Order" rootName="order" [data]="order">
      <ng-template scJsonViewerSummary let-node>
        @if (node.kind === 'object') {
          {{ node.size }} {{ node.size === 1 ? 'key' : 'keys' }}
        } @else {
          {{ node.size }} {{ node.size === 1 ? 'item' : 'items' }}
        }
      </ng-template>
    </ul>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class SummaryJsonViewerDemo {
  readonly order = {
    number: 'A-1024',
    paid: true,
    total: 59.9,
    customer: { name: 'Grace Hopper', vip: false },
    lines: [
      { sku: 'MUG-01', quantity: 2 },
      { sku: 'TEE-03', quantity: 1 },
    ],
    notes: ['Gift wrap'],
  };
}`;
}
