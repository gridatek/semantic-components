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
  columnHelper.accessor('name', { header: $localize`Name` }),
  columnHelper.accessor('role', { header: $localize`Role` }),
  columnHelper.accessor('department', { header: $localize`Department` }),
  columnHelper.accessor('location', { header: $localize`Location` }),
  columnHelper.accessor('salary', { header: $localize`Salary` }),
  columnHelper.accessor('status', { header: $localize`Status` }),
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
      i18n-title
      title="Basic Table"
      [trail]="[{ label: t.dataTables }, { label: t.basic }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>A table from TanStack’s core: no features</p>
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
                        <h3 i18n scEmptyTitle>No people yet</h3>
                        <div i18n scEmptyDescription>
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
    dataTables: $localize`Data Tables`,
    basic: $localize`Basic`,
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
      i18n-title
      title="Dense Table"
      [trail]="[{ label: t.dataTables }, { label: t.dense }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>Tighter rows, smaller text</p>
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
                        <h3 i18n scEmptyTitle>No people yet</h3>
                        <div i18n scEmptyDescription>
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
    dataTables: $localize`Data Tables`,
    dense: $localize`Dense`,
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
      i18n-title
      title="Sticky Table"
      [trail]="[{ label: t.dataTables }, { label: t.sticky }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>Scroll the rows: the header stays on top</p>
      </div>
      <div scCardBody>
        <div
          i18n-aria-label
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
                        <h3 i18n scEmptyTitle>No people yet</h3>
                        <div i18n scEmptyDescription>
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
    dataTables: $localize`Data Tables`,
    sticky: $localize`Sticky`,
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
      i18n-title
      title="Empty Table"
      [trail]="[{ label: t.dataTables }, { label: t.empty }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n scCardTitle>Team</h2>
        <p i18n scCardDescription>No rows: the table says so</p>
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
                        <h3 i18n scEmptyTitle>No people yet</h3>
                        <div i18n scEmptyDescription>
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
    dataTables: $localize`Data Tables`,
    empty: $localize`Empty`,
  };

  private readonly table = injectTable(() => ({
    features,
    columns: COLUMNS,
    data: [] as StaffMember[],
  }));
}
