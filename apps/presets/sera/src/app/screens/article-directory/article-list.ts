import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
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
  ScLink,
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
import { ArticleStore } from './article-store';
import {
  STATUS_LABEL,
  type Status,
  issueLabel,
  progressOf,
  wordProgress,
} from './articles-data';

const PAGE_SIZE = 8;

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
 * The articles: a search (title, author), a table (status badges, progress),
 * 8 a page. An issue's only with `issue`.
 */
@Component({
  selector: 'app-article-list',
  imports: [
    FormField,
    RouterLink,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLink,
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
      <div scCardHeader class="gap-3">
        @if (issue(); as issue) {
          <p class="text-muted-foreground text-sm">
            {{ issueName(issue) }} only ·
            <a scLink routerLink="/articles">All issues</a>
          </p>
        }
        <div scInputGroup>
          <div scInputGroupAddon>
            <svg siSearchIcon></svg>
          </div>
          <input
            scInput
            type="search"
            placeholder="Search articles..."
            aria-label="Search articles"
            [formField]="search.query"
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
              @for (row of rows(); track row.id) {
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
                        {{ words(row) }}
                      </p>
                    </div>
                  </td>
                  <td scTableCell>{{ row.author }}</td>
                  <td scTableCell>{{ issueName(row.issue) }}</td>
                  <td scTableCell>
                    <span scBadge [variant]="badgeVariant[row.status]">
                      <span [class]="dot(row.status)"></span>
                      {{ statusLabel[row.status] }}
                    </span>
                  </td>
                  <td scTableCell>
                    <div
                      scProgress
                      [value]="progress(row)"
                      [attr.aria-label]="progress(row) + '% complete'"
                      class="flex flex-row-reverse items-center **:data-[slot=progress-track]:w-16"
                    >
                      <span scProgressValueText>{{ progress(row) }}%</span>
                      <div scProgressTrack><div scProgressRange></div></div>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow class="hover:bg-transparent">
                  <td
                    scTableCell
                    colspan="5"
                    class="text-muted-foreground py-10 text-center"
                  >
                    No articles match “{{ search.query().value() }}”.
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
          [totalItems]="matches().length"
          [pageSize]="pageSize"
          [(currentPage)]="page"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious>
                <svg siChevronLeftIcon data-icon="inline-start"></svg>
                Previous
              </button>
            </li>
            @for (item of pagination.pages(); track item.value) {
              @if (item.type === 'page') {
                <li scPaginationItem>
                  <button scPaginationLink [page]="item.value">
                    {{ item.value }}
                  </button>
                </li>
              }
            }
            <li scPaginationItem>
              <button scPaginationNext>
                Next
                <svg siChevronRightIcon data-icon="inline-end"></svg>
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
  private readonly store = inject(ArticleStore);

  /** An issue's id: its articles only; all of them without one. */
  readonly issue = input<string | null>(null);

  private readonly search = form(signal({ query: '' }));
  private readonly pageSize = PAGE_SIZE;
  private readonly badgeVariant = BADGE_VARIANT;
  private readonly statusLabel = STATUS_LABEL;

  /** The issue's articles whose title or author has the query. */
  private readonly matches = computed(() => {
    const query = this.search.query().value().trim().toLowerCase();
    return this.store
      .of(this.issue())
      .filter(
        (article) =>
          !query ||
          article.title.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query),
      );
  });

  /** Back to the first page when the search or the issue changes. */
  private readonly page = linkedSignal({
    source: () => [this.issue(), this.search.query().value()],
    computation: () => 1,
  });

  private readonly rows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.matches().slice(start, start + PAGE_SIZE);
  });

  private readonly issueName = issueLabel;
  private readonly words = wordProgress;
  private readonly progress = progressOf;

  private dot(status: Status): string {
    return cn('size-1.5 rounded-full', DOT_CLASS[status]);
  }
}
