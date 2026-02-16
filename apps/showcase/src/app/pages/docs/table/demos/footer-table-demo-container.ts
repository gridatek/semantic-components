import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FooterTableDemo } from './footer-table-demo';

@Component({
  selector: 'app-footer-table-demo-container',
  imports: [DemoContainer, FooterTableDemo],
  template: `
    <app-demo-container title="With Footer" [code]="code">
      <app-footer-table-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FooterTableDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableFooter,
  ScTableHeaderCell,
  ScTableHeader,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  selector: 'app-footer-table-demo',
  imports: [
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableFooter,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
  ],
  template: \`
    <table sc-table>
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
        <tr sc-table-row>
          <td sc-table-cell class="font-medium">INV003</td>
          <td sc-table-cell>Paid</td>
          <td sc-table-cell>Bank Transfer</td>
          <td sc-table-cell class="text-right">$350.00</td>
        </tr>
      </tbody>
      <tfoot sc-table-footer>
        <tr sc-table-row>
          <td sc-table-cell colspan="3">Total</td>
          <td sc-table-cell class="text-right">$750.00</td>
        </tr>
      </tfoot>
    </table>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterTableDemo {}`;
}
