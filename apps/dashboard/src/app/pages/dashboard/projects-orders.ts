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
  SiBriefcaseBusinessIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { ORDERS, type Order, type OrderStatus } from '../../data/dashboard';
import { day, initials, money } from '../../shared/format';

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, Order>();

const columns = columnHelper.columns([
  columnHelper.accessor('project', { header: 'Project' }),
  columnHelper.accessor('name', { header: 'Item' }),
  columnHelper.accessor('status', { header: 'Status' }),
  columnHelper.accessor('price', { header: 'Price' }),
  columnHelper.accessor('deadline', { header: 'Deadline' }),
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
    SiBriefcaseBusinessIcon,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle id="orders-title" class="flex items-center gap-2">
          <svg siBriefcaseBusinessIcon></svg>
          Projects &amp; Orders
        </h2>
      </div>
      <div scCardBody>
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
                  <td scTableCell scDataTableCell>
                    <div class="flex flex-col">
                      <span class="font-medium">{{
                        row.original.project
                      }}</span>
                      <span class="text-muted-foreground text-xs">{{
                        row.original.id
                      }}</span>
                    </div>
                  </td>
                  <td scTableCell scDataTableCell>
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
                          row.original.role
                        }}</span>
                      </div>
                    </div>
                  </td>
                  <td scTableCell scDataTableCell>
                    <span scBadge [variant]="badge(row.original.status)">
                      {{ row.original.status }}
                    </span>
                  </td>
                  <td scTableCell scDataTableCell class="tabular-nums">
                    {{ priceOf(row.original.price) }}
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ dayOf(row.original.deadline) }}
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
  readonly table = injectTable(() => ({
    features,
    columns,
    data: [...ORDERS],
    getRowId: (order) => order.id,
  }));

  protected readonly initialsOf = initials;
  protected readonly priceOf = money;
  protected readonly dayOf = day;

  protected badge(status: OrderStatus): ScBadgeVariants['variant'] {
    if (status === 'Delivered') return 'default';
    if (status === 'Processing') return 'secondary';
    return 'destructive';
  }
}
