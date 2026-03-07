import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
  ],
  template: `
    <table scTable class="w-full max-w-2xl">
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
        <tr scTableRow>
          <td scTableCell class="font-medium">INV003</td>
          <td scTableCell>Unpaid</td>
          <td scTableCell>Bank Transfer</td>
          <td scTableCell class="text-right">$350.00</td>
        </tr>
        <tr scTableRow>
          <td scTableCell class="font-medium">INV004</td>
          <td scTableCell>Paid</td>
          <td scTableCell>Credit Card</td>
          <td scTableCell class="text-right">$450.00</td>
        </tr>
        <tr scTableRow>
          <td scTableCell class="font-medium">INV005</td>
          <td scTableCell>Paid</td>
          <td scTableCell>PayPal</td>
          <td scTableCell class="text-right">$550.00</td>
        </tr>
      </tbody>
    </table>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTableDemo {}
