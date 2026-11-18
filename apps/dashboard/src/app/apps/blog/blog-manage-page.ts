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
import { label } from '../../shared/labels';
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
  columnHelper.accessor('title', {
    header: $localize`:@@blog.manage.post:Post`,
  }),
  columnHelper.accessor('category', {
    header: $localize`:@@blog.manage.category:Category`,
  }),
  columnHelper.accessor('status', {
    header: $localize`:@@blog.manage.status:Status`,
  }),
  columnHelper.accessor('date', {
    header: $localize`:@@blog.manage.date:Date`,
  }),
  columnHelper.accessor('views', {
    header: $localize`:@@blog.manage.views:Views`,
  }),
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
      i18n-title="@@blog.manage.manageBlog"
      title="Manage Blog"
      [trail]="[{ label: t.blog, url: '/apps/blog/post' }, { label: t.manage }]"
    >
      <a scLink variant="button" routerLink="/apps/blog/create">
        <svg siPlusIcon></svg>
        <ng-container i18n="@@blog.manage.createPost">Create Post</ng-container>
      </a>
    </app-page-header>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <input
          i18n-aria-label="@@blog.manage.searchPosts"
          i18n-placeholder="@@blog.manage.searchPosts2"
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
                  <th
                    i18n="@@blog.manage.actions"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Actions
                  </th>
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
                    {{ labelOf(row.original.category) }}
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
                      >{{ labelOf(row.original.status) }}</span
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
                      <span i18n="@@blog.manage.view" class="sr-only"
                        >View {{ row.original.title }}</span
                      >
                    </a>
                    <a
                      scLink
                      variant="ghost"
                      size="icon-sm"
                      [routerLink]="['/apps/blog/edit', row.original.id]"
                    >
                      <svg siPencilIcon></svg>
                      <span i18n="@@blog.manage.edit" class="sr-only"
                        >Edit {{ row.original.title }}</span
                      >
                    </a>
                    <button
                      scButton
                      variant="ghost"
                      size="icon-sm"
                      (click)="remove(row.original)"
                    >
                      <svg siTrash2Icon></svg>
                      <span i18n="@@blog.manage.delete" class="sr-only"
                        >Delete {{ row.original.title }}</span
                      >
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n="@@blog.manage.noPostsMatch"
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
          i18n-aria-label="@@blog.manage.postPages"
          scPagination
          scDataTablePagination
          #pagination="scPagination"
          [table]="table"
          aria-label="Post pages"
          class="mx-0 w-auto items-center justify-end gap-4"
        >
          <span
            i18n="@@blog.manage.pageOf"
            class="text-sm font-medium"
            aria-live="polite"
          >
            Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}
          </span>
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious variant="outline" size="icon-sm">
                <svg siChevronLeftIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@blog.manage.goToPreviousPage" class="sr-only"
                  >Go to previous page</span
                >
              </button>
            </li>
            <li scPaginationItem>
              <button scPaginationNext variant="outline" size="icon-sm">
                <svg siChevronRightIcon class="rtl:-scale-x-100"></svg>
                <span i18n="@@blog.manage.goToNextPage" class="sr-only"
                  >Go to next page</span
                >
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
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    blog: $localize`:@@blog.manage.blog:Blog`,
    manage: $localize`:@@blog.manage.manage:Manage`,
  };

  private readonly store = inject(BlogStore);
  private readonly toaster = inject(ScToaster);

  private readonly table = injectTable(() => ({
    features,
    columns,
    data: [...this.store.posts()],
    getRowId: (post) => post.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
  }));

  private readonly dayOf = day;
  private readonly countOf = count;

  private remove(post: BlogPost): void {
    this.store.remove(post.id);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@blog.manage.postDeleted:Post deleted`,
      description: post.title,
    });
  }
}
