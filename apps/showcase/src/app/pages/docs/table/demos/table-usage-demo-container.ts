import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { TableUsageDemo } from './table-usage-demo';

@Component({
  selector: 'app-table-usage-demo-container',
  imports: [UsageCode, TableUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-table-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TableUsageDemoContainer {
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
