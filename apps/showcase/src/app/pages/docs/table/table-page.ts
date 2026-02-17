import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScCopyButton } from '@semantic-components/ui-lab';
import BasicTableDemoContainer from './demos/basic-table-demo-container';
import CaptionTableDemoContainer from './demos/caption-table-demo-container';
import FooterTableDemoContainer from './demos/footer-table-demo-container';
import UsersTableDemoContainer from './demos/users-table-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-table-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    BasicTableDemoContainer,
    CaptionTableDemoContainer,
    FooterTableDemoContainer,
    UsersTableDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Table</h1>
        <p class="text-muted-foreground">A responsive table component.</p>
        <app-component-badges path="table" />
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button scCopyButton [value]="usageCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-table-demo-container />
        <app-caption-table-demo-container />
        <app-footer-table-demo-container />
        <app-users-table-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TablePage {
  readonly usageCode = `import {
  ScTable,
  ScTableBody,
  ScTableCaption,
  ScTableCell,
  ScTableFooter,
  ScTableHeaderCell,
  ScTableHeader,
  ScTableRow,
} from '@semantic-components/ui';

@Component({
  imports: [
    ScTable,
    ScTableBody,
    ScTableCaption,
    ScTableCell,
    ScTableFooter,
    ScTableHeaderCell,
    ScTableHeader,
    ScTableRow,
    TocHeading,
  ],
  template: \`
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
  \`,
})
export class MyComponent {}`;
}
