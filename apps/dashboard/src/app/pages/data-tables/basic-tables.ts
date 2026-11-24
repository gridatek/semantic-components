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
} from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableHeader,
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
  columnHelper.accessor('name', {
    header: $localize`:@@dataTables.basicTables.name:Name`,
  }),
  columnHelper.accessor('role', {
    header: $localize`:@@dataTables.basicTables.role:Role`,
  }),
  columnHelper.accessor('department', {
    header: $localize`:@@dataTables.basicTables.department:Department`,
  }),
  columnHelper.accessor('location', {
    header: $localize`:@@dataTables.basicTables.location:Location`,
  }),
  columnHelper.accessor('salary', {
    header: $localize`:@@dataTables.basicTables.salary:Salary`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@dataTables.basicTables.status:Status`,
  }),
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
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableContainer,
  ScDataTableHeader,
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
      i18n-title="@@dataTables.basicTables.basicTable"
      title="Basic Table"
      [trail]="[{ label: t.dataTables }, { label: t.basic }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.basicTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.basicTables.aTableFromTanstackS"
          scCardDescription
        >
          A table from TanStack’s core: no features
        </p>
      </div>
      <div scCardBody>
        <div scDataTableContainer>
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    scDataTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3
                          i18n="@@dataTables.basicTables.noPeopleYet"
                          scEmptyTitle
                        >
                          No people yet
                        </h3>
                        <div
                          i18n="@@dataTables.basicTables.inviteSomeoneAndTheyLl"
                          scEmptyDescription
                        >
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
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.basicTables.dataTables:Data Tables`,
    basic: $localize`:@@dataTables.basicTables.basic:Basic`,
  };

  private readonly table = injectTable(() => ({
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
      i18n-title="@@dataTables.basicTables.denseTable"
      title="Dense Table"
      [trail]="[{ label: t.dataTables }, { label: t.dense }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.basicTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.basicTables.tighterRowsSmallerText"
          scCardDescription
        >
          Tighter rows, smaller text
        </p>
      </div>
      <div scCardBody>
        <div scDataTableContainer class="text-xs [&_td]:py-1 [&_th]:h-8">
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    scDataTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3
                          i18n="@@dataTables.basicTables.noPeopleYet"
                          scEmptyTitle
                        >
                          No people yet
                        </h3>
                        <div
                          i18n="@@dataTables.basicTables.inviteSomeoneAndTheyLl"
                          scEmptyDescription
                        >
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
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.basicTables.dataTables:Data Tables`,
    dense: $localize`:@@dataTables.basicTables.dense:Dense`,
  };

  private readonly table = injectTable(() => ({
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
      i18n-title="@@dataTables.basicTables.stickyTable"
      title="Sticky Table"
      [trail]="[{ label: t.dataTables }, { label: t.sticky }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.basicTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.basicTables.scrollTheRowsTheHeader"
          scCardDescription
        >
          Scroll the rows: the header stays on top
        </p>
      </div>
      <div scCardBody>
        <div
          i18n-aria-label="@@dataTables.basicTables.teamScrollable"
          scDataTableContainer
          tabindex="0"
          aria-label="Team, scrollable"
          class="[&_thead]:bg-card max-h-[28rem] overflow-y-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10"
        >
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    scDataTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3
                          i18n="@@dataTables.basicTables.noPeopleYet"
                          scEmptyTitle
                        >
                          No people yet
                        </h3>
                        <div
                          i18n="@@dataTables.basicTables.inviteSomeoneAndTheyLl"
                          scEmptyDescription
                        >
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
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.basicTables.dataTables:Data Tables`,
    sticky: $localize`:@@dataTables.basicTables.sticky:Sticky`,
  };

  private readonly table = injectTable(() => ({
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
      i18n-title="@@dataTables.basicTables.emptyTable"
      title="Empty Table"
      [trail]="[{ label: t.dataTables }, { label: t.empty }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.basicTables.team" scCardTitle>Team</h2>
        <p i18n="@@dataTables.basicTables.noRowsTheTableSays" scCardDescription>
          No rows: the table says so
        </p>
      </div>
      <div scCardBody>
        <div scDataTableContainer>
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell>
                      {{ header.column.columnDef.header }}
                    </th>
                  }
                </tr>
              }
            </thead>
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scDataTableCell>
                      <app-staff-cell
                        [column]="cell.column.id"
                        [member]="row.original"
                      />
                    </td>
                  }
                </tr>
              } @empty {
                <tr scDataTableRow>
                  <td
                    scDataTableCell
                    [attr.colspan]="table.getAllLeafColumns().length"
                  >
                    <div scEmpty>
                      <div scEmptyHeader>
                        <div scEmptyMedia variant="icon">
                          <svg siInboxIcon></svg>
                        </div>
                        <h3
                          i18n="@@dataTables.basicTables.noPeopleYet"
                          scEmptyTitle
                        >
                          No people yet
                        </h3>
                        <div
                          i18n="@@dataTables.basicTables.inviteSomeoneAndTheyLl"
                          scEmptyDescription
                        >
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
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.basicTables.dataTables:Data Tables`,
    empty: $localize`:@@dataTables.basicTables.empty:Empty`,
  };

  private readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: [] as StaffMember[],
  }));
}
