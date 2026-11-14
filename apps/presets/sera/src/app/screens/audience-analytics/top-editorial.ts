import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
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
  ScToaster,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiEllipsisIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';
import { ArticleStore } from '../article-directory/article-store';
import { type Article } from '../article-directory/articles-data';
import { type Metric, compact, duration, ranked } from './readership';

/**
 * The most read articles, by views, read time or shares: five, then all after
 * "Load more" (2 s). Their menu edits, unpublishes or deletes them — the
 * store's, so the directory follows.
 */
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
            (valueChange)="keepOne($event)"
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
                <th scTableHeaderCell>Shares</th>
                <th scTableHeaderCell class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of rows(); track row.id; let index = $index) {
                <tr scTableRow>
                  <td scTableCell class="translate-y-1 align-text-top">
                    {{ index + 1 }}
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
                  <td scTableCell>{{ row.readership?.published }}</td>
                  <td scTableCell>
                    {{ count(row.readership?.pageviews ?? 0) }}
                  </td>
                  <td scTableCell>
                    {{ time(row.readership?.readSeconds ?? 0) }}
                  </td>
                  <td scTableCell>{{ count(row.readership?.shares ?? 0) }}</td>
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
                        <div scMenu (itemSelected)="act($event, row)">
                          <ng-template scMenuContent>
                            <div scMenuItem value="edit">Edit</div>
                            <div scMenuItem value="unpublish">Unpublish</div>
                            <div
                              scMenuItem
                              value="delete"
                              variant="destructive"
                            >
                              Delete
                            </div>
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
  private readonly store = inject(ArticleStore);
  private readonly toaster = inject(ScToaster);
  private readonly router = inject(Router);

  protected readonly metric = signal<string[]>(['views']);
  private readonly visible = signal(5);
  protected readonly loading = signal(false);

  private readonly ranked = computed(() =>
    ranked(this.store.read(), (this.metric()[0] ?? 'views') as Metric),
  );
  protected readonly rows = computed(() =>
    this.ranked().slice(0, this.visible()),
  );
  protected readonly hasMore = computed(
    () => this.visible() < this.ranked().length,
  );

  private readonly count = compact;
  private readonly time = duration;

  /** All of them, after a pretend fetch — as shadcn's. */
  protected loadMore(): void {
    if (!this.hasMore() || this.loading()) return;
    this.loading.set(true);
    setTimeout(() => {
      this.visible.set(this.ranked().length);
      this.loading.set(false);
    }, 2000);
  }

  /** One metric is always on: pressing the current one again keeps it. */
  private keepOne(values: string[]): void {
    if (!values.length) this.metric.set(['views']);
  }

  private act(action: unknown, article: Article): void {
    if (action === 'edit') {
      void this.router.navigate(['/articles', article.id]);
    } else if (action === 'unpublish') {
      this.store.setStatus(article.id, 'final-edit');
      this.toaster.show({
        title: 'Unpublished',
        description: `“${article.title}” is back in final edit.`,
        action: {
          label: 'Undo',
          onClick: () => this.store.setStatus(article.id, 'published'),
        },
      });
    } else if (action === 'delete') {
      const restore = this.store.remove(article.id);
      this.toaster.show({
        title: 'Article deleted',
        description: `“${article.title}”`,
        action: { label: 'Undo', onClick: restore },
      });
    }
  }
}
