import {
  createColumnHelper,
  createSortedRowModel,
  injectTable,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  ScDataTableCell,
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
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableCell,
    ScDataTableHeaderCell,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div scTableContainer scFrame class="w-full max-w-lg">
      <table scTable>
        <thead scTableHeader>
          @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
            <tr scTableRow>
              @for (header of headerGroup.headers; track header.id) {
                <th
                  scTableHeaderCell
                  scDataTableHeaderCell
                  [column]="header.column"
                >
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
        <tbody scTableBody>
          @for (row of table.getRowModel().rows; track row.id) {
            <tr scTableRow scDataTableRow [row]="row">
              <td scTableCell scDataTableCell class="capitalize">
                {{ row.original.status }}
              </td>
              <td scTableCell scDataTableCell>{{ row.original.email }}</td>
              <td scTableCell scDataTableCell class="text-end font-medium">
                {{ amount.format(row.original.amount) }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DataTableUsageDemo {
  protected readonly amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  readonly table = injectTable(() => ({
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
];
