import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { DataTableUsageDemo } from './data-table-usage-demo';

@Component({
  selector: 'app-data-table-usage-demo-container',
  imports: [UsageCode, DataTableUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-data-table-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DataTableUsageDemoContainer {
  private readonly code = `import {
  createColumnHelper,
  createSortedRowModel,
  injectTable,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScFrame } from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';

interface Payment {
  id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  amount: number;
}

/** TanStack's features the table uses: sorting. */
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, Payment>();

const columns = columnHelper.columns([
  columnHelper.accessor('status', { header: 'Status', enableSorting: false }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('amount', { header: 'Amount', enableSorting: false }),
]);

/** TanStack Table holds the rows and their order; the parts render it — here sorted by email. */
@Component({
  selector: 'app-data-table-usage-demo',
  imports: [
    ScFrame,
    ScDataTableCell,
    ScDataTableHeaderCell,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronsUpDownIcon,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
  ],
  template: \`
    <div scDataTableContainer scFrame class="w-full max-w-lg">
      <table scDataTable>
        <thead scDataTableHeader>
          @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
            <tr scDataTableRow>
              @for (header of headerGroup.headers; track header.id) {
                <th scDataTableHeaderCell [column]="header.column">
                  @if (header.column.getCanSort()) {
                    <button
                      scDataTableSortButton
                      #sort="scDataTableSortButton"
                      [column]="header.column"
                    >
                      {{ header.column.columnDef.header }}
                      @switch (sort.direction()) {
                        @case ('asc') {
                          <svg siArrowUpIcon></svg>
                        }
                        @case ('desc') {
                          <svg siArrowDownIcon></svg>
                        }
                        @default {
                          <svg siChevronsUpDownIcon></svg>
                        }
                      }
                    </button>
                  } @else {
                    <div [class.text-end]="header.column.id === 'amount'">
                      {{ header.column.columnDef.header }}
                    </div>
                  }
                </th>
              }
            </tr>
          }
        </thead>
        <tbody scDataTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scDataTableRow [row]="row">
              <td scDataTableCell class="capitalize">
                {{ row.original.status }}
              </td>
              <td scDataTableCell>{{ row.original.email }}</td>
              <td scDataTableCell class="text-end font-medium">
                {{ amount.format(row.original.amount) }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DataTableUsageDemo {
  private readonly amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: PAYMENTS,
    getRowId: (payment) => payment.id,
  }));
}

const PAYMENTS: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@example.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'abe45@example.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'monserrat44@example.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'silas22@example.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@example.com',
  },
];`;
}
