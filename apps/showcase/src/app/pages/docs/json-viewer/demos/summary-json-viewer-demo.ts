import { Component, ViewEncapsulation } from '@angular/core';
import { ScJsonViewer, ScJsonViewerSummary } from '@semantic-components/ui';

@Component({
  selector: 'app-summary-json-viewer-demo',
  imports: [ScJsonViewer, ScJsonViewerSummary],
  template: `
    <ul scJsonViewer aria-label="Order" rootName="order" [data]="order">
      <ng-template scJsonViewerSummary let-node>
        @if (node.kind === 'object') {
          {{ node.size }} {{ node.size === 1 ? 'key' : 'keys' }}
        } @else {
          {{ node.size }} {{ node.size === 1 ? 'item' : 'items' }}
        }
      </ng-template>
    </ul>
  `,
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
}
