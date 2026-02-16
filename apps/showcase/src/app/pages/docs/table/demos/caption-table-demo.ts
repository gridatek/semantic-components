import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCaption,
  ScTableCell,
  ScTableHeaderCell,
  ScTableHeader,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  selector: 'app-caption-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCaption,
    ScTableCell,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
  ],
  template: `
    <table sc-table>
      <caption sc-table-caption>A list of your recent invoices.</caption>
      <thead sc-table-header>
        <tr sc-table-row>
          <th sc-table-header-cell class="w-[100px]">Invoice</th>
          <th sc-table-header-cell>Status</th>
          <th sc-table-header-cell>Method</th>
          <th sc-table-header-cell class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody sc-table-body>
        <tr sc-table-row>
          <td sc-table-cell class="font-medium">INV001</td>
          <td sc-table-cell>Paid</td>
          <td sc-table-cell>Credit Card</td>
          <td sc-table-cell class="text-right">$250.00</td>
        </tr>
        <tr sc-table-row>
          <td sc-table-cell class="font-medium">INV002</td>
          <td sc-table-cell>Pending</td>
          <td sc-table-cell>PayPal</td>
          <td sc-table-cell class="text-right">$150.00</td>
        </tr>
      </tbody>
    </table>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptionTableDemo {}
