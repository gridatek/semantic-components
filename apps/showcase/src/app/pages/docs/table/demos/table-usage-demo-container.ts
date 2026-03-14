import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../../../services/config.service';
import { TableUsageDemo } from './table-usage-demo';

@Component({
  selector: 'app-table-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    TableUsageDemo,
  ],
  template: `
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>angular-ts</span>
        <button
          scButton
          variant="ghost"
          size="icon"
          [scCopyToClipboard]="code"
          #copy="scCopyToClipboard"
          aria-label="Copy to clipboard"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
        </button>
      </div>
      <div scCodeViewerContent [code]="code" language="angular-ts"></div>
    </div>

    @if (devMode()) {
      <div
        class="mt-4 flex min-h-40 items-center justify-center rounded-md border p-6"
      >
        <app-table-usage-demo />
      </div>
    }
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import {
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
  template: \`
    <table scTable>
      <caption scTableCaption>
        A list of your recent invoices.
      </caption>
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableUsageDemo {}`;
}
