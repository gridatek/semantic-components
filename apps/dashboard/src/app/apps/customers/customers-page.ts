import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  injectTable,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
} from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableGlobalFilter,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
  ScDataTableRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import {
  AppStatCard,
  AppStatCardLabel,
  AppStatCardValue,
} from '../../components/stat-card';
import { CUSTOMERS, type Customer } from '../../data/orders';
import { personById } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { day, initials, money } from '../../shared/format';
import { label } from '../../shared/labels';

interface CustomerRow {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
  readonly location: string;
  readonly orders: number;
  readonly spent: number;
  readonly since: string;
  readonly status: Customer['status'];
}

const ROWS: CustomerRow[] = CUSTOMERS.map((c) => {
  const p = personById(c.personId);
  return {
    id: p.id,
    name: p.name,
    email: p.email,
    avatar: p.avatar,
    location: `${p.city}, ${p.country}`,
    orders: c.orders,
    spent: c.spent,
    since: c.since,
    status: c.status,
  };
});

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, CustomerRow>();

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: $localize`:@@customers.customer:Customer`,
  }),
  columnHelper.accessor('location', {
    header: $localize`:@@customers.location:Location`,
  }),
  columnHelper.accessor('orders', {
    header: $localize`:@@customers.orders:Orders`,
  }),
  columnHelper.accessor('spent', {
    header: $localize`:@@customers.spent:Spent`,
  }),
  columnHelper.accessor('since', {
    header: $localize`:@@customers.customerSince:Customer since`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@customers.status:Status`,
  }),
]);

/** Customers (Pro): who buys, how often, how much. */
@Component({
  selector: 'app-customers-page',
  imports: [
    ScDataTableProvider,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    AppStatCard,
    AppStatCardLabel,
    AppStatCardValue,
    ScDataTableCell,
    ScDataTableGlobalFilter,
    ScDataTableHeaderCell,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronsUpDownIcon,
    PageHeader,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
  ],
  template: `
    <app-page-header
      i18n-title="@@customers.customers"
      title="Customers"
      [trail]="[{ label: t.apps }, { label: t.customers }]"
    />

    <div class="grid gap-4 sm:grid-cols-3">
      <dl appStatCard>
        <dt i18n="@@customers.customers" appStatCardLabel>Customers</dt>
        <dd appStatCardValue [value]="rows.length"></dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>VIP</dt>
        <dd appStatCardValue [value]="vip"></dd>
      </dl>
      <dl appStatCard>
        <dt i18n="@@customers.lifetimeSpend" appStatCardLabel>
          Lifetime spend
        </dt>
        <dd
          appStatCardValue
          [value]="spent"
          [format]="{ style: 'currency', currency: 'USD' }"
        ></dd>
      </dl>
    </div>

    <div scCard>
      <div
        scCardBody
        scDataTableProvider
        [table]="table"
        class="flex flex-col gap-4"
      >
        <input
          i18n-aria-label="@@customers.searchCustomers"
          i18n-placeholder="@@customers.searchCustomers2"
          scDataTableGlobalFilter
          type="search"
          placeholder="Search customers…"
          aria-label="Search customers"
          class="max-w-xs"
        />
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
                  <td scDataTableCell>
                    <div class="flex items-center gap-3">
                      <span scAvatar class="size-8">
                        <img scAvatarImage [src]="row.original.avatar" alt="" />
                        <span scAvatarFallback>{{
                          initialsOf(row.original.name)
                        }}</span>
                      </span>
                      <span class="flex flex-col">
                        <span class="font-medium">{{ row.original.name }}</span>
                        <span class="text-muted-foreground text-xs">{{
                          row.original.email
                        }}</span>
                      </span>
                    </div>
                  </td>
                  <td scDataTableCell>
                    {{ row.original.location }}
                  </td>
                  <td scDataTableCell class="tabular-nums">
                    {{ row.original.orders }}
                  </td>
                  <td scDataTableCell class="tabular-nums">
                    {{ moneyOf(row.original.spent) }}
                  </td>
                  <td scDataTableCell>
                    {{ dayOf(row.original.since) }}
                  </td>
                  <td scDataTableCell>
                    <span
                      scBadge
                      [variant]="
                        row.original.status === 'VIP'
                          ? 'default'
                          : row.original.status === 'Active'
                            ? 'secondary'
                            : 'outline'
                      "
                      >{{ labelOf(row.original.status) }}</span
                    >
                  </td>
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    i18n="@@customers.noCustomersMatch"
                    scDataTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No customers match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomersPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@customers.apps:Apps`,
    customers: $localize`:@@customers.customers:Customers`,
  };

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: ROWS,
    getRowId: (row) => String(row.id),
  }));

  private readonly rows = ROWS;
  private readonly vip = ROWS.filter((r) => r.status === 'VIP').length;
  private readonly spent = ROWS.reduce((sum, r) => sum + r.spent, 0);
  private readonly dayOf = day;
  private readonly moneyOf = money;
  private readonly initialsOf = initials;
}
