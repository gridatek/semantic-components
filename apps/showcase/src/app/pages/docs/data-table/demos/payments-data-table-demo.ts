import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  injectTable,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScField,
  ScFrame,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
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
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronsUpDownIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
  filterFns: { includesString: filterFn_includesString },
});

const columnHelper = createColumnHelper<typeof features, Payment>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('status', { header: 'Status', enableSorting: false }),
  columnHelper.accessor('email', {
    header: 'Email',
    filterFn: 'includesString',
  }),
  columnHelper.accessor('amount', { header: 'Amount', enableSorting: false }),
  columnHelper.display({
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
  }),
]);

/** shadcn's data table: filter the emails, hide columns, sort, select rows, a menu per row, a page at a time. */
@Component({
  selector: 'app-payments-data-table-demo',
  imports: [
    ScButton,
    ScCheckbox,
    ScField,
    ScFrame,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
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
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronsUpDownIcon,
    SiEllipsisIcon,
  ],
  template: `
    <div scDataTableProvider [table]="table" class="w-full">
      <div class="flex items-center py-4">
        @if (email(); as email) {
          <input
            scDataTableColumnFilter
            [column]="email"
            placeholder="Filter emails..."
            aria-label="Filter emails"
            class="max-w-sm"
          />
        }
        <div scMenuProvider alignment="end" class="ms-auto">
          <button scButton variant="outline" scMenuTrigger>
            Columns
            <svg siChevronDownIcon></svg>
          </button>
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                @for (column of hideableColumns(); track column.id) {
                  <div
                    scMenuCheckboxItem
                    class="capitalize"
                    [checked]="column.getIsVisible()"
                    (checkedChange)="column.toggleVisibility($event)"
                  >
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    {{ column.id }}
                  </div>
                }
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>

      <div scDataTableContainer scFrame>
        <table scDataTable>
          <thead scDataTableHeader>
            @for (group of table.getHeaderGroups(); track group.id) {
              <tr scDataTableRow>
                @for (header of group.headers; track header.id) {
                  <th scDataTableHeaderCell [column]="header.column">
                    @switch (header.column.id) {
                      @case ('select') {
                        <label scField orientation="horizontal">
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectAll
                            aria-label="Select all"
                          />
                        </label>
                      }
                      @case ('email') {
                        <button
                          scDataTableSortButton
                          #sort="scDataTableSortButton"
                          [column]="header.column"
                        >
                          Email
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
                      }
                      @case ('amount') {
                        <div class="text-end">Amount</div>
                      }
                      @case ('actions') {
                        <span class="sr-only">Actions</span>
                      }
                      @default {
                        {{ header.column.columnDef.header }}
                      }
                    }
                  </th>
                }
              </tr>
            }
          </thead>
          <tbody scDataTableBody>
            @for (row of table.getRowModel().rows; track row.id) {
              <tr scDataTableRow [row]="row">
                @for (cell of row.getVisibleCells(); track cell.id) {
                  <td scDataTableCell [column]="cell.column">
                    @switch (cell.column.id) {
                      @case ('select') {
                        <label scField orientation="horizontal">
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectRow
                            [row]="row"
                            aria-label="Select row"
                          />
                        </label>
                      }
                      @case ('status') {
                        <div class="capitalize">{{ row.original.status }}</div>
                      }
                      @case ('email') {
                        <div class="lowercase">{{ row.original.email }}</div>
                      }
                      @case ('amount') {
                        <div class="text-end font-medium">
                          {{ amount.format(row.original.amount) }}
                        </div>
                      }
                      @case ('actions') {
                        <div scMenuProvider alignment="end">
                          <button
                            scButton
                            scMenuTrigger
                            variant="ghost"
                            size="icon-sm"
                          >
                            <svg siEllipsisIcon></svg>
                            <span class="sr-only">Open menu</span>
                          </button>
                          <ng-template scMenuPortal>
                            <div
                              scMenu
                              (itemSelected)="onAction($event, row.original)"
                            >
                              <ng-template scMenuContent>
                                <div scMenuLabel>Actions</div>
                                <div scMenuItem value="copy">
                                  Copy payment ID
                                </div>
                                <div scMenuSeparator></div>
                                <div scMenuItem value="customer">
                                  View customer
                                </div>
                                <div scMenuItem value="details">
                                  View payment details
                                </div>
                              </ng-template>
                            </div>
                          </ng-template>
                        </div>
                      }
                    }
                  </td>
                }
              </tr>
            } @empty {
              <tr scDataTableRow>
                <td
                  scDataTableCell
                  [attr.colspan]="table.getVisibleLeafColumns().length"
                  class="h-24 text-center"
                >
                  No results.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-end gap-2 py-4">
        <div class="text-muted-foreground flex-1 text-sm">
          {{ selected() }} of {{ table.getFilteredRowModel().rows.length }}
          row(s) selected.
        </div>
        <nav
          scDataTablePagination
          aria-label="Payments pages"
          class="mx-0 w-auto"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="sm">
                Previous
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="sm">Next</button>
            </li>
          </ul>
        </nav>
      </div>
      <p aria-live="polite" class="sr-only">{{ lastAction() }}</p>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PaymentsDataTableDemo {
  private readonly amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  private readonly lastAction = signal('');

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: PAYMENTS,
    getRowId: (payment) => payment.id,
  }));

  private readonly email = computed(() => this.table.getColumn('email'));

  /** The columns the menu lists: all but the selection and the actions. */
  private readonly hideableColumns = computed(() =>
    this.table.getAllLeafColumns().filter((column) => column.getCanHide()),
  );

  private readonly selected = computed(
    () => this.table.getFilteredSelectedRowModel().rows.length,
  );

  private onAction(action: unknown, payment: Payment): void {
    if (action === 'copy') {
      void navigator.clipboard?.writeText(payment.id);
      this.lastAction.set(`Copied ${payment.id}`);
    } else if (action === 'customer') {
      this.lastAction.set(`Viewing the customer ${payment.email}`);
    } else {
      this.lastAction.set(`Viewing payment ${payment.id}`);
    }
  }
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
    email: 'Abe45@example.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@example.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@example.com',
  },
];
