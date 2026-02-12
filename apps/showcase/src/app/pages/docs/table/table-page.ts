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
  ScCopyButton,
} from '@semantic-components/ui-lab';
import BasicTableDemoContainer from './demos/basic-table-demo-container';
import CaptionTableDemoContainer from './demos/caption-table-demo-container';
import FooterTableDemoContainer from './demos/footer-table-demo-container';
import UsersTableDemoContainer from './demos/users-table-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

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
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Table</h1>
        <p class="text-muted-foreground">A responsive table component.</p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>angular-ts</span>
            <button sc-copy-button [value]="usageCode"></button>
          </div>
          <div
            sc-code-viewer-content
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
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'table')!.status;
  readonly usageCode = `import {
  ScTable,
  ScTableBody,
  ScTableCaption,
  ScTableCell,
  ScTableFooter,
  ScTableHeaderCell,
  ScTableHeader,
  ScTableRow,
} from '@semantic-components/ui-lab';

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
    <table sc-table>
      <caption sc-table-caption>A list of your recent invoices.</caption>
      <thead sc-table-header>
        <tr sc-table-row>
          <th sc-table-header-cell>Invoice</th>
          <th sc-table-header-cell>Status</th>
          <th sc-table-header-cell class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody sc-table-body>
        <tr sc-table-row>
          <td sc-table-cell>INV001</td>
          <td sc-table-cell>Paid</td>
          <td sc-table-cell class="text-right">$250.00</td>
        </tr>
      </tbody>
      <tfoot sc-table-footer>
        <tr sc-table-row>
          <td sc-table-cell colspan="2">Total</td>
          <td sc-table-cell class="text-right">$250.00</td>
        </tr>
      </tfoot>
    </table>
  \`,
})
export class MyComponent {}`;
}
