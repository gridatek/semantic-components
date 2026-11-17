import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equals,
  globalFilteringFeature,
  injectTable,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
  ScInput,
  ScPagination,
  ScPaginationItem,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  ScDataTableCell,
  ScDataTableGlobalFilter,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { ORDERS, ORDER_STATUSES } from '../../data/orders';
import { personById } from '../../data/people';
import { PRODUCTS } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { day, initials, money } from '../../shared/format';
import { orderBadge } from '../../shared/status';

interface OrderRow {
  readonly id: string;
  readonly customer: string;
  readonly avatar: string;
  readonly product: string;
  readonly date: string;
  readonly total: number;
  readonly payment: string;
  readonly status: (typeof ORDER_STATUSES)[number];
}

const ROWS: OrderRow[] = ORDERS.map((o) => {
  const person = personById(o.customerId);
  return {
    id: o.id,
    customer: person.name,
    avatar: person.avatar,
    product: `${PRODUCTS.find((p) => p.id === o.productId)?.name ?? ''} × ${o.quantity}`,
    date: o.date,
    total: o.total,
    payment: o.payment,
    status: o.status,
  };
});

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
  filterFns: { equals: filterFn_equals },
});

const columnHelper = createColumnHelper<typeof features, OrderRow>();

const columns = columnHelper.columns([
  columnHelper.accessor('id', { header: 'Order' }),
  columnHelper.accessor('customer', { header: 'Customer' }),
  columnHelper.accessor('product', { header: 'Product' }),
  columnHelper.accessor('date', { header: 'Date' }),
  columnHelper.accessor('total', { header: 'Total' }),
  columnHelper.accessor('payment', { header: 'Payment' }),
  columnHelper.accessor('status', { header: 'Status', filterFn: 'equals' }),
]);

/** Orders (Pro): every order — search, status, sorting, pages. */
@Component({
  selector: 'app-orders-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScInput,
    ScPagination,
    ScPaginationItem,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScToggleGroup,
    ScToggleGroupItem,
    ScDataTableCell,
    ScDataTableGlobalFilter,
    ScDataTableHeaderCell,
    ScDataTablePagination,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsUpDownIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="Orders"
      [trail]="[{ label: 'Apps' }, { label: 'Orders' }]"
    />

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <input
            scInput
            scDataTableGlobalFilter
            [table]="table"
            type="search"
            placeholder="Search orders…"
            aria-label="Search orders"
            class="max-w-xs"
          />
          <div
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Status"
            [value]="[status()]"
            (valueChange)="filterStatus($event[0] ?? 'All')"
          >
            <button scToggleGroupItem value="All">All</button>
            @for (s of statuses; track s) {
              <button scToggleGroupItem [value]="s">{{ s }}</button>
            }
          </div>
        </div>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th
                      scTableHeaderCell
                      scDataTableHeaderCell
                      [column]="header.column"
                    >
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
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  <td scTableCell scDataTableCell class="font-medium">
                    {{ row.original.id }}
                  </td>
                  <td scTableCell scDataTableCell>
                    <div class="flex items-center gap-2">
                      <span scAvatar class="size-7">
                        <img scAvatarImage [src]="row.original.avatar" alt="" />
                        <span scAvatarFallback>{{
                          initialsOf(row.original.customer)
                        }}</span>
                      </span>
                      {{ row.original.customer }}
                    </div>
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ row.original.product }}
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ dayOf(row.original.date) }}
                  </td>
                  <td scTableCell scDataTableCell class="tabular-nums">
                    {{ moneyOf(row.original.total) }}
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ row.original.payment }}
                  </td>
                  <td scTableCell scDataTableCell>
                    <span scBadge [variant]="badgeOf(row.original.status)">{{
                      row.original.status
                    }}</span>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    colspan="7"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No orders match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <nav
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          aria-label="Order pages"
          class="mx-0 w-auto flex-wrap items-center justify-end gap-4"
        >
          <span class="text-sm font-medium" aria-live="polite">
            Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Go to previous page</span>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Go to next page</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class OrdersPage {
  readonly table = injectTable(() => ({
    features,
    columns,
    data: ROWS,
    getRowId: (row) => row.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
  }));

  private readonly statuses = ORDER_STATUSES;
  private readonly status = signal<string>('All');
  private readonly dayOf = day;
  private readonly moneyOf = money;
  private readonly initialsOf = initials;
  private readonly badgeOf = orderBadge;

  private filterStatus(status: string): void {
    this.status.set(status);
    this.table
      .getColumn('status')
      ?.setFilterValue(status === 'All' ? undefined : status);
  }
}
