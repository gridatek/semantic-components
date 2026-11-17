import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  globalFilteringFeature,
  injectTable,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from '@tanstack/angular-table';
import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScInput,
  ScLink,
  ScPagination,
  ScPaginationItem,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
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
  ScDataTableCell,
  ScDataTableGlobalFilter,
  ScDataTableHeaderCell,
  ScDataTablePagination,
  ScDataTableRow,
  ScDataTableSortButton,
} from '@semantic-components/ui/data-table';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsUpDownIcon,
  SiEyeIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import type { BlogPost } from '../../data/blog';
import { PageHeader } from '../../layout/page-header';
import { count, day } from '../../shared/format';
import { BlogStore } from '../../shared/stores';

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

const columnHelper = createColumnHelper<typeof features, BlogPost>();

const columns = columnHelper.columns([
  columnHelper.accessor('title', { header: 'Post' }),
  columnHelper.accessor('category', { header: 'Category' }),
  columnHelper.accessor('status', { header: 'Status' }),
  columnHelper.accessor('date', { header: 'Date' }),
  columnHelper.accessor('views', { header: 'Views' }),
]);

/** Manage Blog: every post, searchable and sortable, to view, edit or delete. */
@Component({
  selector: 'app-blog-manage-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScInput,
    ScLink,
    ScPagination,
    ScPaginationItem,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScDataTableCell,
    ScDataTableGlobalFilter,
    ScDataTableHeaderCell,
    ScDataTablePagination,
    ScDataTableRow,
    ScDataTableSortButton,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsUpDownIcon,
    SiEyeIcon,
    SiPencilIcon,
    SiPlusIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="Manage Blog"
      [trail]="[{ label: 'Blog', url: '/apps/blog/post' }, { label: 'Manage' }]"
    >
      <a scLink variant="button" routerLink="/apps/blog/create">
        <svg siPlusIcon></svg>
        Create Post
      </a>
    </app-page-header>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <input
          scInput
          scDataTableGlobalFilter
          [table]="table"
          type="search"
          placeholder="Search posts…"
          aria-label="Search posts"
          class="max-w-sm"
        />
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
                  <th scTableHeaderCell class="text-end">Actions</th>
                </tr>
              }
            </thead>
            <tbody scTableBody>
              @for (row of table.getRowModel().rows; track row.id) {
                <tr scTableRow scDataTableRow [row]="row">
                  <td scTableCell scDataTableCell>
                    <div class="flex items-center gap-3">
                      <span
                        class="bg-muted relative block h-10 w-16 shrink-0 overflow-hidden rounded-md"
                      >
                        <img
                          [ngSrc]="row.original.cover"
                          alt=""
                          fill
                          class="object-cover"
                        />
                      </span>
                      <span
                        class="line-clamp-2 max-w-xs font-medium whitespace-normal"
                      >
                        {{ row.original.title }}
                      </span>
                    </div>
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ row.original.category }}
                  </td>
                  <td scTableCell scDataTableCell>
                    <span
                      scBadge
                      [variant]="
                        row.original.status === 'published'
                          ? 'secondary'
                          : 'outline'
                      "
                      class="capitalize"
                      >{{ row.original.status }}</span
                    >
                  </td>
                  <td scTableCell scDataTableCell>
                    {{ dayOf(row.original.date) }}
                  </td>
                  <td scTableCell scDataTableCell class="tabular-nums">
                    {{ countOf(row.original.views) }}
                  </td>
                  <td scTableCell class="text-end whitespace-nowrap">
                    <a
                      scLink
                      variant="ghost"
                      size="icon-sm"
                      [routerLink]="['/apps/blog/detail', row.original.slug]"
                    >
                      <svg siEyeIcon></svg>
                      <span class="sr-only">View {{ row.original.title }}</span>
                    </a>
                    <a
                      scLink
                      variant="ghost"
                      size="icon-sm"
                      [routerLink]="['/apps/blog/edit', row.original.id]"
                    >
                      <svg siPencilIcon></svg>
                      <span class="sr-only">Edit {{ row.original.title }}</span>
                    </a>
                    <button
                      scButton
                      variant="ghost"
                      size="icon-sm"
                      (click)="remove(row.original)"
                    >
                      <svg siTrash2Icon></svg>
                      <span class="sr-only"
                        >Delete {{ row.original.title }}</span
                      >
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    scTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No posts match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <nav
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          aria-label="Post pages"
          class="mx-0 w-auto items-center justify-end gap-4"
        >
          <span class="text-sm font-medium" aria-live="polite">
            Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Go to previous page</span>
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Go to next page</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BlogManagePage {
  private readonly store = inject(BlogStore);
  private readonly toaster = inject(ScToaster);

  readonly table = injectTable(() => ({
    features,
    columns,
    data: [...this.store.posts()],
    getRowId: (post) => post.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
  }));

  protected readonly dayOf = day;
  protected readonly countOf = count;

  protected remove(post: BlogPost): void {
    this.store.remove(post.id);
    this.toaster.show({
      variant: 'success',
      title: 'Post deleted',
      description: post.title,
    });
  }
}
