import {
  columnVisibilityFeature,
  createColumnHelper,
  createExpandedRowModel,
  injectTable,
  rowExpandingFeature,
  rowSelectionFeature,
  tableFeatures,
} from '@tanstack/angular-table';
import {
  CdkDrag,
  type CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScInput,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import {
  ScDataTable,
  ScDataTableBody,
  ScDataTableCell,
  ScDataTableColumnVisibility,
  ScDataTableContainer,
  ScDataTableExpand,
  ScDataTableHeader,
  ScDataTableHeaderCell,
  ScDataTableProvider,
  ScDataTableRow,
  ScDataTableSelectAll,
  ScDataTableSelectRow,
  dataTableColumnLabel,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronRightIcon,
  SiColumns3Icon,
  SiGripVerticalIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { STAFF, type StaffMember } from '../../data/staff';
import { PageHeader } from '../../layout/page-header';
import { count, money, percent } from '../../shared/format';
import { label } from '../../shared/labels';
import { StaffCell } from './table-parts';

const BASE = [
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  PageHeader,
  StaffCell,
];

const CELLS = [ScDataTableCell, ScDataTableHeaderCell, ScDataTableRow];

const selectFeatures = tableFeatures({
  columnVisibilityFeature,
  rowSelectionFeature,
});
const selectHelper = createColumnHelper<typeof selectFeatures, StaffMember>();

/** Row Selection (Pro TanStack tables): rows chosen one by one or all at once. */
@Component({
  selector: 'app-row-selection-table-page',
  imports: [
    ScCheckbox,
    ScDataTableProvider,
    ...BASE,
    ...CELLS,
    ScButton,
    ScField,
    ScDataTableSelectAll,
    ScDataTableSelectRow,
    SiTrash2Icon,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableRow,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <app-page-header
      i18n-title="@@dataTables.interactiveTables.rowSelection"
      title="Row Selection"
      [trail]="[{ label: t.dataTables }, { label: t.rowSelection }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.interactiveTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.interactiveTables.tickRowsOrAllOf"
          scCardDescription
        >
          Tick rows, or all of them from the header
        </p>
      </div>
      <div
        scCardBody
        scDataTableProvider
        [table]="table"
        class="flex flex-col gap-4"
      >
        <div scDataTableContainer>
          <table scDataTable>
            <thead scDataTableHeader>
              @for (group of table.getHeaderGroups(); track group.id) {
                <tr scDataTableRow>
                  @for (header of group.headers; track header.id) {
                    <th scDataTableHeaderCell>
                      @if (header.column.id === 'select') {
                        <label scField orientation="horizontal">
                          <input
                            i18n-aria-label="
                              @@dataTables.interactiveTables.selectAllRows"
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectAll
                            aria-label="Select all rows"
                          />
                        </label>
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
                  @for (cell of row.getVisibleCells(); track cell.id) {
                    <td scDataTableCell>
                      @if (cell.column.id === 'select') {
                        <label scField orientation="horizontal">
                          <input
                            type="checkbox"
                            scCheckbox
                            scDataTableSelectRow
                            [row]="row"
                            [attr.aria-label]="t.select + row.original.name"
                          />
                        </label>
                      } @else {
                        <app-staff-cell
                          [column]="cell.column.id"
                          [member]="row.original"
                        />
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p
            i18n="@@dataTables.interactiveTables.ofSelected"
            class="text-muted-foreground text-sm"
            aria-live="polite"
          >
            {{ countOf(table.getSelectedRowModel().rows.length) }} of
            {{ countOf(table.getRowModel().rows.length) }} selected
          </p>
          <button
            scButton
            variant="outline"
            size="sm"
            [disabled]="!table.getSelectedRowModel().rows.length"
            (click)="removeSelected()"
          >
            <svg siTrash2Icon></svg>
            <ng-container i18n="@@dataTables.interactiveTables.removeSelected"
              >Remove selected</ng-container
            >
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RowSelectionTablePage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.interactiveTables.dataTables:Data Tables`,
    rowSelection: $localize`:@@dataTables.interactiveTables.rowSelection:Row Selection`,
    select: $localize`:@@dataTables.interactiveTables.select:Select `,
  };

  private readonly toaster = inject(ScToaster);
  private readonly data = signal(STAFF.slice(0, 10) as StaffMember[]);
  private readonly table = injectTable(() => ({
    features: selectFeatures,
    columns: selectHelper.columns([
      selectHelper.display({
        id: 'select',
        header: $localize`:@@dataTables.interactiveTables.select:Select`,
        enableHiding: false,
      }),
      selectHelper.accessor('name', {
        header: $localize`:@@dataTables.interactiveTables.name:Name`,
      }),
      selectHelper.accessor('role', {
        header: $localize`:@@dataTables.interactiveTables.role:Role`,
      }),
      selectHelper.accessor('department', {
        header: $localize`:@@dataTables.interactiveTables.department:Department`,
      }),
      selectHelper.accessor('status', {
        header: $localize`:@@dataTables.interactiveTables.status:Status`,
      }),
    ]),
    data: this.data(),
    getRowId: (row) => String(row.id),
  }));

  private removeSelected(): void {
    const ids = new Set(
      this.table.getSelectedRowModel().rows.map((r) => r.original.id),
    );
    this.data.update((rows) => rows.filter((r) => !ids.has(r.id)));
    this.table.resetRowSelection();
    this.toaster.show({ title: `${ids.size} removed` });
  }
}

const visibilityFeatures = tableFeatures({ columnVisibilityFeature });
const visibilityHelper = createColumnHelper<
  typeof visibilityFeatures,
  StaffMember
>();

/** Column Visibility (Pro TanStack tables): columns shown and hidden from a menu. */
@Component({
  selector: 'app-column-visibility-table-page',
  imports: [
    ScCheckbox,
    ...BASE,
    ...CELLS,
    ScButton,
    ScField,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScDataTableColumnVisibility,
    SiColumns3Icon,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableRow,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <app-page-header
      i18n-title="@@dataTables.interactiveTables.columnVisibility"
      title="Column Visibility"
      [trail]="[{ label: t.dataTables }, { label: t.columnVisibility }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.interactiveTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.interactiveTables.chooseTheColumnsYouNeed"
          scCardDescription
        >
          Choose the columns you need
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scPopoverProvider alignment="start">
          <button scButton variant="outline" scPopoverTrigger>
            <svg siColumns3Icon></svg>
            <ng-container i18n="@@dataTables.interactiveTables.columns"
              >Columns</ng-container
            >
          </button>
          <ng-template scPopoverPortal>
            <div
              i18n-aria-label="@@dataTables.interactiveTables.showColumns"
              scPopover
              aria-label="Show columns"
              class="w-48 gap-1 p-2"
            >
              @for (column of table.getAllLeafColumns(); track column.id) {
                @if (column.getCanHide()) {
                  <label scField orientation="horizontal">
                    <input
                      type="checkbox"
                      scCheckbox
                      scDataTableColumnVisibility
                      [column]="column"
                    />
                    {{ columnLabelOf(column) }}
                  </label>
                }
              }
            </div>
          </ng-template>
        </div>
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
export class ColumnVisibilityTablePage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.interactiveTables.dataTables:Data Tables`,
    columnVisibility: $localize`:@@dataTables.interactiveTables.columnVisibility:Column Visibility`,
  };

  private readonly table = injectTable(() => ({
    features: visibilityFeatures,
    columns: visibilityHelper.columns([
      visibilityHelper.accessor('name', {
        header: $localize`:@@dataTables.interactiveTables.name:Name`,
        enableHiding: false,
      }),
      visibilityHelper.accessor('role', {
        header: $localize`:@@dataTables.interactiveTables.role:Role`,
      }),
      visibilityHelper.accessor('department', {
        header: $localize`:@@dataTables.interactiveTables.department:Department`,
      }),
      visibilityHelper.accessor('location', {
        header: $localize`:@@dataTables.interactiveTables.location:Location`,
      }),
      visibilityHelper.accessor('salary', {
        header: $localize`:@@dataTables.interactiveTables.salary:Salary`,
      }),
      visibilityHelper.accessor('joined', {
        header: $localize`:@@dataTables.interactiveTables.joined:Joined`,
      }),
      visibilityHelper.accessor('status', {
        header: $localize`:@@dataTables.interactiveTables.status:Status`,
      }),
    ]),
    data: STAFF.slice(0, 8) as StaffMember[],
    initialState: { columnVisibility: { joined: false, location: false } },
  }));
  private readonly columnLabelOf = dataTableColumnLabel;
}

/** Editable (Pro TanStack tables): cells you type into; the data follows. */
@Component({
  selector: 'app-editable-table-page',
  imports: [
    ...BASE,
    ScInput,
    ScTable,
    ScTableContainer,
    ScTableHeader,
    ScTableBody,
    ScTableRow,
    ScTableHeaderCell,
    ScTableCell,
  ],
  template: `
    <app-page-header
      i18n-title="@@dataTables.interactiveTables.editable"
      title="Editable"
      [trail]="[{ label: t.dataTables }, { label: t.editable }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.interactiveTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.interactiveTables.changeARoleAPlace"
          scCardDescription
        >
          Change a role, a place or a salary: the total follows
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th
                  i18n="@@dataTables.interactiveTables.name"
                  scTableHeaderCell
                >
                  Name
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.role"
                  scTableHeaderCell
                >
                  Role
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.location"
                  scTableHeaderCell
                >
                  Location
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.salary"
                  scTableHeaderCell
                >
                  Salary
                </th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (member of data(); track member.id) {
                <tr scTableRow>
                  <td scTableCell>
                    <app-staff-cell column="name" [member]="member" />
                  </td>
                  <td scTableCell>
                    <input
                      scInput
                      class="h-8"
                      [attr.aria-label]="t.roleOf + member.name"
                      [value]="member.role"
                      (change)="
                        edit(member.id, 'role', $any($event.target).value)
                      "
                    />
                  </td>
                  <td scTableCell>
                    <input
                      scInput
                      class="h-8"
                      [attr.aria-label]="t.locationOf + member.name"
                      [value]="member.location"
                      (change)="
                        edit(member.id, 'location', $any($event.target).value)
                      "
                    />
                  </td>
                  <td scTableCell>
                    <input
                      scInput
                      type="number"
                      class="h-8 w-32"
                      [attr.aria-label]="t.salaryOf + member.name"
                      [value]="member.salary"
                      (change)="
                        edit(member.id, 'salary', +$any($event.target).value)
                      "
                    />
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p
          i18n="@@dataTables.interactiveTables.totalPayroll"
          class="text-end text-sm"
        >
          Total payroll:
          <span class="font-semibold tabular-nums">{{ moneyOf(total()) }}</span>
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class EditableTablePage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.interactiveTables.dataTables:Data Tables`,
    editable: $localize`:@@dataTables.interactiveTables.editable:Editable`,
    roleOf: $localize`:@@dataTables.interactiveTables.roleOf:Role of `,
    locationOf: $localize`:@@dataTables.interactiveTables.locationOf:Location of `,
    salaryOf: $localize`:@@dataTables.interactiveTables.salaryOf:Salary of `,
  };

  private readonly data = signal(STAFF.slice(0, 8).map((m) => ({ ...m })));
  private readonly moneyOf = money;

  private total(): number {
    return this.data().reduce((sum, m) => sum + m.salary, 0);
  }

  private edit(
    id: number,
    key: 'role' | 'location' | 'salary',
    value: string | number,
  ): void {
    this.data.update((rows) =>
      rows.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    );
  }
}

/** Drag & Drop (Pro TanStack tables): rows put in order by dragging, or by buttons. */
@Component({
  selector: 'app-drag-drop-table-page',
  imports: [
    ...BASE,
    ScButton,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiGripVerticalIcon,
    ScTable,
    ScTableContainer,
    ScTableHeader,
    ScTableBody,
    ScTableRow,
    ScTableHeaderCell,
    ScTableCell,
  ],
  template: `
    <app-page-header
      i18n-title="@@dataTables.interactiveTables.dragDrop"
      title="Drag & Drop"
      [trail]="[{ label: t.dataTables }, { label: t.dragDrop }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.interactiveTables.priorities" scCardTitle>
          Priorities
        </h2>
        <p
          i18n="@@dataTables.interactiveTables.dragARowByIts"
          scCardDescription
        >
          Drag a row by its handle, or move it with the arrows
        </p>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th
                  i18n="@@dataTables.interactiveTables.drag"
                  scTableHeaderCell
                  class="w-10"
                >
                  <span class="sr-only">Drag</span>
                </th>
                <th scTableHeaderCell class="w-10">#</th>
                <th
                  i18n="@@dataTables.interactiveTables.name"
                  scTableHeaderCell
                >
                  Name
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.role"
                  scTableHeaderCell
                >
                  Role
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.status"
                  scTableHeaderCell
                >
                  Status
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.move"
                  scTableHeaderCell
                >
                  <span class="sr-only">Move</span>
                </th>
              </tr>
            </thead>
            <tbody scTableBody cdkDropList (cdkDropListDropped)="drop($event)">
              @for (
                member of data();
                track member.id;
                let i = $index, first = $first, last = $last
              ) {
                <tr scTableRow cdkDrag cdkDragLockAxis="y" class="bg-card">
                  <td scTableCell>
                    <span
                      cdkDragHandle
                      class="text-muted-foreground flex cursor-grab"
                      aria-hidden="true"
                    >
                      <svg siGripVerticalIcon class="size-4"></svg>
                    </span>
                  </td>
                  <td scTableCell class="tabular-nums">{{ countOf(i + 1) }}</td>
                  <td scTableCell>
                    <app-staff-cell column="name" [member]="member" />
                  </td>
                  <td scTableCell>{{ labelOf(member.role) }}</td>
                  <td scTableCell>
                    <app-staff-cell column="status" [member]="member" />
                  </td>
                  <td scTableCell>
                    <div class="flex justify-end gap-1">
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        [disabled]="first"
                        (click)="move(i, i - 1)"
                      >
                        <svg siArrowUpIcon></svg>
                        <span
                          i18n="@@dataTables.interactiveTables.moveUp"
                          class="sr-only"
                          >Move {{ member.name }} up</span
                        >
                      </button>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        [disabled]="last"
                        (click)="move(i, i + 1)"
                      >
                        <svg siArrowDownIcon></svg>
                        <span
                          i18n="@@dataTables.interactiveTables.moveDown"
                          class="sr-only"
                          >Move {{ member.name }} down</span
                        >
                      </button>
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
export class DragDropTablePage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.interactiveTables.dataTables:Data Tables`,
    dragDrop: $localize`:@@dataTables.interactiveTables.dragDrop:Drag & Drop`,
  };

  private readonly data = signal(STAFF.slice(0, 7) as StaffMember[]);

  private drop(event: CdkDragDrop<unknown>): void {
    this.move(event.previousIndex, event.currentIndex);
  }

  private move(from: number, to: number): void {
    this.data.update((rows) => {
      const next = [...rows];
      moveItemInArray(next, from, to);
      return next;
    });
  }
}

const expandFeatures = tableFeatures({
  columnVisibilityFeature,
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});
const expandHelper = createColumnHelper<typeof expandFeatures, StaffMember>();

/** Expanding (Pro TanStack tables): a row opens on its details. */
@Component({
  selector: 'app-expanding-table-page',
  imports: [
    ...BASE,
    ScDataTableRow,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
    ScDataTableExpand,
    SiChevronRightIcon,
    ScDataTableContainer,
    ScDataTable,
    ScDataTableHeader,
    ScDataTableBody,
    ScDataTableHeaderCell,
    ScDataTableCell,
  ],
  template: `
    <app-page-header
      i18n-title="@@dataTables.interactiveTables.expanding"
      title="Expanding"
      [trail]="[{ label: t.dataTables }, { label: t.expanding }]"
    />
    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@dataTables.interactiveTables.team" scCardTitle>Team</h2>
        <p
          i18n="@@dataTables.interactiveTables.openARowToSee"
          scCardDescription
        >
          Open a row to see that person’s projects
        </p>
      </div>
      <div scCardBody>
        <div scDataTableContainer>
          <table scDataTable>
            <thead scDataTableHeader>
              <tr scDataTableRow>
                <th
                  i18n="@@dataTables.interactiveTables.details"
                  scDataTableHeaderCell
                  class="w-10"
                >
                  <span class="sr-only">Details</span>
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.name"
                  scDataTableHeaderCell
                >
                  Name
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.role"
                  scDataTableHeaderCell
                >
                  Role
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.department"
                  scDataTableHeaderCell
                >
                  Department
                </th>
                <th
                  i18n="@@dataTables.interactiveTables.projects"
                  scDataTableHeaderCell
                >
                  Projects
                </th>
              </tr>
            </thead>
            <tbody scDataTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scDataTableRow [row]="row">
                  <td scDataTableCell>
                    <button scDataTableExpand [row]="row">
                      <svg
                        siChevronRightIcon
                        class="transition-transform in-aria-expanded:rotate-90 rtl:-scale-x-100"
                      ></svg>
                      <span
                        i18n="@@dataTables.interactiveTables.projectsOf"
                        class="sr-only"
                        >Projects of {{ row.original.name }}</span
                      >
                    </button>
                  </td>
                  <td scDataTableCell>
                    <app-staff-cell column="name" [member]="row.original" />
                  </td>
                  <td scDataTableCell>{{ labelOf(row.original.role) }}</td>
                  <td scDataTableCell>
                    {{ labelOf(row.original.department) }}
                  </td>
                  <td scDataTableCell class="tabular-nums">
                    {{ countOf(row.original.projects.length) }}
                  </td>
                </tr>
                @if (row.getIsExpanded()) {
                  <tr scDataTableRow class="bg-muted/30 hover:bg-muted/30">
                    <td scDataTableCell></td>
                    <td scDataTableCell colspan="4">
                      <div class="grid gap-4 py-2 sm:grid-cols-3">
                        @for (
                          project of row.original.projects;
                          track project.name
                        ) {
                          <div scProgress [value]="project.progress">
                            <span scProgressLabel>{{ project.name }}</span>
                            <span scProgressValueText>{{
                              percentOf(project.progress / 100)
                            }}</span>
                            <div scProgressTrack>
                              <div scProgressRange></div>
                            </div>
                          </div>
                        }
                      </div>
                    </td>
                  </tr>
                }
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
export class ExpandingTablePage {
  /** In the user's numbering system. */
  private readonly percentOf = percent;

  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dataTables: $localize`:@@dataTables.interactiveTables.dataTables:Data Tables`,
    expanding: $localize`:@@dataTables.interactiveTables.expanding:Expanding`,
  };

  private readonly table = injectTable(() => ({
    features: expandFeatures,
    columns: expandHelper.columns([
      expandHelper.accessor('name', {
        header: $localize`:@@dataTables.interactiveTables.name:Name`,
      }),
    ]),
    data: STAFF.slice(0, 8) as StaffMember[],
    getRowId: (row) => String(row.id),
    getRowCanExpand: () => true,
    initialState: { expanded: { '1': true } },
  }));
}
