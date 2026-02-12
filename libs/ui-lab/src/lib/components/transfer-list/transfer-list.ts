import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import type { TransferListItem } from './transfer-list-types';

@Component({
  selector: 'sc-transfer-list',
  imports: [],
  template: `
    <div [class]="containerClass()">
      <!-- Source List -->
      <div [class]="listContainerClass()">
        <div [class]="listHeaderClass()">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300"
              [checked]="allSourceSelected()"
              [indeterminate]="someSourceSelected()"
              (change)="toggleAllSource()"
            />
            <span class="font-medium">{{ sourceTitle() }}</span>
          </label>
          <span class="text-xs text-muted-foreground">
            {{ selectedSourceIds().size }}/{{ sourceItems().length }}
          </span>
        </div>

        @if (searchable()) {
          <div class="p-2 border-b">
            <input
              type="text"
              class="w-full h-8 px-2 text-sm border rounded-md bg-background"
              placeholder="Search..."
              [value]="sourceSearch()"
              (input)="sourceSearch.set($any($event.target).value)"
            />
          </div>
        }

        <div [class]="listClass()">
          @for (item of filteredSourceItems(); track item.id) {
            <label [class]="itemClass(item, selectedSourceIds().has(item.id))">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300"
                [checked]="selectedSourceIds().has(item.id)"
                [disabled]="item.disabled"
                (change)="toggleSourceItem(item)"
              />
              <div class="flex-1 min-w-0">
                <div class="truncate">{{ item.label }}</div>
                @if (item.description) {
                  <div class="text-xs text-muted-foreground truncate">
                    {{ item.description }}
                  </div>
                }
              </div>
            </label>
          }
          @if (filteredSourceItems().length === 0) {
            <div class="p-4 text-center text-sm text-muted-foreground">
              No items
            </div>
          }
        </div>
      </div>

      <!-- Transfer Buttons -->
      <div class="flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          [class]="buttonClass()"
          [disabled]="selectedSourceIds().size === 0"
          (click)="moveToTarget()"
          aria-label="Move selected to right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
        <button
          type="button"
          [class]="buttonClass()"
          [disabled]="selectedTargetIds().size === 0"
          (click)="moveToSource()"
          aria-label="Move selected to left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          [class]="buttonClass()"
          [disabled]="sourceItems().length === 0"
          (click)="moveAllToTarget()"
          aria-label="Move all to right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
          </svg>
        </button>
        <button
          type="button"
          [class]="buttonClass()"
          [disabled]="targetItems().length === 0"
          (click)="moveAllToSource()"
          aria-label="Move all to left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m18 17-5-5 5-5" />
            <path d="m11 17-5-5 5-5" />
          </svg>
        </button>
      </div>

      <!-- Target List -->
      <div [class]="listContainerClass()">
        <div [class]="listHeaderClass()">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300"
              [checked]="allTargetSelected()"
              [indeterminate]="someTargetSelected()"
              (change)="toggleAllTarget()"
            />
            <span class="font-medium">{{ targetTitle() }}</span>
          </label>
          <span class="text-xs text-muted-foreground">
            {{ selectedTargetIds().size }}/{{ targetItems().length }}
          </span>
        </div>

        @if (searchable()) {
          <div class="p-2 border-b">
            <input
              type="text"
              class="w-full h-8 px-2 text-sm border rounded-md bg-background"
              placeholder="Search..."
              [value]="targetSearch()"
              (input)="targetSearch.set($any($event.target).value)"
            />
          </div>
        }

        <div [class]="listClass()">
          @for (item of filteredTargetItems(); track item.id) {
            <label [class]="itemClass(item, selectedTargetIds().has(item.id))">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300"
                [checked]="selectedTargetIds().has(item.id)"
                [disabled]="item.disabled"
                (change)="toggleTargetItem(item)"
              />
              <div class="flex-1 min-w-0">
                <div class="truncate">{{ item.label }}</div>
                @if (item.description) {
                  <div class="text-xs text-muted-foreground truncate">
                    {{ item.description }}
                  </div>
                }
              </div>
            </label>
          }
          @if (filteredTargetItems().length === 0) {
            <div class="p-4 text-center text-sm text-muted-foreground">
              No items
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTransferList {
  readonly sourceItems = model<TransferListItem[]>([]);
  readonly targetItems = model<TransferListItem[]>([]);
  readonly sourceTitle = input('Available');
  readonly targetTitle = input('Selected');
  readonly searchable = input(true);
  readonly height = input<string>('300px');
  readonly class = input<string>('');

  readonly change = output<{
    source: TransferListItem[];
    target: TransferListItem[];
  }>();

  protected readonly selectedSourceIds = signal<Set<string>>(new Set());
  protected readonly selectedTargetIds = signal<Set<string>>(new Set());
  protected readonly sourceSearch = signal('');
  protected readonly targetSearch = signal('');

  protected readonly filteredSourceItems = computed(() => {
    const search = this.sourceSearch().toLowerCase();
    if (!search) return this.sourceItems();
    return this.sourceItems().filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search),
    );
  });

  protected readonly filteredTargetItems = computed(() => {
    const search = this.targetSearch().toLowerCase();
    if (!search) return this.targetItems();
    return this.targetItems().filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search),
    );
  });

  protected readonly allSourceSelected = computed(() => {
    const items = this.sourceItems().filter((i) => !i.disabled);
    return (
      items.length > 0 && items.every((i) => this.selectedSourceIds().has(i.id))
    );
  });

  protected readonly someSourceSelected = computed(() => {
    const items = this.sourceItems().filter((i) => !i.disabled);
    const selected = items.filter((i) => this.selectedSourceIds().has(i.id));
    return selected.length > 0 && selected.length < items.length;
  });

  protected readonly allTargetSelected = computed(() => {
    const items = this.targetItems().filter((i) => !i.disabled);
    return (
      items.length > 0 && items.every((i) => this.selectedTargetIds().has(i.id))
    );
  });

  protected readonly someTargetSelected = computed(() => {
    const items = this.targetItems().filter((i) => !i.disabled);
    const selected = items.filter((i) => this.selectedTargetIds().has(i.id));
    return selected.length > 0 && selected.length < items.length;
  });

  protected readonly containerClass = computed(() =>
    cn('grid grid-cols-[1fr_auto_1fr] gap-4', this.class()),
  );

  protected readonly listContainerClass = computed(() =>
    cn('flex flex-col border rounded-lg overflow-hidden bg-card'),
  );

  protected readonly listHeaderClass = computed(() =>
    cn('flex items-center justify-between px-3 py-2 border-b bg-muted/50'),
  );

  protected readonly listClass = computed(() =>
    cn('flex-1 overflow-auto', `max-h-[${this.height()}]`),
  );

  protected itemClass(item: TransferListItem, selected: boolean): string {
    return cn(
      'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors',
      'hover:bg-accent',
      selected && 'bg-accent/50',
      item.disabled && 'opacity-50 cursor-not-allowed',
    );
  }

  protected readonly buttonClass = computed(() =>
    cn(
      'inline-flex items-center justify-center w-9 h-9',
      'rounded-md border bg-background text-foreground',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-colors',
    ),
  );

  toggleSourceItem(item: TransferListItem): void {
    if (item.disabled) return;
    this.selectedSourceIds.update((ids) => {
      const newIds = new Set(ids);
      if (newIds.has(item.id)) {
        newIds.delete(item.id);
      } else {
        newIds.add(item.id);
      }
      return newIds;
    });
  }

  toggleTargetItem(item: TransferListItem): void {
    if (item.disabled) return;
    this.selectedTargetIds.update((ids) => {
      const newIds = new Set(ids);
      if (newIds.has(item.id)) {
        newIds.delete(item.id);
      } else {
        newIds.add(item.id);
      }
      return newIds;
    });
  }

  toggleAllSource(): void {
    const items = this.sourceItems().filter((i) => !i.disabled);
    if (this.allSourceSelected()) {
      this.selectedSourceIds.set(new Set());
    } else {
      this.selectedSourceIds.set(new Set(items.map((i) => i.id)));
    }
  }

  toggleAllTarget(): void {
    const items = this.targetItems().filter((i) => !i.disabled);
    if (this.allTargetSelected()) {
      this.selectedTargetIds.set(new Set());
    } else {
      this.selectedTargetIds.set(new Set(items.map((i) => i.id)));
    }
  }

  moveToTarget(): void {
    const selectedIds = this.selectedSourceIds();
    const toMove = this.sourceItems().filter(
      (i) => selectedIds.has(i.id) && !i.disabled,
    );
    const remaining = this.sourceItems().filter(
      (i) => !selectedIds.has(i.id) || i.disabled,
    );

    this.sourceItems.set(remaining);
    this.targetItems.update((items) => [...items, ...toMove]);
    this.selectedSourceIds.set(new Set());
    this.emitChange();
  }

  moveToSource(): void {
    const selectedIds = this.selectedTargetIds();
    const toMove = this.targetItems().filter(
      (i) => selectedIds.has(i.id) && !i.disabled,
    );
    const remaining = this.targetItems().filter(
      (i) => !selectedIds.has(i.id) || i.disabled,
    );

    this.targetItems.set(remaining);
    this.sourceItems.update((items) => [...items, ...toMove]);
    this.selectedTargetIds.set(new Set());
    this.emitChange();
  }

  moveAllToTarget(): void {
    const toMove = this.sourceItems().filter((i) => !i.disabled);
    const remaining = this.sourceItems().filter((i) => i.disabled);

    this.sourceItems.set(remaining);
    this.targetItems.update((items) => [...items, ...toMove]);
    this.selectedSourceIds.set(new Set());
    this.emitChange();
  }

  moveAllToSource(): void {
    const toMove = this.targetItems().filter((i) => !i.disabled);
    const remaining = this.targetItems().filter((i) => i.disabled);

    this.targetItems.set(remaining);
    this.sourceItems.update((items) => [...items, ...toMove]);
    this.selectedTargetIds.set(new Set());
    this.emitChange();
  }

  private emitChange(): void {
    this.change.emit({
      source: this.sourceItems(),
      target: this.targetItems(),
    });
  }
}
