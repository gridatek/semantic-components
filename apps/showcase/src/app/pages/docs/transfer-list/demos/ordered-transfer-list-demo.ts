import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScListbox,
  ScListboxItem,
  ScListboxMultiple,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronUpIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';

type Side = 'source' | 'target';

interface Item {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

const SIDES = [
  {
    key: 'source',
    title: 'Hidden',
    search: 'Search hidden',
    selectAll: 'Select all hidden',
  },
  {
    key: 'target',
    title: 'Shown',
    search: 'Search shown',
    selectAll: 'Select all shown',
  },
] as const;

/** The value keeps its order: choose a table’s columns, then move them up and down. */
@Component({
  selector: 'app-ordered-transfer-list-demo',
  imports: [
    ScButton,
    ScCheckbox,
    ScListbox,
    ScListboxItem,
    ScListboxMultiple,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronUpIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
  ],
  template: `
    <div class="grid w-full max-w-2xl grid-cols-[1fr_auto_1fr_auto] gap-3">
      @for (side of sides; track side.key; let second = $last) {
        <div class="flex min-w-0 flex-col gap-2" [class.order-3]="second">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              scCheckbox
              [checked]="allSelected(side.key)"
              [indeterminate]="someSelected(side.key)"
              [disabled]="!movable(side.key).length"
              [attr.aria-label]="side.selectAll"
              (checkedChange)="selectAll(side.key, $event)"
            />
            <span [id]="'ordered-' + side.key" class="text-sm font-medium">{{
              side.title
            }}</span>
            <span class="text-muted-foreground ms-auto text-xs tabular-nums">
              {{ selected[side.key]().length }} / {{ lists()[side.key].length }}
            </span>
          </div>
          <!-- Enter, or a double-click: across. -->
          <div
            scListbox
            multiple
            class="h-60"
            [aria-labelledby]="'ordered-' + side.key"
            [value]="selected[side.key]()"
            (valueChange)="selected[side.key].set($event)"
            (keydown.enter)="move(side.key)"
          >
            @for (item of lists()[side.key]; track item.id) {
              <div
                scListboxItem
                [value]="item.id"
                [label]="item.label"
                [disabled]="item.disabled ?? false"
                (dblclick)="move(side.key, [item.id])"
              >
                {{ item.label }}
              </div>
            }
          </div>
          @if (!lists()[side.key].length) {
            <p class="text-muted-foreground text-center text-sm">
              Nothing here
            </p>
          }
        </div>
      }
      <div class="order-2 flex flex-col justify-center gap-2">
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!selected.source().length"
          (click)="move('source')"
        >
          <svg siChevronRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add selected</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!movable('source').length"
          (click)="moveAll('source')"
        >
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Add all</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!selected.target().length"
          (click)="move('target')"
        >
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove selected</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!movable('target').length"
          (click)="moveAll('target')"
        >
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">Remove all</span>
        </button>
      </div>
      <div
        class="order-4 flex flex-col justify-center gap-2"
        role="group"
        aria-label="Order"
      >
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!canReorder(-1)"
          (click)="reorder(-1)"
        >
          <svg siChevronUpIcon></svg>
          <span class="sr-only">Move up</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!canReorder(1)"
          (click)="reorder(1)"
        >
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Move down</span>
        </button>
      </div>
    </div>
    <p
      class="text-muted-foreground w-full max-w-2xl text-sm"
      data-testid="value"
    >
      Value: {{ chosen().join(' · ') }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class OrderedTransferListDemo {
  /** The value: the chosen ids, in order. */
  private readonly chosen = signal<readonly string[]>([
    'name',
    'email',
    'status',
  ]);
  private readonly sides = SIDES;
  private readonly items: readonly Item[] = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'team', label: 'Team' },
    { id: 'status', label: 'Status' },
    { id: 'joined', label: 'Joined' },
  ];
  /** What is selected on each side. */
  private readonly selected = {
    source: signal<string[]>([]),
    target: signal<string[]>([]),
  };

  /** Each side's items: the rest of the items, in theirs; the chosen, in the value's order. */
  private readonly lists = computed(() => {
    const chosen = this.chosen();
    const byId = new Map(this.items.map((item) => [item.id, item]));
    const lists = {
      source: this.items.filter((item) => !chosen.includes(item.id)),
      target: chosen.flatMap((id) => byId.get(id) ?? []),
    };
    return lists;
  });

  /** What a side can move: shown, not disabled. */
  private movable(side: Side): readonly Item[] {
    return this.lists()[side].filter((item) => !item.disabled);
  }

  private allSelected(side: Side): boolean {
    const movable = this.movable(side);
    return (
      movable.length > 0 &&
      movable.every((item) => this.selected[side]().includes(item.id))
    );
  }

  private someSelected(side: Side): boolean {
    return this.selected[side]().length > 0 && !this.allSelected(side);
  }

  private selectAll(side: Side, checked: boolean): void {
    this.selected[side].set(
      checked ? this.movable(side).map((item) => item.id) : [],
    );
  }

  /** The ids across, to the other side — still selected there. */
  private move(from: Side, ids = this.selected[from]()): void {
    const movable = new Set(this.movable(from).map((item) => item.id));
    const moving = ids.filter((id) => movable.has(id));
    if (!moving.length) return;
    this.setChosen(
      from === 'source'
        ? [...this.chosen(), ...moving]
        : this.chosen().filter((id) => !moving.includes(id)),
    );
    this.selected[from].set([]);
    this.selected[from === 'source' ? 'target' : 'source'].set(moving);
  }

  private moveAll(from: Side): void {
    this.move(
      from,
      this.movable(from).map((item) => item.id),
    );
  }

  /** Can the chosen side's selection move by `step` (-1 up, 1 down)? */
  private canReorder(step: -1 | 1): boolean {
    const chosen = this.chosen();
    const at = this.selected.target().map((id) => chosen.indexOf(id));
    return (
      at.length > 0 &&
      at.every((i) => i + step >= 0 && i + step < chosen.length)
    );
  }

  /** The chosen side's selection, up or down by one, together. */
  private reorder(step: -1 | 1): void {
    if (!this.canReorder(step)) return;
    const list = [...this.chosen()];
    const picked = new Set(this.selected.target());
    const order = step < 0 ? list.keys() : [...list.keys()].reverse();
    for (const i of order) {
      if (!picked.has(list[i])) continue;
      [list[i], list[i + step]] = [list[i + step], list[i]];
    }
    this.setChosen(list);
  }

  private setChosen(ids: readonly string[]): void {
    this.chosen.set(ids);
  }
}
