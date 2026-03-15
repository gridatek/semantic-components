import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTransferListState } from './transfer-list-state';
import type { TransferListItem } from './transfer-list-types';

@Component({
  selector: 'div[scTransferListPanel]',
  template: `
    <div [class]="headerClass()">
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300"
          [checked]="allSelected()"
          [indeterminate]="someSelected()"
          (change)="state.toggleAll(side())"
        />
        <span class="font-medium">{{ title() }}</span>
      </label>
      <span class="text-muted-foreground text-xs">
        {{ selectedCount() }}/{{ totalCount() }}
      </span>
    </div>

    @if (searchable()) {
      <div class="border-b p-2">
        <input
          type="text"
          class="bg-background h-8 w-full rounded-md border px-2 text-sm"
          placeholder="Search..."
          [value]="searchValue()"
          (input)="onSearchInput($any($event.target).value)"
        />
      </div>
    }

    <div [class]="listClass()">
      @for (item of filteredItems(); track item.id) {
        <label [class]="getItemClass(item)">
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300"
            [checked]="selectedIds().has(item.id)"
            [disabled]="item.disabled"
            (change)="state.toggleItem(side(), item)"
          />
          <div class="min-w-0 flex-1">
            <div class="truncate">{{ item.label }}</div>
            @if (item.description) {
              <div class="text-muted-foreground truncate text-xs">
                {{ item.description }}
              </div>
            }
          </div>
        </label>
      }
      @if (filteredItems().length === 0) {
        <div class="text-muted-foreground p-4 text-center text-sm">
          No items
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'transfer-list-panel',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTransferListPanel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input.required<'source' | 'target'>();
  readonly title = input('');
  readonly searchable = input(true);
  readonly height = input('300px');

  protected readonly state = inject(ScTransferListState);

  protected readonly class = computed(() =>
    cn(
      'flex flex-col overflow-hidden rounded-lg border bg-card',
      this.classInput(),
    ),
  );

  protected readonly headerClass = computed(() =>
    cn('flex items-center justify-between border-b bg-muted/50 px-3 py-2'),
  );

  protected readonly listClass = computed(() =>
    cn('flex-1 overflow-auto', `max-h-[${this.height()}]`),
  );

  protected readonly filteredItems = computed(() =>
    this.side() === 'source'
      ? this.state.filteredSourceItems()
      : this.state.filteredTargetItems(),
  );

  protected readonly selectedIds = computed(() =>
    this.side() === 'source'
      ? this.state.selectedSourceIds()
      : this.state.selectedTargetIds(),
  );

  protected readonly allSelected = computed(() =>
    this.side() === 'source'
      ? this.state.allSourceSelected()
      : this.state.allTargetSelected(),
  );

  protected readonly someSelected = computed(() =>
    this.side() === 'source'
      ? this.state.someSourceSelected()
      : this.state.someTargetSelected(),
  );

  protected readonly searchValue = computed(() =>
    this.side() === 'source'
      ? this.state.sourceSearch()
      : this.state.targetSearch(),
  );

  protected readonly selectedCount = computed(() => this.selectedIds().size);

  protected readonly totalCount = computed(() =>
    this.side() === 'source'
      ? this.state.sourceItems().length
      : this.state.targetItems().length,
  );

  protected getItemClass(item: TransferListItem): string {
    return cn(
      'flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors',
      'hover:bg-accent',
      this.selectedIds().has(item.id) && 'bg-accent/50',
      item.disabled && 'cursor-not-allowed opacity-50',
    );
  }

  protected onSearchInput(value: string): void {
    if (this.side() === 'source') {
      this.state.sourceSearch.set(value);
    } else {
      this.state.targetSearch.set(value);
    }
  }
}
