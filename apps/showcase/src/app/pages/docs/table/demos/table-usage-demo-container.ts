import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { TableUsageDemo } from './table-usage-demo';

@Component({
  selector: 'app-table-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    TableUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-table-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TableUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCaption,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  selector: 'app-table-usage-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCaption,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: \`
    <div scTableContainer>
      <table scTable>
        <caption scTableCaption>
          A list of your recent invoices.
        </caption>
        <thead scTableHeader>
          <tr scTableRow>
            <th scTableHeaderCell class="w-24">Invoice</th>
            <th scTableHeaderCell>Status</th>
            <th scTableHeaderCell>Method</th>
            <th scTableHeaderCell class="text-end">Amount</th>
          </tr>
        </thead>
        <tbody scTableBody>
          @for (invoice of invoices; track invoice.id) {
            <tr scTableRow>
              <td scTableCell class="font-medium">{{ invoice.id }}</td>
              <td scTableCell>{{ invoice.status }}</td>
              <td scTableCell>{{ invoice.method }}</td>
              <td scTableCell class="text-end">{{ invoice.amount }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TableUsageDemo {
  protected readonly invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    {
      id: 'INV003',
      status: 'Unpaid',
      method: 'Bank Transfer',
      amount: '$350.00',
    },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
    {
      id: 'INV006',
      status: 'Pending',
      method: 'Bank Transfer',
      amount: '$200.00',
    },
    {
      id: 'INV007',
      status: 'Unpaid',
      method: 'Credit Card',
      amount: '$550.00',
    },
  ];
}`;
}
