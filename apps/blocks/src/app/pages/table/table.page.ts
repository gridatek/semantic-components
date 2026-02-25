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

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastLoginAt: string;
  storageUsed: number;
  apiCalls: number;
}

const USERS: User[] = [
  {
    id: 1,
    username: 'alice_j',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-01-15',
    lastLoginAt: '2026-02-25',
    storageUsed: 4800,
    apiCalls: 12450,
  },
  {
    id: 2,
    username: 'bob_s',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2022-03-20',
    lastLoginAt: '2026-02-24',
    storageUsed: 2100,
    apiCalls: 8320,
  },
  {
    id: 3,
    username: 'carol_w',
    firstName: 'Carol',
    lastName: 'Williams',
    email: 'carol.williams@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'active',
    joinedAt: '2022-06-10',
    lastLoginAt: '2026-02-20',
    storageUsed: 340,
    apiCalls: 1200,
  },
  {
    id: 4,
    username: 'david_b',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2022-08-05',
    lastLoginAt: '2026-02-26',
    storageUsed: 3200,
    apiCalls: 9540,
  },
  {
    id: 5,
    username: 'eve_d',
    firstName: 'Eve',
    lastName: 'Davis',
    email: 'eve.davis@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'suspended',
    joinedAt: '2022-09-12',
    lastLoginAt: '2025-11-03',
    storageUsed: 120,
    apiCalls: 450,
  },
  {
    id: 6,
    username: 'frank_m',
    firstName: 'Frank',
    lastName: 'Miller',
    email: 'frank.miller@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-02-28',
    lastLoginAt: '2026-02-26',
    storageUsed: 7600,
    apiCalls: 24100,
  },
  {
    id: 7,
    username: 'grace_w',
    firstName: 'Grace',
    lastName: 'Wilson',
    email: 'grace.wilson@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2022-11-01',
    lastLoginAt: '2026-02-23',
    storageUsed: 1800,
    apiCalls: 6700,
  },
  {
    id: 8,
    username: 'henry_m',
    firstName: 'Henry',
    lastName: 'Moore',
    email: 'henry.moore@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'inactive',
    joinedAt: '2023-01-18',
    lastLoginAt: '2025-08-14',
    storageUsed: 80,
    apiCalls: 210,
  },
  {
    id: 9,
    username: 'ivy_t',
    firstName: 'Ivy',
    lastName: 'Taylor',
    email: 'ivy.taylor@example.com',
    role: 'editor',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-05-22',
    lastLoginAt: '2026-02-25',
    storageUsed: 5100,
    apiCalls: 15800,
  },
  {
    id: 10,
    username: 'jack_a',
    firstName: 'Jack',
    lastName: 'Anderson',
    email: 'jack.anderson@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'inactive',
    joinedAt: '2023-03-14',
    lastLoginAt: '2025-06-20',
    storageUsed: 50,
    apiCalls: 130,
  },
  {
    id: 11,
    username: 'karen_t',
    firstName: 'Karen',
    lastName: 'Thomas',
    email: 'karen.thomas@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-04-10',
    lastLoginAt: '2026-02-26',
    storageUsed: 6200,
    apiCalls: 18900,
  },
  {
    id: 12,
    username: 'leo_j',
    firstName: 'Leo',
    lastName: 'Jackson',
    email: 'leo.jackson@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2023-02-05',
    lastLoginAt: '2026-02-22',
    storageUsed: 1400,
    apiCalls: 5200,
  },
  {
    id: 13,
    username: 'mia_w',
    firstName: 'Mia',
    lastName: 'White',
    email: 'mia.white@example.com',
    role: 'viewer',
    plan: 'pro',
    status: 'active',
    joinedAt: '2023-04-19',
    lastLoginAt: '2026-02-21',
    storageUsed: 920,
    apiCalls: 3100,
  },
  {
    id: 14,
    username: 'noah_h',
    firstName: 'Noah',
    lastName: 'Harris',
    email: 'noah.harris@example.com',
    role: 'editor',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-07-30',
    lastLoginAt: '2026-02-26',
    storageUsed: 4500,
    apiCalls: 14200,
  },
  {
    id: 15,
    username: 'olivia_m',
    firstName: 'Olivia',
    lastName: 'Martin',
    email: 'olivia.martin@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'active',
    joinedAt: '2023-06-12',
    lastLoginAt: '2026-02-19',
    storageUsed: 280,
    apiCalls: 890,
  },
  {
    id: 16,
    username: 'paul_g',
    firstName: 'Paul',
    lastName: 'Garcia',
    email: 'paul.garcia@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-01-03',
    lastLoginAt: '2026-02-26',
    storageUsed: 8900,
    apiCalls: 31200,
  },
  {
    id: 17,
    username: 'quinn_m',
    firstName: 'Quinn',
    lastName: 'Martinez',
    email: 'quinn.martinez@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'active',
    joinedAt: '2023-08-25',
    lastLoginAt: '2026-02-18',
    storageUsed: 150,
    apiCalls: 520,
  },
  {
    id: 18,
    username: 'rachel_r',
    firstName: 'Rachel',
    lastName: 'Robinson',
    email: 'rachel.robinson@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'suspended',
    joinedAt: '2022-10-08',
    lastLoginAt: '2025-12-01',
    storageUsed: 1600,
    apiCalls: 4800,
  },
  {
    id: 19,
    username: 'sam_c',
    firstName: 'Sam',
    lastName: 'Clark',
    email: 'sam.clark@example.com',
    role: 'viewer',
    plan: 'pro',
    status: 'active',
    joinedAt: '2023-05-16',
    lastLoginAt: '2026-02-24',
    storageUsed: 750,
    apiCalls: 2600,
  },
  {
    id: 20,
    username: 'tina_r',
    firstName: 'Tina',
    lastName: 'Rodriguez',
    email: 'tina.rodriguez@example.com',
    role: 'editor',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-09-01',
    lastLoginAt: '2026-02-25',
    storageUsed: 3800,
    apiCalls: 11700,
  },
  {
    id: 21,
    username: 'uma_l',
    firstName: 'Uma',
    lastName: 'Lee',
    email: 'uma.lee@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'active',
    joinedAt: '2023-07-20',
    lastLoginAt: '2026-02-17',
    storageUsed: 200,
    apiCalls: 680,
  },
  {
    id: 22,
    username: 'victor_w',
    firstName: 'Victor',
    lastName: 'Walker',
    email: 'victor.walker@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-03-15',
    lastLoginAt: '2026-02-26',
    storageUsed: 7100,
    apiCalls: 22500,
  },
  {
    id: 23,
    username: 'wendy_h',
    firstName: 'Wendy',
    lastName: 'Hall',
    email: 'wendy.hall@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2022-12-10',
    lastLoginAt: '2026-02-23',
    storageUsed: 2400,
    apiCalls: 7800,
  },
  {
    id: 24,
    username: 'xander_a',
    firstName: 'Xander',
    lastName: 'Allen',
    email: 'xander.allen@example.com',
    role: 'viewer',
    plan: 'free',
    status: 'inactive',
    joinedAt: '2023-09-05',
    lastLoginAt: '2025-10-12',
    storageUsed: 30,
    apiCalls: 90,
  },
  {
    id: 25,
    username: 'yara_y',
    firstName: 'Yara',
    lastName: 'Young',
    email: 'yara.young@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2023-01-28',
    lastLoginAt: '2026-02-22',
    storageUsed: 1900,
    apiCalls: 6100,
  },
  {
    id: 26,
    username: 'zane_k',
    firstName: 'Zane',
    lastName: 'King',
    email: 'zane.king@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-02-14',
    lastLoginAt: '2026-02-26',
    storageUsed: 9200,
    apiCalls: 28700,
  },
  {
    id: 27,
    username: 'amber_w',
    firstName: 'Amber',
    lastName: 'Wright',
    email: 'amber.wright@example.com',
    role: 'viewer',
    plan: 'pro',
    status: 'inactive',
    joinedAt: '2023-04-02',
    lastLoginAt: '2025-09-18',
    storageUsed: 410,
    apiCalls: 1500,
  },
  {
    id: 28,
    username: 'blake_l',
    firstName: 'Blake',
    lastName: 'Lopez',
    email: 'blake.lopez@example.com',
    role: 'editor',
    plan: 'pro',
    status: 'active',
    joinedAt: '2023-03-08',
    lastLoginAt: '2026-02-21',
    storageUsed: 1100,
    apiCalls: 4200,
  },
  {
    id: 29,
    username: 'chloe_h',
    firstName: 'Chloe',
    lastName: 'Hill',
    email: 'chloe.hill@example.com',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-06-25',
    lastLoginAt: '2026-02-26',
    storageUsed: 6800,
    apiCalls: 20300,
  },
  {
    id: 30,
    username: 'derek_s',
    firstName: 'Derek',
    lastName: 'Scott',
    email: 'derek.scott@example.com',
    role: 'editor',
    plan: 'enterprise',
    status: 'active',
    joinedAt: '2022-11-18',
    lastLoginAt: '2026-02-24',
    storageUsed: 4100,
    apiCalls: 13600,
  },
];

