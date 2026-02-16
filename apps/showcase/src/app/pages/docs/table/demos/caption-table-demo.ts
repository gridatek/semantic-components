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
    <table scTable>
      <caption scTableCaption>A list of your recent invoices.</caption>
      <thead scTableHeader>
        <tr scTableRow>
          <th scTableHeaderCell class="w-[100px]">Invoice</th>
          <th scTableHeaderCell>Status</th>
          <th scTableHeaderCell>Method</th>
          <th scTableHeaderCell class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody scTableBody>
        <tr scTableRow>
          <td scTableCell class="font-medium">INV001</td>
          <td scTableCell>Paid</td>
          <td scTableCell>Credit Card</td>
          <td scTableCell class="text-right">$250.00</td>
        </tr>
        <tr scTableRow>
          <td scTableCell class="font-medium">INV002</td>
          <td scTableCell>Pending</td>
          <td scTableCell>PayPal</td>
          <td scTableCell class="text-right">$150.00</td>
        </tr>
      </tbody>
    </table>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptionTableDemo {}
