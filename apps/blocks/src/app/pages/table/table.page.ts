import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  type GroupingState,
  type PaginationState,
  type RowPinningState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  createAngularTable,
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  role: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  performanceScore: number;
}

const EMPLOYEES: Employee[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    age: 32,
    department: 'Engineering',
    role: 'Senior Developer',
    salary: 120000,
    startDate: '2019-03-15',
    status: 'active',
    performanceScore: 92,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    age: 28,
    department: 'Engineering',
    role: 'Junior Developer',
    salary: 75000,
    startDate: '2021-07-01',
    status: 'active',
    performanceScore: 78,
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    age: 45,
    department: 'Marketing',
    role: 'Marketing Director',
    salary: 140000,
    startDate: '2015-01-10',
    status: 'active',
    performanceScore: 95,
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    age: 36,
    department: 'Sales',
    role: 'Sales Manager',
    salary: 110000,
    startDate: '2018-06-20',
    status: 'active',
    performanceScore: 88,
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Davis',
    email: 'eve.davis@example.com',
    age: 29,
    department: 'Engineering',
    role: 'Mid Developer',
    salary: 95000,
    startDate: '2020-09-12',
    status: 'on-leave',
    performanceScore: 85,
  },
  {
    id: 6,
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank.miller@example.com',
    age: 52,
    department: 'HR',
    role: 'HR Director',
    salary: 130000,
    startDate: '2012-04-05',
    status: 'active',
    performanceScore: 90,
  },
  {
    id: 7,
    firstName: 'Grace',
    lastName: 'Wilson',
    email: 'grace.wilson@example.com',
    age: 26,
    department: 'Design',
    role: 'UI Designer',
    salary: 80000,
    startDate: '2022-01-15',
    status: 'active',
    performanceScore: 82,
  },
  {
    id: 8,
    firstName: 'Henry',
    lastName: 'Moore',
    email: 'henry.moore@example.com',
    age: 41,
    department: 'Engineering',
    role: 'Tech Lead',
    salary: 150000,
    startDate: '2016-08-30',
    status: 'active',
    performanceScore: 97,
  },
  {
    id: 9,
    firstName: 'Ivy',
    lastName: 'Taylor',
    email: 'ivy.taylor@example.com',
    age: 33,
    department: 'Marketing',
    role: 'Content Strategist',
    salary: 85000,
    startDate: '2019-11-20',
    status: 'active',
    performanceScore: 79,
  },
  {
    id: 10,
    firstName: 'Jack',
    lastName: 'Anderson',
    email: 'jack.anderson@example.com',
    age: 38,
    department: 'Sales',
    role: 'Account Executive',
    salary: 95000,
    startDate: '2017-05-14',
    status: 'inactive',
    performanceScore: 71,
  },
  {
    id: 11,
    firstName: 'Karen',
    lastName: 'Thomas',
    email: 'karen.thomas@example.com',
    age: 31,
    department: 'Engineering',
    role: 'DevOps Engineer',
    salary: 115000,
    startDate: '2020-02-28',
    status: 'active',
    performanceScore: 89,
  },
  {
    id: 12,
    firstName: 'Leo',
    lastName: 'Jackson',
    email: 'leo.jackson@example.com',
    age: 27,
    department: 'Design',
    role: 'UX Researcher',
    salary: 78000,
    startDate: '2022-06-10',
    status: 'active',
    performanceScore: 76,
  },
  {
    id: 13,
    firstName: 'Mia',
    lastName: 'White',
    email: 'mia.white@example.com',
    age: 44,
    department: 'Finance',
    role: 'CFO',
    salary: 180000,
    startDate: '2014-03-01',
    status: 'active',
    performanceScore: 96,
  },
  {
    id: 14,
    firstName: 'Noah',
    lastName: 'Harris',
    email: 'noah.harris@example.com',
    age: 30,
    department: 'Engineering',
    role: 'Backend Developer',
    salary: 105000,
    startDate: '2020-10-05',
    status: 'active',
    performanceScore: 84,
  },
  {
    id: 15,
    firstName: 'Olivia',
    lastName: 'Martin',
    email: 'olivia.martin@example.com',
    age: 35,
    department: 'HR',
    role: 'Recruiter',
    salary: 72000,
    startDate: '2019-07-22',
    status: 'active',
    performanceScore: 81,
  },
  {
    id: 16,
    firstName: 'Paul',
    lastName: 'Garcia',
    email: 'paul.garcia@example.com',
    age: 48,
    department: 'Sales',
    role: 'VP Sales',
    salary: 160000,
    startDate: '2013-09-15',
    status: 'active',
    performanceScore: 93,
  },
  {
    id: 17,
    firstName: 'Quinn',
    lastName: 'Martinez',
    email: 'quinn.martinez@example.com',
    age: 25,
    department: 'Engineering',
    role: 'Intern',
    salary: 50000,
    startDate: '2023-01-09',
    status: 'active',
    performanceScore: 74,
  },
  {
    id: 18,
    firstName: 'Rachel',
    lastName: 'Robinson',
    email: 'rachel.robinson@example.com',
    age: 39,
    department: 'Marketing',
    role: 'SEO Specialist',
    salary: 88000,
    startDate: '2018-02-14',
    status: 'on-leave',
    performanceScore: 80,
  },
  {
    id: 19,
    firstName: 'Sam',
    lastName: 'Clark',
    email: 'sam.clark@example.com',
    age: 34,
    department: 'Finance',
    role: 'Accountant',
    salary: 82000,
    startDate: '2019-05-30',
    status: 'active',
    performanceScore: 77,
  },
  {
    id: 20,
    firstName: 'Tina',
    lastName: 'Rodriguez',
    email: 'tina.rodriguez@example.com',
    age: 42,
    department: 'Engineering',
    role: 'QA Lead',
    salary: 110000,
    startDate: '2016-11-18',
    status: 'active',
    performanceScore: 91,
  },
  {
    id: 21,
    firstName: 'Uma',
    lastName: 'Lee',
    email: 'uma.lee@example.com',
    age: 29,
    department: 'Design',
    role: 'Graphic Designer',
    salary: 75000,
    startDate: '2021-03-25',
    status: 'active',
    performanceScore: 83,
  },
  {
    id: 22,
    firstName: 'Victor',
    lastName: 'Walker',
    email: 'victor.walker@example.com',
    age: 37,
    department: 'Engineering',
    role: 'Security Engineer',
    salary: 135000,
    startDate: '2017-08-07',
    status: 'active',
    performanceScore: 94,
  },
  {
    id: 23,
    firstName: 'Wendy',
    lastName: 'Hall',
    email: 'wendy.hall@example.com',
    age: 50,
    department: 'HR',
    role: 'VP People',
    salary: 155000,
    startDate: '2013-01-20',
    status: 'active',
    performanceScore: 92,
  },
  {
    id: 24,
    firstName: 'Xander',
    lastName: 'Allen',
    email: 'xander.allen@example.com',
    age: 26,
    department: 'Sales',
    role: 'SDR',
    salary: 60000,
    startDate: '2022-09-01',
    status: 'active',
    performanceScore: 69,
  },
  {
    id: 25,
    firstName: 'Yara',
    lastName: 'Young',
    email: 'yara.young@example.com',
    age: 33,
    department: 'Marketing',
    role: 'Brand Manager',
    salary: 98000,
    startDate: '2019-04-12',
    status: 'active',
    performanceScore: 87,
  },
  {
    id: 26,
    firstName: 'Zane',
    lastName: 'King',
    email: 'zane.king@example.com',
    age: 40,
    department: 'Engineering',
    role: 'Staff Engineer',
    salary: 165000,
    startDate: '2015-06-01',
    status: 'active',
    performanceScore: 98,
  },
  {
    id: 27,
    firstName: 'Amber',
    lastName: 'Wright',
    email: 'amber.wright@example.com',
    age: 31,
    department: 'Finance',
    role: 'Financial Analyst',
    salary: 90000,
    startDate: '2020-08-15',
    status: 'inactive',
    performanceScore: 75,
  },
  {
    id: 28,
    firstName: 'Blake',
    lastName: 'Lopez',
    email: 'blake.lopez@example.com',
    age: 28,
    department: 'Design',
    role: 'Motion Designer',
    salary: 82000,
    startDate: '2021-11-03',
    status: 'active',
    performanceScore: 86,
  },
  {
    id: 29,
    firstName: 'Chloe',
    lastName: 'Hill',
    email: 'chloe.hill@example.com',
    age: 46,
    department: 'Engineering',
    role: 'Engineering Manager',
    salary: 170000,
    startDate: '2014-07-20',
    status: 'active',
    performanceScore: 95,
  },
  {
    id: 30,
    firstName: 'Derek',
    lastName: 'Scott',
    email: 'derek.scott@example.com',
    age: 35,
    department: 'Sales',
    role: 'Sales Engineer',
    salary: 115000,
    startDate: '2018-10-08',
    status: 'active',
    performanceScore: 88,
  },
];