const columnHelper = createColumnHelper<User>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<User, any>[] = [
  {
    id: 'select',
    header: 'Select',
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    id: 'expand',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
  },
  columnHelper.accessor('id', {
    header: 'ID',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('username', {
    header: 'Username',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    enableSorting: true,
    enableColumnFilter: true,
    enableGrouping: true,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    enableSorting: true,
    enableColumnFilter: true,
  }),
  columnHelper.accessor('joinedAt', {
    header: 'Joined',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('lastLoginAt', {
    header: 'Last Login',
    enableSorting: true,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('storageUsed', {
    header: 'Storage (MB)',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'mean',
  }),
  columnHelper.accessor('apiCalls', {
    header: 'API Calls',
    enableSorting: true,
    enableColumnFilter: false,
    aggregationFn: 'sum',
  }),
];

@Component({
  selector: 'app-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
  host: { class: 'block' },
  template: `
    <div class="container mx-auto px-4 py-10">
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
            (click)="toggleGrouping('role')"
            class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
            [class.bg-primary]="isGroupedBy('role')"
            [class.text-primary-foreground]="isGroupedBy('role')"
          >
            Role
          </button>
          <button
            (click)="toggleGrouping('plan')"
            class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
            [class.bg-primary]="isGroupedBy('plan')"
            [class.text-primary-foreground]="isGroupedBy('plan')"
          >
            Plan
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
                    class="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                    [class.sticky]="header.column.getIsPinned()"
                    [class.left-0]="header.column.getIsPinned() === 'left'"
                    [class.right-0]="header.column.getIsPinned() === 'right'"
                    [class.z-10]="header.column.getIsPinned()"
                    [class.bg-background]="header.column.getIsPinned()"
                    [attr.colSpan]="header.colSpan"
                  >
                    @if (!header.isPlaceholder) {
                      @if (header.column.id === 'select') {
                        <input
                          type="checkbox"
                          [checked]="table.getIsAllPageRowsSelected()"
                          (change)="table.toggleAllPageRowsSelected()"
                          class="h-4 w-4 rounded border-border"
                        />
                      } @else {
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
                          <span>{{ getHeaderLabel(header) }}</span>
                          @if (header.column.getIsSorted() === 'asc') {
                            <span>↑</span>
                          } @else if (header.column.getIsSorted() === 'desc') {
                            <span>↓</span>
                          }
                        </div>
                      }
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
                    class="p-2 align-middle"
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
                        <span>{{ cell.getValue() }}</span>
                        <span class="ml-1 text-muted-foreground">
                          ({{ row.subRows.length }})
                        </span>
                      </button>
                    } @else if (cell.getIsAggregated()) {
                      <span class="text-muted-foreground">
                        @if (cell.column.id === 'storageUsed') {
                          Avg:
                          {{ formatNumber(asNumber(cell.getValue())) }}
                          MB
                        } @else if (cell.column.id === 'apiCalls') {
                          Total:
                          {{ formatNumber(asNumber(cell.getValue())) }}
                        } @else {
                          {{ cell.getValue() }}
                        }
                      </span>
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
                      } @else if (cell.column.id === 'role') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-purple-100]="cell.getValue() === 'admin'"
                          [class.text-purple-800]="cell.getValue() === 'admin'"
                          [class.bg-blue-100]="cell.getValue() === 'editor'"
                          [class.text-blue-800]="cell.getValue() === 'editor'"
                          [class.bg-gray-100]="cell.getValue() === 'viewer'"
                          [class.text-gray-800]="cell.getValue() === 'viewer'"
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'plan') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-gray-100]="cell.getValue() === 'free'"
                          [class.text-gray-700]="cell.getValue() === 'free'"
                          [class.bg-blue-100]="cell.getValue() === 'pro'"
                          [class.text-blue-700]="cell.getValue() === 'pro'"
                          [class.bg-amber-100]="
                            cell.getValue() === 'enterprise'
                          "
                          [class.text-amber-700]="
                            cell.getValue() === 'enterprise'
                          "
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'status') {
                        <span
                          class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          [class.bg-green-100]="cell.getValue() === 'active'"
                          [class.text-green-800]="cell.getValue() === 'active'"
                          [class.bg-red-100]="cell.getValue() === 'inactive'"
                          [class.text-red-800]="cell.getValue() === 'inactive'"
                          [class.bg-yellow-100]="
                            cell.getValue() === 'suspended'
                          "
                          [class.text-yellow-800]="
                            cell.getValue() === 'suspended'
                          "
                        >
                          {{ cell.getValue() }}
                        </span>
                      } @else if (cell.column.id === 'storageUsed') {
                        <div class="flex items-center gap-2">
                          <div class="h-2 w-16 rounded-full bg-muted">
                            <div
                              class="h-2 rounded-full"
                              [class.bg-green-500]="
                                asNumber(cell.getValue()) < 2000
                              "
                              [class.bg-yellow-500]="
                                asNumber(cell.getValue()) >= 2000 &&
                                asNumber(cell.getValue()) < 5000
                              "
                              [class.bg-red-500]="
                                asNumber(cell.getValue()) >= 5000
                              "
                              [style.width.%]="
                                storagePercent(asNumber(cell.getValue()))
                              "
                            ></div>
                          </div>
                          <span class="text-sm">
                            {{ formatNumber(asNumber(cell.getValue())) }}
                          </span>
                        </div>
                      } @else if (cell.column.id === 'apiCalls') {
                        {{ formatNumber(asNumber(cell.getValue())) }}
                      } @else {
                        <span
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
                        >
                          {{ cell.getValue() }}
                        </span>
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
                        <span class="font-medium">Username:</span>
                        {{ row.original.username }}
                      </div>
                      <div>
                        <span class="font-medium">Full Name:</span>
                        {{ row.original.firstName }}
                        {{ row.original.lastName }}
                      </div>
                      <div>
                        <span class="font-medium">Email:</span>
                        {{ row.original.email }}
                      </div>
                      <div>
                        <span class="font-medium">Role:</span>
                        {{ row.original.role }}
                      </div>
                      <div>
                        <span class="font-medium">Plan:</span>
                        {{ row.original.plan }}
                      </div>
                      <div>
                        <span class="font-medium">Status:</span>
                        {{ row.original.status }}
                      </div>
                      <div>
                        <span class="font-medium">Joined:</span>
                        {{ row.original.joinedAt }}
                      </div>
                      <div>
                        <span class="font-medium">Last Login:</span>
                        {{ row.original.lastLoginAt }}
                      </div>
                      <div>
                        <span class="font-medium">Storage:</span>
                        {{ formatNumber(row.original.storageUsed) }} MB
                      </div>
                      <div>
                        <span class="font-medium">API Calls:</span>
                        {{ formatNumber(row.original.apiCalls) }}
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
            &laquo;
          </button>
          <button
            (click)="table.previousPage()"
            [disabled]="!table.getCanPreviousPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &lsaquo;
          </button>
          <button
            (click)="table.nextPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &rsaquo;
          </button>
          <button
            (click)="table.lastPage()"
            [disabled]="!table.getCanNextPage()"
            class="inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm disabled:pointer-events-none disabled:opacity-50 hover:bg-accent"
          >
            &raquo;
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
          (click)="toggleColumnPin('apiCalls', 'right')"
          class="inline-flex h-8 items-center rounded-md border px-3 text-xs font-medium transition-colors hover:bg-accent"
          [class.bg-primary]="columnPinning().right?.includes('apiCalls')"
          [class.text-primary-foreground]="
            columnPinning().right?.includes('apiCalls')
          "
        >
          Pin API Calls Right
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
  readonly pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  readonly expanded = signal<ExpandedState>({});
  readonly grouping = signal<GroupingState>([]);
  readonly columnPinning = signal<ColumnPinningState>({});
  readonly rowPinning = signal<RowPinningState>({ top: [], bottom: [] });
  readonly data = signal<User[]>(USERS);

  readonly editingCell = signal<{
    rowId: string;
    columnId: string;
  } | null>(null);
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
  getHeaderLabel(header: any): string {
    const headerDef = header.column.columnDef.header;
    if (typeof headerDef === 'string') return headerDef;
    return header.column.id;
  }

  asNumber(value: unknown): number {
    return Number(value) || 0;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  }

  storagePercent(value: number): number {
    return Math.min((value / 10000) * 100, 100);
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
        return {
          ...prev,
          [position]: pinned.filter((id) => id !== columnId),
        };
      }
      return { ...prev, [position]: [...pinned, columnId] };
    });
  }

  resetColumnPinning(): void {
    this.columnPinning.set({});
  }

  canEditColumn(columnId: string): boolean {
    return columnId === 'username';
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

  saveEdit(row: User, columnId: string): void {
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
}
