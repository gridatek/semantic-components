import {
  columnVisibilityFeature,
  createColumnHelper,
  injectTable,
  tableFeatures,
} from '@tanstack/angular-table';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
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
} from '@semantic-components/ui/data-table';
import { SiInboxIcon } from '@semantic-icons/lucide-icons';
import { STAFF, type StaffMember } from '../../data/staff';
import { PageHeader } from '../../layout/page-header';
import { StaffCell } from './table-parts';

const features = tableFeatures({ columnVisibilityFeature });
const columnHelper = createColumnHelper<typeof features, StaffMember>();

const COLUMNS = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('department', { header: 'Department' }),
  columnHelper.accessor('location', { header: 'Location' }),
  columnHelper.accessor('salary', { header: 'Salary' }),
  columnHelper.accessor('status', { header: 'Status' }),
]);

const IMPORTS = [
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
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
  SiInboxIcon,
  PageHeader,
  StaffCell,
];

/** Basic (Pro TanStack tables): the rows as they come. */
@Component({
  selector: 'app-basic-table-page',
  imports: IMPORTS,
  template: `
    <app-page-header
      title="Basic Table"
      [trail]="[{ label: 'Data Tables' }, { label: 'Basic' }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Team</h2>
        <p scCardDescription>A table from TanStack’s core: no features</p>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scTableHeaderCell scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scTableCell scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3 scEmptyTitle>No people yet</h3>
                        <div scEmptyDescription>
                          Invite someone and they’ll show up here.
                        </div>
                      </div>
                    </div>
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
export class BasicTablePage {
  readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF.slice(0, 8) as StaffMember[],
  }));
}

/** Dense (Pro TanStack tables): more rows in less height. */
@Component({
  selector: 'app-dense-table-page',
  imports: IMPORTS,
  template: `
    <app-page-header
      title="Dense Table"
      [trail]="[{ label: 'Data Tables' }, { label: 'Dense' }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Team</h2>
        <p scCardDescription>Tighter rows, smaller text</p>
      </div>
      <div scCardBody>
        <div scTableContainer class="text-xs [&_td]:py-1 [&_th]:h-8">
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scTableHeaderCell scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scTableCell scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3 scEmptyTitle>No people yet</h3>
                        <div scEmptyDescription>
                          Invite someone and they’ll show up here.
                        </div>
                      </div>
                    </div>
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
export class DenseTablePage {
  readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF as StaffMember[],
  }));
}

/** Sticky (Pro TanStack tables): the header stays while the rows scroll. */
@Component({
  selector: 'app-sticky-table-page',
  imports: IMPORTS,
  template: `
    <app-page-header
      title="Sticky Table"
      [trail]="[{ label: 'Data Tables' }, { label: 'Sticky' }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Team</h2>
        <p scCardDescription>Scroll the rows: the header stays on top</p>
      </div>
      <div scCardBody>
        <div
          scTableContainer
          tabindex="0"
          aria-label="Team, scrollable"
          class="[&_thead]:bg-card max-h-[28rem] overflow-y-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10"
        >
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scTableHeaderCell scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scTableCell scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3 scEmptyTitle>No people yet</h3>
                        <div scEmptyDescription>
                          Invite someone and they’ll show up here.
                        </div>
                      </div>
                    </div>
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
export class StickyTablePage {
  readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: STAFF as StaffMember[],
  }));
}

/** Empty (Pro TanStack tables): what a table says with no rows. */
@Component({
  selector: 'app-empty-table-page',
  imports: IMPORTS,
  template: `
    <app-page-header
      title="Empty Table"
      [trail]="[{ label: 'Data Tables' }, { label: 'Empty' }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Team</h2>
        <p scCardDescription>No rows: the table says so</p>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scTableHeaderCell scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scTableCell scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3 scEmptyTitle>No people yet</h3>
                        <div scEmptyDescription>
                          Invite someone and they’ll show up here.
                        </div>
                      </div>
                    </div>
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
export class EmptyTablePage {
  readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: [] as StaffMember[],
  }));
}