const columnHelper = createColumnHelper<Employee>();

const columns: ColumnDef<Employee, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => `
      <input type="checkbox"
        ${table.getIsAllPageRowsSelected() ? 'checked' : ''}
        class="h-4 w-4 rounded border-border" />
    `,
    cell: ({ row }) => `
      <input type="checkbox"
        ${row.getIsSelected() ? 'checked' : ''}
        ${!row.getCanSelect() ? 'disabled' : ''}
        class="h-4 w-4 rounded border-border" />
    `,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'expand',
    header: () => '',
    cell: ({ row }) =>
      row.getCanExpand()
        ? `<button class="cursor-pointer p-1">${row.getIsExpanded() ? '▼' : '▶'}</button>`
        : '',
    enableSorting: false,
    enableColumnFilter: false,
  },
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    enableColumnFilter: false,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: 'inNumberRange',
  }),
  columnHelper.accessor('department', {
    header: 'Department',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('salary', {
    header: 'Salary',
    cell: (info) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(info.getValue()),
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
    aggregatedCell: (info) =>
      `Avg: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(info.getValue() as number)}`,
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const colors: Record<string, string> = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        'on-leave': 'bg-yellow-100 text-yellow-800',
      };
      return `<span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[status]}">${status}</span>`;
    },
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('performanceScore', {
    header: 'Performance',
    cell: (info) => {
      const score = info.getValue();
      const width = score;
      const color =
        score >= 90
          ? 'bg-green-500'
          : score >= 75
            ? 'bg-yellow-500'
            : 'bg-red-500';
      return `<div class="flex items-center gap-2"><div class="h-2 w-16 rounded-full bg-muted"><div class="h-2 rounded-full ${color}" style="width: ${width}%"></div></div><span class="text-sm">${score}</span></div>`;
    },
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
    aggregatedCell: (info) => `Avg: ${Math.round(info.getValue() as number)}`,
  }),
];

@Component({
  selector: 'app-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
  host: { class: 'block' },
  template: `
    <div class="container mx-auto py-10 px-4">
      <h1 class="mb-6 text-3xl font-bold">TanStack Table Demo</h1>

      <!-- Toolbar -->
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <!-- Global Filter -->
        <input
          type="text"
          [ngModel]="globalFilter()"
          (ngModelChange)="globalFilter.set($event)"
          placeholder="Search all columns..."
          class="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        <!-- Column Visibility -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Columns:</span>
          @for (column of table.getAllLeafColumns(); track column.id) {
            @if (column.id !== 'select' && column.id !== 'expand') {
              <label class="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  [checked]="column.getIsVisible()"
                  (change)="column.toggleVisibility()"
                  class="h-3.5 w-3.5 rounded border-border"
                />
                {{ column.id }}
              </label>
            }
          }
        </div>

        <!-- Grouping -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Group by:</span>
          <button
            (click)="toggleGrouping('department')"
            class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
            [class.bg-primary]="isGroupedBy('department')"
            [class.text-primary-foreground]="isGroupedBy('department')"
          >
            Department
          </button>
        </div>

        <!-- Selection Count -->
        @if (selectedRowCount() > 0) {
          <span class="text-sm text-muted-foreground">
            {{ selectedRowCount() }} of
            {{ table.getRowModel().rows.length }} row(s) selected
          </span>
        }
      </div>

      <!-- Table -->
      <div class="relative overflow-auto rounded-md border">
        <table class="w-full caption-bottom text-sm">
          <!-- Header -->
          <thead class="[&_tr]:border-b">
            @for (
              headerGroup of table.getHeaderGroups();
              track headerGroup.id
            ) {
              <tr class="border-b transition-colors hover:bg-muted/50">
                @for (header of headerGroup.headers; track header.id) {
                  <th
                    class="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                    [class.sticky]="header.column.getIsPinned()"
                    [class.left-0]="header.column.getIsPinned() === 'left'"
                    [class.right-0]="header.column.getIsPinned() === 'right'"
                    [class.z-10]="header.column.getIsPinned()"
                    [class.bg-background]="header.column.getIsPinned()"
                    [attr.colSpan]="header.colSpan"
                  >
                    @if (!header.isPlaceholder) {
                      <div
                        class="flex items-center gap-1"
                        [class.cursor-pointer]="header.column.getCanSort()"
                        [class.select-none]="header.column.getCanSort()"
                        (click)="
                          header.column.getCanSort()
                            ? header.column.toggleSorting()
                            : null
                        "
                      >
                        <span [innerHTML]="getHeaderContent(header)"></span>
                        @if (header.column.getIsSorted() === 'asc') {
                          <span>↑</span>
                        } @else if (header.column.getIsSorted() === 'desc') {
                          <span>↓</span>
                        }
                      </div>
                    }
                  </th>
                }
              </tr>
            }
            <!-- Column Filters Row -->
            <tr class="border-b">
              @for (
                header of table.getHeaderGroups()[
                  table.getHeaderGroups().length - 1
                ].headers;
                track header.id
              ) {
                <th class="px-2 py-1">
                  @if (header.column.getCanFilter()) {
                    <input
                      type="text"
                      [ngModel]="getColumnFilterValue(header.column.id)"
                      (ngModelChange)="header.column.setFilterValue($event)"
                      placeholder="Filter..."
                      class="h-7 w-full rounded border border-input bg-transparent px-2 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  }
                </th>
              }
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="[&_tr:last-child]:border-0">
            @for (row of table.getRowModel().rows; track row.id) {
              <tr
                class="border-b transition-colors hover:bg-muted/50"
                [class.bg-muted/50]="row.getIsSelected()"
                [class.bg-muted/30]="row.getIsGrouped()"
              >
                @for (cell of row.getVisibleCells(); track cell.id) {
                  <td
                    class="p-2 align-middle [&:has([role=checkbox])]:pr-0"
                    [class.sticky]="cell.column.getIsPinned()"
                    [class.left-0]="cell.column.getIsPinned() === 'left'"
                    [class.right-0]="cell.column.getIsPinned() === 'right'"
                    [class.z-10]="cell.column.getIsPinned()"
                    [class.bg-background]="cell.column.getIsPinned()"
                  >
                    @if (cell.getIsGrouped()) {
                      <button
                        (click)="row.toggleExpanded()"
                        class="flex cursor-pointer items-center gap-1 font-medium"
                      >
                        {{ row.getIsExpanded() ? '▼' : '▶' }}
                        <span [innerHTML]="getCellContent(cell)"></span>
                        <span class="ml-1 text-muted-foreground">
                          ({{ row.subRows.length }})
                        </span>
                      </button>
                    } @else if (cell.getIsAggregated()) {
                      <span
                        class="text-muted-foreground"
                        [innerHTML]="getAggregatedCellContent(cell)"
                      ></span>
                    } @else if (cell.getIsPlaceholder()) {
                      <!-- placeholder -->
                    } @else if (isEditing(row.id, cell.column.id)) {
                      <input
                        type="text"
                        [ngModel]="getEditValue()"
                        (ngModelChange)="editValue.set($event)"
                        (blur)="saveEdit(row.original, cell.column.id)"
                        (keydown.enter)="saveEdit(row.original, cell.column.id)"
                        (keydown.escape)="cancelEdit()"
                        class="h-7 w-full rounded border border-input bg-transparent px-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    } @else {
                      <!-- Select column -->
                      @if (cell.column.id === 'select') {
                        <input
                          type="checkbox"
                          [checked]="row.getIsSelected()"
                          [disabled]="!row.getCanSelect()"
                          (change)="row.toggleSelected()"
                          class="h-4 w-4 rounded border-border"
                        />
                      } @else if (cell.column.id === 'expand') {
                        @if (row.getCanExpand()) {
                          <button
                            (click)="row.toggleExpanded()"
                            class="cursor-pointer p-1"
                          >
                            {{ row.getIsExpanded() ? '▼' : '▶' }}
                          </button>
                        }
                      } @else {
                        <span
                          [innerHTML]="getCellContent(cell)"
                          (dblclick)="
                            canEditColumn(cell.column.id)
                              ? startEdit(
                                  row.id,
                                  cell.column.id,
                                  cell.getValue()
                                )
                              : null
                          "
                          [class.cursor-pointer]="canEditColumn(cell.column.id)"
                          [title]="
                            canEditColumn(cell.column.id)
                              ? 'Double-click to edit'
                              : ''
                          "
                        ></span>
                      }
                    }
                  </td>
                }
              </tr>
              <!-- Expanded Row Detail -->
              @if (row.getIsExpanded() && !row.getIsGrouped()) {
                <tr class="border-b bg-muted/20">
                  <td [attr.colSpan]="row.getVisibleCells().length" class="p-4">
                    <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                      <div>
                        <span class="font-medium">Full Name:</span>
                        {{ row.original.firstName }} {{ row.original.lastName }}
                      </div>
                      <div>
                        <span class="font-medium">Email:</span>
                        {{ row.original.email }}
                      </div>
                      <div>
                        <span class="font-medium">Department:</span>
                        {{ row.original.department }}
                      </div>
                      <div>
                        <span class="font-medium">Role:</span>
                        {{ row.original.role }}
                      </div>
                      <div>
                        <span class="font-medium">Salary:</span>
                        {{ formatCurrency(row.original.salary) }}
                      </div>
                      <div>
                        <span class="font-medium">Start Date:</span>
                        {{ row.original.startDate }}
                      </div>
                      <div>
                        <span class="font-medium">Status:</span>
                        {{ row.original.status }}
                      </div>
                      <div>
                        <span class="font-medium">Performance:</span>
                        {{ row.original.performanceScore }}/100
                      </div>
                    </div>
                  </td>
                </tr>
              }
            }
            @if (table.getRowModel().rows.length === 0) {
              <tr>
                <td
                  [attr.colSpan]="columns.length"
                  class="h-24 text-center text-muted-foreground"
                >
                  No results.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-2 py-4">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <select
            [ngModel]="pagination().pageSize"
            (ngModelChange)="table.setPageSize(+$event)"
            class="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            @for (size of pageSizeOptions; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </span>
          <button
            (click)="table.firstPage()"
            [disabled]="!table.getCanPreviousPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            «
          </button>
          <button
            (click)="table.previousPage()"
            [disabled]="!table.getCanPreviousPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            ‹
          </button>
          <button
            (click)="table.nextPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            ›
          </button>
          <button
            (click)="table.lastPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            »
          </button>
        </div>
      </div>

      <!-- Pin Controls -->
      <div class="mt-4 flex flex-wrap gap-4 rounded-md border p-4">
        <h3 class="w-full text-sm font-medium">Column Pinning</h3>
        <button
          (click)="toggleColumnPin('id', 'left')"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          [class.bg-primary]="columnPinning().left?.includes('id')"
          [class.text-primary-foreground]="columnPinning().left?.includes('id')"
        >
          Pin ID Left
        </button>
        <button
          (click)="toggleColumnPin('performanceScore', 'right')"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          [class.bg-primary]="
            columnPinning().right?.includes('performanceScore')
          "
          [class.text-primary-foreground]="
            columnPinning().right?.includes('performanceScore')
          "
        >
          Pin Performance Right
        </button>
        <button
          (click)="resetColumnPinning()"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
        >
          Reset Pinning
        </button>
      </div>
    </div>
  `,
})
export default class TablePage {
  readonly sorting = signal<SortingState>([]);
  readonly columnFilters = signal<ColumnFiltersState>([]);
  readonly globalFilter = signal('');
  readonly columnVisibility = signal<VisibilityState>({});
  readonly rowSelection = signal<RowSelectionState>({});
  readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 10 });
  readonly expanded = signal<ExpandedState>({});
  readonly grouping = signal<GroupingState>([]);
  readonly columnPinning = signal<ColumnPinningState>({});
  readonly rowPinning = signal<RowPinningState>({ top: [], bottom: [] });
  readonly data = signal<Employee[]>(EMPLOYEES);

  readonly editingCell = signal<{ rowId: string; columnId: string } | null>(
    null,
  );
  readonly editValue = signal<string>('');

  readonly columns = columns;
  readonly pageSizeOptions = [5, 10, 20, 30];

  readonly table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      columnFilters: this.columnFilters(),
      globalFilter: this.globalFilter(),
      columnVisibility: this.columnVisibility(),
      rowSelection: this.rowSelection(),
      pagination: this.pagination(),
      expanded: this.expanded(),
      grouping: this.grouping(),
      columnPinning: this.columnPinning(),
      rowPinning: this.rowPinning(),
    },
    onSortingChange: (updater) => {
      this.sorting.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnFiltersChange: (updater) => {
      this.columnFilters.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onGlobalFilterChange: (updater) => {
      this.globalFilter.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnVisibilityChange: (updater) => {
      this.columnVisibility.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onRowSelectionChange: (updater) => {
      this.rowSelection.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onPaginationChange: (updater) => {
      this.pagination.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onExpandedChange: (updater) => {
      this.expanded.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onGroupingChange: (updater) => {
      this.grouping.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onColumnPinningChange: (updater) => {
      this.columnPinning.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    onRowPinningChange: (updater) => {
      this.rowPinning.update((prev) =>
        typeof updater === 'function' ? updater(prev) : updater,
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowSelection: true,
    enableExpanding: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowPinning: true,
    getRowCanExpand: () => true,
  }));

  readonly selectedRowCount = computed(
    () => Object.keys(this.rowSelection()).length,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHeaderContent(header: any): string {
    const headerDef = header.column.columnDef.header;
    if (typeof headerDef === 'string') return headerDef;
    if (typeof headerDef === 'function') return headerDef(header.getContext());
    return header.column.id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCellContent(cell: any): string {
    const cellDef = cell.column.columnDef.cell;
    if (typeof cellDef === 'function')
      return cellDef(cell.getContext()) as string;
    return String(cell.getValue());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAggregatedCellContent(cell: any): string {
    const aggDef = cell.column.columnDef.aggregatedCell;
    if (typeof aggDef === 'function')
      return aggDef(cell.getContext()) as string;
    return this.getCellContent(cell);
  }

  getColumnFilterValue(columnId: string): string {
    const filter = this.columnFilters().find((f) => f.id === columnId);
    return (filter?.value as string) ?? '';
  }

  toggleGrouping(columnId: string): void {
    this.grouping.update((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  }

  isGroupedBy(columnId: string): boolean {
    return this.grouping().includes(columnId);
  }

  toggleColumnPin(columnId: string, position: 'left' | 'right'): void {
    this.columnPinning.update((prev) => {
      const pinned = prev[position] ?? [];
      if (pinned.includes(columnId)) {
        return { ...prev, [position]: pinned.filter((id) => id !== columnId) };
      }
      return { ...prev, [position]: [...pinned, columnId] };
    });
  }

  resetColumnPinning(): void {
    this.columnPinning.set({});
  }

  canEditColumn(columnId: string): boolean {
    return columnId === 'firstName';
  }

  isEditing(rowId: string, columnId: string): boolean {
    const editing = this.editingCell();
    return editing?.rowId === rowId && editing?.columnId === columnId;
  }

  getEditValue(): string {
    return this.editValue();
  }

  startEdit(rowId: string, columnId: string, value: unknown): void {
    this.editingCell.set({ rowId, columnId });
    this.editValue.set(String(value ?? ''));
  }

  saveEdit(row: Employee, columnId: string): void {
    const value = this.editValue();
    this.data.update((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, [columnId]: value } : item,
      ),
    );
    this.editingCell.set(null);
  }

  cancelEdit(): void {
    this.editingCell.set(null);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
