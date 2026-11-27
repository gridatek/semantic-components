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
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  type ScBadgeVariants,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
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
  SiBriefcaseBusinessIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { ORDERS, type Order, type OrderStatus } from '../../data/dashboard';
import { initials, injectFormats } from '../../shared/formats';
import { label } from '../../shared/labels';

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, Order>();

const columns = columnHelper.columns([
  columnHelper.accessor('project', {
    header: $localize`:@@dashboard.projectsOrders.project:Project`,
  }),
  columnHelper.accessor('name', {
    header: $localize`:@@dashboard.projectsOrders.item:Item`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@dashboard.projectsOrders.status:Status`,
  }),
  columnHelper.accessor('price', {
    header: $localize`:@@dashboard.projectsOrders.price:Price`,
  }),
  columnHelper.accessor('deadline', {
    header: $localize`:@@dashboard.projectsOrders.deadline:Deadline`,
  }),
]);

/** Projects & Orders: every column sorts. */
@Component({
  selector: 'app-projects-orders',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScDataTableCell,
    ScDataTableHeaderCell,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiBriefcaseBusinessIcon,
    SiChevronsUpDownIcon,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle id="orders-title" class="flex items-center gap-2">
          <svg siBriefcaseBusinessIcon></svg>
          <ng-container i18n="@@dashboard.projectsOrders.projectsOrders"
            >Projects &amp; Orders</ng-container
          >
        </h2>
      </div>
      <div scCardBody>
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
                    <div class="flex flex-col">
                      <span class="font-medium">{{
                        row.original.project
                      }}</span>
                      <span class="text-muted-foreground text-xs">{{
                        row.original.id
                      }}</span>
                    </div>
                  </td>
                  <td scDataTableCell>
                    <div class="flex items-center gap-3">
                      <span scAvatar class="size-8">
                        <img scAvatarImage [src]="row.original.avatar" alt="" />
                        <span scAvatarFallback>{{
                          initialsOf(row.original.name)
                        }}</span>
                      </span>
                      <div class="flex flex-col">
                        <span class="font-medium">{{ row.original.name }}</span>
                        <span class="text-muted-foreground text-xs">{{
                          labelOf(row.original.role)
                        }}</span>
                      </div>
                    </div>
                  </td>
                  <td scDataTableCell>
                    <span scBadge [variant]="badge(row.original.status)">
                      {{ labelOf(row.original.status) }}
                    </span>
                  </td>
                  <td scDataTableCell class="tabular-nums">
                    {{ f.money(row.original.price) }}
                  </td>
                  <td scDataTableCell>
                    {{ f.day(row.original.deadline) }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsOrders {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  private readonly labelOf = label;
  private readonly table = injectTable(() => ({
    features,
    columns,
    data: [...ORDERS],
    getRowId: (order) => order.id,
  }));

  private readonly initialsOf = initials;

  private badge(status: OrderStatus): ScBadgeVariants['variant'] {
    if (status === 'Delivered') return 'default';
    if (status === 'Processing') return 'secondary';
    return 'destructive';
  }
}
