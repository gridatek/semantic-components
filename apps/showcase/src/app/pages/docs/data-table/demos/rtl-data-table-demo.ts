import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  injectTable,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import {
  ScCheckbox,
  ScField,
  ScFrame,
  ScPaginationItem,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableColumnFilter,
  ScDataTableContainer,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableProvider,
  ScDataTableRow,
  ScDataTableSelectAll,
  ScDataTableSelectRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

const STATUS: Record<Payment['status'], string> = {
  pending: 'قيد الانتظار',
  processing: 'قيد المعالجة',
  success: 'ناجحة',
  failed: 'فاشلة',
};

const features = tableFeatures({
  columnFilteringFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, Payment>();

const columns = columnHelper.columns([
  columnHelper.display({ id: 'select', enableSorting: false }),
  columnHelper.accessor('status', { header: 'الحالة', enableSorting: false }),
  columnHelper.accessor('email', { header: 'البريد الإلكتروني' }),
  columnHelper.accessor('amount', { header: 'المبلغ' }),
]);

/** Right to left: the filter, the sort buttons and the pagination mirrored, the amounts in Arabic. */
@Component({
  selector: 'app-rtl-data-table-demo',
  imports: [
    Dir,
    ScCheckbox,
    ScField,
    ScFrame,
    ScPaginationItem,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScDataTable,
    ScDataTableBody,
    ScDataTableCell,
    ScDataTableColumnFilter,
    ScDataTableContainer,
    ScDataTableHeader,
    ScDataTableHeaderCell,
    ScDataTablePagination,
    ScDataTableProvider,
    ScDataTableRow,
    ScDataTableSelectAll,
    ScDataTableSelectRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronsUpDownIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div
      dir="rtl"
      lang="ar"
      scDataTableProvider
      [table]="table"
      class="flex w-full flex-col gap-4"
    >
      @if (email(); as email) {
        <input
          scDataTableColumnFilter
          [column]="email"
          placeholder="تصفية البريد الإلكتروني..."
          aria-label="تصفية البريد الإلكتروني"
          class="max-w-sm"
        />
      }

      <div scDataTableContainer scFrame>
        <table scDataTable>
          <thead scDataTableHeader>
            @for (group of table.getHeaderGroups(); track group.id) {
              <tr scDataTableRow>
                @for (header of group.headers; track header.id) {
                  <th scDataTableHeaderCell [column]="header.column">
                    @if (header.column.id === 'select') {
                      <label scField orientation="horizontal">
                        <input
                          type="checkbox"
                          scCheckbox
                          scDataTableSelectAll
                          aria-label="تحديد الكل"
                        />
                      </label>
                    } @else if (header.column.getCanSort()) {
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
                      {{ header.column.columnDef.header }}
                    }
                  </th>
                }
              </tr>
            }
          </thead>
          <tbody scDataTableBody>
            @for (row of table.getRowModel().rows; track row.id) {
              <tr scDataTableRow [row]="row">
                <td scDataTableCell>
                  <label scField orientation="horizontal">
                    <input
                      type="checkbox"
                      scCheckbox
                      scDataTableSelectRow
                      [row]="row"
                      [attr.aria-label]="'تحديد ' + row.original.email"
                    />
                  </label>
                </td>
                <td scDataTableCell>{{ status[row.original.status] }}</td>
                <td scDataTableCell>
                  <span dir="ltr">{{ row.original.email }}</span>
                </td>
                <td scDataTableCell class="font-medium">
                  {{ amount.format(row.original.amount) }}
                </td>
              </tr>
            } @empty {
              <tr scDataTableRow>
                <td scDataTableCell colspan="4" class="h-24 text-center">
                  لا توجد نتائج.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-end gap-2">
        <div class="text-muted-foreground flex-1 text-sm">
          {{ selected() }} من {{ table.getFilteredRowModel().rows.length }}
          صف محدد.
        </div>
        <nav
          scDataTablePagination
          aria-label="صفحات المدفوعات"
          class="mx-0 w-auto"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="sm">
                السابق
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="sm">
                التالي
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDataTableDemo {
  private readonly amount = new Intl.NumberFormat(inject(LOCALE_ID), {
    style: 'currency',
    currency: 'USD',
  });
  private readonly status = STATUS;

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: PAYMENTS,
    getRowId: (payment) => payment.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 4 } },
  }));

  private readonly email = computed(() => this.table.getColumn('email'));

  private readonly selected = computed(
    () => this.table.getFilteredSelectedRowModel().rows.length,
  );
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
  {
    id: 'q8wz13lk',
    amount: 159,
    status: 'pending',
    email: 'nadia@example.com',
  },
];
