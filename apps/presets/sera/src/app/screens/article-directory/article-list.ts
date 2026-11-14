import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScProgress,
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
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { type Status, articlesOf } from './articles-data';

const BADGE_VARIANT = {
  'in-revision': 'outline',
  'final-edit': 'default',
  drafting: 'ghost',
  published: 'secondary',
} as const;

const DOT_CLASS: Record<Status, string> = {
  'in-revision': 'bg-amber-600/80',
  'final-edit': 'bg-foreground/90',
  drafting: 'bg-muted-foreground/60',
  published: 'bg-emerald-600/80',
};

/**
 * The articles: a search, a table (status badges, progress), pages. shadcn's
 * three static pages are our Pagination's own: 24 articles, 8 a page.
 */
@Component({
  selector: 'app-article-list',
  imports: [
    RouterLink,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScProgress,
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
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiSearchIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <div scInputGroup>
          <div scInputGroupAddon>
            <svg siSearchIcon></svg>
          </div>
          <input
            scInput
            type="search"
            placeholder="Search articles..."
            aria-label="Search articles"
          />
        </div>
      </div>
      <div scCardBody>
        <div scTableContainer tabindex="0" role="region" aria-label="Articles">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow class="hover:bg-transparent">
                <th scTableHeaderCell>Title</th>
                <th scTableHeaderCell class="w-[170px]">Author</th>
                <th scTableHeaderCell class="w-[150px]">Issue</th>
                <th scTableHeaderCell class="w-[180px]">Status</th>
                <th scTableHeaderCell class="w-[140px]">Progress</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of articles(); track row.id) {
                <tr scTableRow>
                  <td scTableCell>
                    <div class="flex flex-col gap-1">
                      <a
                        class="font-heading text-foreground text-xl tracking-tight underline-offset-4 hover:underline"
                        [routerLink]="['/articles', row.id]"
                      >
                        {{ row.title }}
                      </a>
                      <p class="text-muted-foreground text-xs">
                        {{ row.wordProgress }}
                      </p>
                    </div>
                  </td>
                  <td scTableCell>{{ row.author }}</td>
                  <td scTableCell>{{ row.issue }}</td>
                  <td scTableCell>
                    <span scBadge [variant]="badgeVariant[row.status]">
                      <span [class]="dot(row.status)"></span>
                      {{ row.statusLabel }}
                    </span>
                  </td>
                  <td scTableCell>
                    <div
                      scProgress
                      [value]="row.progress"
                      [attr.aria-label]="row.progress + '% complete'"
                      class="flex flex-row-reverse items-center **:data-[slot=progress-track]:w-16"
                    >
                      <span scProgressValueText>{{ row.progress }}%</span>
                      <div scProgressTrack><div scProgressRange></div></div>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div scCardFooter>
        <nav
          scPagination
          aria-label="Article pages"
          #pagination="scPagination"
          [totalItems]="24"
          [pageSize]="8"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious size="icon-sm">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Previous page</span>
              </button>
            </li>
            @for (item of pagination.pages(); track item.value) {
              @if (item.type === 'page') {
                <li scPaginationItem>
                  <button scPaginationLink size="icon-sm" [page]="item.value">
                    {{ item.value }}
                  </button>
                </li>
              }
            }
            <li scPaginationItem>
              <button scPaginationNext size="icon-sm">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Next page</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleList {
  /** An issue's id: its articles only; all of them without one. */
  readonly issue = input<string | null>(null);
  protected readonly articles = computed(() => articlesOf(this.issue()));
  protected readonly badgeVariant = BADGE_VARIANT;

  protected dot(status: Status): string {
    return cn('size-1.5 rounded-full', DOT_CLASS[status]);
  }
}
