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
  ScPaginationItem,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableGlobalFilter,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableProvider,
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
import { count, day, initials, money } from '../../shared/format';
import { label } from '../../shared/labels';
import { orderBadge } from '../../shared/status';

interface OrderRow {
  readonly id: string;
  readonly customer: string;
  readonly avatar: string;
  readonly product: string;
  readonly quantity: number;
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
    product: PRODUCTS.find((p) => p.id === o.productId)?.name ?? '',
    quantity: o.quantity,
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
  columnHelper.accessor('id', { header: $localize`:@@orders.order:Order` }),
  columnHelper.accessor('customer', {
    header: $localize`:@@orders.customer:Customer`,
  }),
  columnHelper.accessor('product', {
    header: $localize`:@@orders.product:Product`,
  }),
  columnHelper.accessor('date', { header: $localize`:@@orders.date:Date` }),
  columnHelper.accessor('total', { header: $localize`:@@orders.total:Total` }),
  columnHelper.accessor('payment', {
    header: $localize`:@@orders.payment:Payment`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@orders.status:Status`,
    filterFn: 'equals',
  }),
]);

/** Orders (Pro): every order — search, status, sorting, pages. */
@Component({
  selector: 'app-orders-page',
  imports: [
    ScDataTableProvider,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScPaginationItem,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
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
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
  ],
  template: `
    <app-page-header
      i18n-title="@@orders.orders"
      title="Orders"
      [trail]="[{ label: t.apps }, { label: t.orders }]"
    />

    <div scCard>
      <div
        scCardBody
        scDataTableProvider
        [table]="table"
        class="flex flex-col gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <input
            i18n-aria-label="@@orders.searchOrders"
            i18n-placeholder="@@orders.searchOrders2"
            scDataTableGlobalFilter
            type="search"
            placeholder="Search orders…"
            aria-label="Search orders"
            class="max-w-xs"
          />
          <div
            i18n-aria-label="@@orders.status"
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Status"
            [value]="[status()]"
            (valueChange)="filterStatus($event[0] ?? 'All')"
          >
            <button i18n="@@orders.all" scToggleGroupItem value="All">
              All
            </button>
            @for (s of statuses; track s) {
              <button scToggleGroupItem [value]="s">{{ labelOf(s) }}</button>
            }
          </div>
        </div>
        <div scDataTableContainer>
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell [column]="header.column">
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
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  <td scDataTableCell class="font-medium">
                    {{ row.original.id }}
                  </td>
                  <td scDataTableCell>
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
                  <td scDataTableCell>
                    {{ row.original.product }} ×
                    {{ countOf(row.original.quantity) }}
                  </td>
                  <td scDataTableCell>
                    {{ dayOf(row.original.date) }}
                  </td>
                  <td scDataTableCell class="tabular-nums">
                    {{ moneyOf(row.original.total) }}
                  </td>
                  <td scDataTableCell>
                    {{ labelOf(row.original.payment) }}
                  </td>
                  <td scDataTableCell>
                    <span scBadge [variant]="badgeOf(row.original.status)">{{
                      labelOf(row.original.status)
                    }}</span>
                  </td>
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    i18n="@@orders.noOrdersMatch"
                    scDataTableCell
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
          i18n-aria-label="@@orders.orderPages"
          scDataTablePagination
          #pagination="scPagination"
          aria-label="Order pages"
          class="mx-0 w-auto flex-wrap items-center justify-end gap-4"
        >
          <span
            i18n="@@orders.pageOf"
            class="text-sm font-medium"
            aria-live="polite"
          >
            Page {{ countOf(pagination.currentPage()) }} of
            {{ countOf(pagination.totalPages()) }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@orders.goToPreviousPage" class="sr-only"
                  >Go to previous page</span
                >
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@orders.goToNextPage" class="sr-only"
                  >Go to next page</span
                >
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
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@orders.apps:Apps`,
    orders: $localize`:@@orders.orders:Orders`,
  };

  private readonly table = injectTable(() => ({
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
