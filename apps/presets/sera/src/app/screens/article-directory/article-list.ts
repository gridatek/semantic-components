import { Component, ViewEncapsulation } from '@angular/core';
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

type Status = 'in-revision' | 'final-edit' | 'drafting' | 'published';

interface Article {
  title: string;
  wordProgress: string;
  author: string;
  issue: string;
  status: Status;
  statusLabel: string;
  progress: number;
}

const ARTICLES: Article[] = [
  {
    title: 'The Future of Sustainable Architecture',
    wordProgress: '1.4k / 2.6k words',
    author: 'Elena Rostova',
    issue: 'Summer 2024',
    status: 'in-revision',
    statusLabel: 'In revision',
    progress: 45,
  },
  {
    title: "Brutalism's Second Act",
    wordProgress: '2.1k / 2.5k words',
    author: 'Marcus Chen',
    issue: 'Summer 2024',
    status: 'final-edit',
    statusLabel: 'Final edit',
    progress: 90,
  },
  {
    title: 'The Typography of Public Spaces',
    wordProgress: '0.5k / 1.5k words',
    author: 'Sarah Jenkins',
    issue: 'Autumn 2024',
    status: 'drafting',
    statusLabel: 'Drafting',
    progress: 20,
  },
  {
    title: 'Rethinking Urban Canopies',
    wordProgress: '1.8k / 1.8k words',
    author: "David O'Connor",
    issue: 'Summer 2024',
    status: 'published',
    statusLabel: 'Published',
    progress: 100,
  },
  {
    title: 'Light, Glass, and the Modern Museum',
    wordProgress: '1.2k / 2.0k words',
    author: 'Amara Osei',
    issue: 'Autumn 2024',
    status: 'in-revision',
    statusLabel: 'In revision',
    progress: 55,
  },
  {
    title: 'Concrete Utopias: Housing in the 21st Century',
    wordProgress: '3.0k / 3.0k words',
    author: 'Tomás Herrera',
    issue: 'Summer 2024',
    status: 'published',
    statusLabel: 'Published',
    progress: 100,
  },
  {
    title: 'Designing for Silence',
    wordProgress: '0.8k / 2.2k words',
    author: 'Ingrid Solberg',
    issue: 'Winter 2024',
    status: 'drafting',
    statusLabel: 'Drafting',
    progress: 30,
  },
  {
    title: 'The Invisible Infrastructure of Cities',
    wordProgress: '2.4k / 2.8k words',
    author: 'James Whitfield',
    issue: 'Autumn 2024',
    status: 'final-edit',
    statusLabel: 'Final edit',
    progress: 85,
  },
];

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
              @for (row of articles; track row.title) {
                <tr scTableRow>
                  <td scTableCell>
                    <div class="flex flex-col gap-1">
                      <p
                        class="font-heading text-foreground text-xl tracking-tight"
                      >
                        {{ row.title }}
                      </p>
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
  protected readonly articles = ARTICLES;
  protected readonly badgeVariant = BADGE_VARIANT;

  protected dot(status: Status): string {
    return cn('size-1.5 rounded-full', DOT_CLASS[status]);
  }
}
