import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScSpinner,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiEllipsisIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

interface Editorial {
  rank: number;
  title: string;
  author: string;
  published: string;
  pageviews: string;
  avgTime: string;
}

const EDITORIALS: Editorial[] = [
  {
    rank: 1,
    title: 'The New Vanguard of Minimalist Architecture',
    author: 'Elena Rostova',
    published: 'Oct 12',
    pageviews: '45.2k',
    avgTime: '04:15',
  },
  {
    rank: 2,
    title: 'Autumn Sartorial Code: Deconstructed Classics',
    author: 'Julian Vance',
    published: 'Oct 05',
    pageviews: '38.9k',
    avgTime: '03:42',
  },
  {
    rank: 3,
    title: 'Interview: Director Sofia Coppola on The Aesthetics of Isolation',
    author: 'Marcus Trent',
    published: 'Sep 28',
    pageviews: '31.4k',
    avgTime: '06:20',
  },
  {
    rank: 4,
    title: "Sourcing Ceramics from Kyoto's Oldest Kilns",
    author: 'Sarah Lin',
    published: 'Oct 18',
    pageviews: '22.1k',
    avgTime: '02:55',
  },
  {
    rank: 5,
    title: 'Field Notes from Copenhagen Design Week',
    author: 'Noah Bennett',
    published: 'Oct 21',
    pageviews: '19.7k',
    avgTime: '03:18',
  },
  {
    rank: 6,
    title: "A Studio Visit with Milan's Most Elusive Lighting Designer",
    author: 'Claire Duval',
    published: 'Oct 09',
    pageviews: '17.4k',
    avgTime: '04:02',
  },
  {
    rank: 7,
    title: 'Collecting the New Avant-Garde in Contemporary Furniture',
    author: 'Tommy Rhodes',
    published: 'Sep 30',
    pageviews: '15.9k',
    avgTime: '03:36',
  },
  {
    rank: 8,
    title: "Inside Lisbon's Quiet Culinary Renaissance",
    author: 'Amara Iqbal',
    published: 'Oct 14',
    pageviews: '14.2k',
    avgTime: '05:08',
  },
  {
    rank: 9,
    title: 'Why Slow Interiors Are Defining the Next Luxury Wave',
    author: 'Henry Vale',
    published: 'Oct 03',
    pageviews: '12.7k',
    avgTime: '03:11',
  },
  {
    rank: 10,
    title: 'The Return of Print: Independent Magazine Covers to Watch',
    author: 'Mina Okafor',
    published: 'Sep 26',
    pageviews: '11.3k',
    avgTime: '02:49',
  },
];

/** The most read articles: five, then all ten after "Load more" (2 s). */
@Component({
  selector: 'app-top-editorial',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScSpinner,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScToggleGroup,
    ScToggleGroupItem,
    SiArrowDownIcon,
    SiEllipsisIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <div class="flex flex-col gap-(--gap) sm:flex-row">
          <div class="flex flex-col gap-1.5">
            <h2 scCardTitle class="text-2xl">Top Editorials</h2>
            <p scCardDescription>Ranked by engagement</p>
          </div>
          <div
            scToggleGroup
            variant="outline"
            aria-label="Top editorials metric selector"
            class="w-full sm:ms-auto sm:w-fit"
            [(value)]="metric"
          >
            <button scToggleGroupItem value="views" class="flex-1">
              Views
            </button>
            <button scToggleGroupItem value="time" class="flex-1">Time</button>
            <button scToggleGroupItem value="shares" class="flex-1">
              Shares
            </button>
          </div>
        </div>
      </div>
      <div scCardBody class="flex-1">
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Top editorials"
          class="overflow-y-hidden"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>#</th>
                <th scTableHeaderCell>Title</th>
                <th scTableHeaderCell>Published</th>
                <th scTableHeaderCell>Page Views</th>
                <th scTableHeaderCell>Read Time</th>
                <th scTableHeaderCell class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of rows(); track row.rank) {
                <tr scTableRow>
                  <td scTableCell class="translate-y-1 align-text-top">
                    {{ row.rank }}
                  </td>
                  <td scTableCell>
                    <div class="flex flex-col gap-2">
                      <p
                        class="font-heading text-foreground text-xl tracking-tight"
                      >
                        {{ row.title }}
                      </p>
                      <p
                        class="text-muted-foreground text-xs font-semibold tracking-wide uppercase"
                      >
                        By {{ row.author }}
                      </p>
                    </div>
                  </td>
                  <td scTableCell>{{ row.published }}</td>
                  <td scTableCell>{{ row.pageviews }}</td>
                  <td scTableCell>{{ row.avgTime }}</td>
                  <td scTableCell class="text-end">
                    <div scMenuProvider alignment="end">
                      <button
                        scButton
                        scMenuTrigger
                        variant="ghost"
                        size="icon-xs"
                      >
                        <svg siEllipsisIcon></svg>
                        <span class="sr-only"
                          >Open actions for {{ row.title }}</span
                        >
                      </button>
                      <ng-template scMenuPortal>
                        <div scMenu>
                          <ng-template scMenuContent>
                            <div scMenuItem>Edit</div>
                            <div scMenuItem>Publish</div>
                            <div scMenuItem variant="destructive">Delete</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div scCardFooter class="justify-center">
        @if (hasMore()) {
          <button
            scButton
            variant="outline"
            [disabled]="loading()"
            (click)="loadMore()"
          >
            Load more content
            @if (loading()) {
              <svg
                scSpinner
                siLoaderCircleIcon
                data-icon="inline-end"
                aria-label="Loading"
              ></svg>
            } @else {
              <svg siArrowDownIcon data-icon="inline-end"></svg>
            }
          </button>
        }
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class TopEditorial {
  protected readonly metric = signal(['views']);
  private readonly visible = signal(5);
  protected readonly loading = signal(false);
  protected readonly rows = computed(() => EDITORIALS.slice(0, this.visible()));
  protected readonly hasMore = computed(
    () => this.visible() < EDITORIALS.length,
  );

  /** All ten, after a pretend fetch — as shadcn's. */
  protected loadMore(): void {
    if (!this.hasMore() || this.loading()) return;
    this.loading.set(true);
    setTimeout(() => {
      this.visible.set(EDITORIALS.length);
      this.loading.set(false);
    }, 2000);
  }
}
