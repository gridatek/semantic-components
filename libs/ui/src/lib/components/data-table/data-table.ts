import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ColumnDef,
  FlexRenderDirective,
  PaginationState,
  SortingState,
  Table,
  createAngularTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'User';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

@Component({
  selector: 'sc-data-table',
  imports: [CommonModule, FlexRenderDirective, FormsModule],
  template: `
    <div class="w-full bg-white">
      <!-- Header with Search -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Users</h2>
          <p class="text-sm text-gray-500">Manage your team members and their permissions</p>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              class="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            class="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            [(ngModel)]="globalFilter"
            (input)="onGlobalFilterChange($event)"
            type="text"
            placeholder="Search users..."
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                *ngFor="let header of table.getHeaderGroups()[0].headers; trackBy: trackByHeaderId"
                [class.select-none]="header.column.getCanSort()"
                (click)="
                  header.column.getCanSort() && header.column.getToggleSortingHandler()?.($event)
                "
              >
                <div class="flex items-center space-x-2">
                  <ng-container
                    *flexRender="header.column.columnDef.header; props: header.getContext()"
                  ></ng-container>
                  <div class="flex flex-col" *ngIf="header.column.getCanSort()">
                    <svg
                      class="w-3 h-3 text-gray-400"
                      [class.text-gray-600]="header.column.getIsSorted() === 'asc'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="w-3 h-3 text-gray-400 -mt-1"
                      [class.text-gray-600]="header.column.getIsSorted() === 'desc'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              class="hover:bg-gray-50 transition-colors"
              *ngFor="let row of table.getRowModel().rows; trackBy: trackByRowId"
            >
              <td
                class="px-6 py-4 whitespace-nowrap"
                *ngFor="let cell of row.getVisibleCells(); trackBy: trackByCellId"
              >
                <ng-container
                  *flexRender="cell.column.columnDef.cell; props: cell.getContext()"
                ></ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center text-sm text-gray-700">
          <span>
            Showing
            {{
              table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
            }}
            to {{ getEndIndex() }} of {{ table.getFilteredRowModel().rows.length }} results
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            [disabled]="!table.getCanPreviousPage()"
            (click)="table.previousPage()"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div class="flex items-center space-x-1">
            <button
              class="inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              *ngFor="let page of getPageNumbers(); trackBy: trackByPageNumber"
              [class.bg-blue-600]="page - 1 === table.getState().pagination.pageIndex"
              [class.text-white]="page - 1 === table.getState().pagination.pageIndex"
              [class.bg-white]="page - 1 !== table.getState().pagination.pageIndex"
              [class.text-gray-700]="page - 1 !== table.getState().pagination.pageIndex"
              (click)="table.setPageIndex(page - 1)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            [disabled]="!table.getCanNextPage()"
            (click)="table.nextPage()"
          >
            Next
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDataTable implements OnInit {
  data = signal<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-14',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2024-01-10',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-16',
    },
    {
      id: 5,
      name: 'Tom Brown',
      email: 'tom@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-13',
    },
    {
      id: 6,
      name: 'Lisa Davis',
      email: 'lisa@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2024-01-08',
    },
    {
      id: 7,
      name: 'David Lee',
      email: 'david@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-17',
    },
    {
      id: 8,
      name: 'Emma Taylor',
      email: 'emma@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-12',
    },
    {
      id: 9,
      name: 'Chris Anderson',
      email: 'chris@example.com',
      role: 'Editor',
      status: 'Active',
      lastLogin: '2024-01-11',
    },
    {
      id: 10,
      name: 'Alex Martinez',
      email: 'alex@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-01-09',
    },
  ]);

  globalFilter = '';

  sorting = signal<SortingState>([]);
  pagination = signal<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => `#${info.getValue()}`,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (info) => {
        const role = info.getValue() as string;
        const roleClasses = {
          Admin: 'bg-red-100 text-red-800 border-red-200',
          Editor: 'bg-blue-100 text-blue-800 border-blue-200',
          User: 'bg-gray-100 text-gray-800 border-gray-200',
        };
        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleClasses[role as keyof typeof roleClasses]}">${role}</span>`;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() as string;
        const isActive = status === 'Active';
        const dotClass = isActive ? 'bg-green-400' : 'bg-gray-400';
        const textClass = isActive ? 'text-green-800' : 'text-gray-600';
        return `<div class="flex items-center"><div class="w-2 h-2 rounded-full mr-2 ${dotClass}"></div><span class="${textClass}">${status}</span></div>`;
      },
      enableSorting: true,
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        return date.toLocaleDateString();
      },
      enableSorting: true,
    },
  ];

  table: Table<User> = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      globalFilter: this.globalFilter,
      pagination: this.pagination(),
    },
    onSortingChange: (updaterOrValue) => {
      this.sorting.set(
        typeof updaterOrValue === 'function' ? updaterOrValue(this.sorting()) : updaterOrValue,
      );
    },
    onPaginationChange: (updaterOrValue) => {
      this.pagination.set(
        typeof updaterOrValue === 'function' ? updaterOrValue(this.pagination()) : updaterOrValue,
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  }));

  ngOnInit() {}

  onGlobalFilterChange(event: any) {
    this.globalFilter = event.target.value;
  }

  getPageNumbers(): number[] {
    const pageCount = this.table.getPageCount();
    const currentPage = this.table.getState().pagination.pageIndex;
    const pages: number[] = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(pageCount, currentPage + 3);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getEndIndex(): number {
    const state = this.table.getState().pagination;
    const endIndex = (state.pageIndex + 1) * state.pageSize;
    const totalRows = this.table.getFilteredRowModel().rows.length;
    return Math.min(endIndex, totalRows);
  }

  // TrackBy functions for performance
  trackByHeaderId(index: number, header: any): string {
    return header.id;
  }

  trackByRowId(index: number, row: any): string {
    return row.id;
  }

  trackByCellId(index: number, cell: any): string {
    return cell.id;
  }

  trackByPageNumber(index: number, page: number): number {
    return page;
  }
}
