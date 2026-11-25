import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiCircleAlertIcon,
  SiLoaderCircleIcon,
  SiTableIcon,
} from '@semantic-icons/lucide-icons';

const TABLES = ['users', 'orders', 'archive'];

const COLUMNS: Record<string, string[]> = {
  users: ['id', 'email', 'created_at'],
  orders: ['id', 'user_id', 'total', 'status'],
  archive: ['id', 'archived_at'],
};

/** Children loaded the first time a branch opens: busy while they come; archive fails once — open it again to retry. */
@Component({
  selector: 'app-lazy-tree-next-demo',
  imports: [
    ScFrame,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
    SiCircleAlertIcon,
    SiLoaderCircleIcon,
    SiTableIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <div scFrame class="w-64 p-2">
        <ul
          scTreeNext
          aria-label="Database tables"
          [expanded]="expanded()"
          (expandedChange)="open($event)"
        >
          @for (table of tables; track table) {
            <li
              scTreeNextItem
              [value]="table"
              [loading]="loading().includes(table)"
              [failed]="failed().includes(table)"
            >
              <div scTreeNextItemLabel>
                <span scTreeNextItemIndicator>
                  @if (loading().includes(table)) {
                    <svg siLoaderCircleIcon class="animate-spin"></svg>
                  } @else {
                    <svg siChevronRightIcon></svg>
                  }
                </span>
                <svg siTableIcon></svg>
                {{ table }}
                @if (failed().includes(table)) {
                  <svg siCircleAlertIcon class="text-destructive ms-auto"></svg>
                  <span class="sr-only">(failed to load)</span>
                }
              </div>
              <ul scTreeNextGroup>
                <ng-template scTreeNextGroupContent>
                  @for (column of columns()[table] ?? []; track column) {
                    <li scTreeNextItem [value]="table + '.' + column">
                      <div scTreeNextItemLabel>
                        <span scTreeNextItemIndicator>
                          <svg siChevronRightIcon></svg>
                        </span>
                        {{ column }}
                      </div>
                    </li>
                  }
                </ng-template>
              </ul>
            </li>
          }
        </ul>
      </div>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        {{ status() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LazyTreeNextDemo {
  private readonly tables = TABLES;
  private readonly expanded = signal<string[]>([]);
  private readonly columns = signal<Record<string, string[]>>({});
  private readonly loading = signal<string[]>([]);
  private readonly failed = signal<string[]>([]);
  private readonly status = signal('');
  private archiveTries = 0;

  /** A branch opened for the first time: its children loaded (a server, here a timer). */
  private open(expanded: string[]): void {
    const opened = expanded.filter((t) => !this.expanded().includes(t));
    this.expanded.set(expanded);
    for (const table of opened) {
      if (this.columns()[table] || this.loading().includes(table)) continue;
      this.loading.update((l) => [...l, table]);
      this.failed.update((f) => f.filter((t) => t !== table));
      this.status.set(`Loading ${table}…`);
      setTimeout(() => this.loaded(table), 800);
    }
  }

  private loaded(table: string): void {
    this.loading.update((l) => l.filter((t) => t !== table));
    if (table === 'archive' && this.archiveTries++ === 0) {
      // It failed: closed, marked; opening it again retries.
      this.failed.update((f) => [...f, table]);
      this.expanded.update((e) => e.filter((t) => t !== table));
      this.status.set(`${table} failed to load. Open it again to retry.`);
      return;
    }
    this.columns.update((c) => ({ ...c, [table]: COLUMNS[table] }));
    this.status.set(`${table}: ${COLUMNS[table].length} columns`);
  }
}
