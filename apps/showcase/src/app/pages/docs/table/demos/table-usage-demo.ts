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
  ScTableFooter,
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
    ScTableFooter,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
  ],
  template: `
    <table scTable>
      <caption scTableCaption>A list of your recent invoices.</caption>
      <thead scTableHeader>
        <tr scTableRow>
          <th scTableHeaderCell>Invoice</th>
          <th scTableHeaderCell>Status</th>
          <th scTableHeaderCell class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody scTableBody>
        <tr scTableRow>
          <td scTableCell>INV001</td>
          <td scTableCell>Paid</td>
          <td scTableCell class="text-right">$250.00</td>
        </tr>
      </tbody>
      <tfoot scTableFooter>
        <tr scTableRow>
          <td scTableCell colspan="2">Total</td>
          <td scTableCell class="text-right">$250.00</td>
        </tr>
      </tfoot>
    </table>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsageDemo {}
