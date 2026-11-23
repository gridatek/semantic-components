import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTransferListDemo } from './rtl-transfer-list-demo';

@Component({
  selector: 'app-rtl-transfer-list-demo-container',
  imports: [DemoContainer, RtlTransferListDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/transfer-list/rtl-transfer-list-demo"
    >
      <app-rtl-transfer-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTransferListDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScInput,
  ScListbox,
  ScListboxItem,
  ScListboxMultiple,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
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
    title: 'المتاحة',
    search: 'ابحث في المتاحة',
    selectAll: 'تحديد كل المتاحة',
  },
  {
    key: 'target',
    title: 'الممنوحة',
    search: 'ابحث في الممنوحة',
    selectAll: 'تحديد كل الممنوحة',
  },
] as const;

/** In a right-to-left page: the chosen side on the left, the arrows pointing across as the text reads. */
@Component({
  selector: 'app-rtl-transfer-list-demo',
  imports: [
    Dir,
    ScButton,
    ScCheckbox,
    ScInput,
    ScListbox,
    ScListboxItem,
    ScListboxMultiple,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div
      dir="rtl"
      lang="ar"
      class="grid w-full max-w-2xl grid-cols-[1fr_auto_1fr] gap-3"
    >
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
            <span [id]="'rtl-' + side.key" class="text-sm font-medium">{{
              side.title
            }}</span>
            <span class="text-muted-foreground ms-auto text-xs tabular-nums">
              {{ selected[side.key]().length }} / {{ lists()[side.key].length }}
            </span>
          </div>
          <input
            scInput
            type="search"
            placeholder="بحث"
            [attr.aria-label]="side.search"
            [value]="query[side.key]()"
            (input)="search(side.key, $event)"
          />
          <!-- Enter, or a double-click: across. -->
          <div
            scListbox
            multiple
            class="h-60"
            [aria-labelledby]="'rtl-' + side.key"
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
            <p class="text-muted-foreground text-center text-sm">لا شيء هنا</p>
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
          <span class="sr-only">إضافة المحدد</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!movable('source').length"
          (click)="moveAll('source')"
        >
          <svg siChevronsRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">إضافة الكل</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!selected.target().length"
          (click)="move('target')"
        >
          <svg siChevronLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">إزالة المحدد</span>
        </button>
        <button
          scButton
          variant="outline"
          size="icon-sm"
          [disabled]="!movable('target').length"
          (click)="moveAll('target')"
        >
          <svg siChevronsLeftIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">إزالة الكل</span>
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTransferListDemo {
  /** The value: the chosen ids, in order. */
  private readonly chosen = signal<readonly string[]>(['read']);
  private readonly sides = SIDES;
  private readonly items: readonly Item[] = [
    { id: 'read', label: 'قراءة' },
    { id: 'write', label: 'كتابة' },
    { id: 'delete', label: 'حذف' },
    { id: 'share', label: 'مشاركة' },
    { id: 'export', label: 'تصدير' },
    { id: 'invite', label: 'دعوة أعضاء' },
    { id: 'billing', label: 'الفوترة', disabled: true },
    { id: 'admin', label: 'الإدارة' },
  ];
  /** What is selected on each side. */
  private readonly selected = {
    source: signal<string[]>([]),
    target: signal<string[]>([]),
  };
  private readonly query = { source: signal(''), target: signal('') };

  /** Each side's items: the rest of the items, in theirs; the chosen, in the value's order. */
  private readonly lists = computed(() => {
    const chosen = this.chosen();
    const byId = new Map(this.items.map((item) => [item.id, item]));
    const lists = {
      source: this.items.filter((item) => !chosen.includes(item.id)),
      target: chosen.flatMap((id) => byId.get(id) ?? []),
    };
    const match = (side: Side) => {
      const query = this.query[side]().trim().toLocaleLowerCase();
      return lists[side].filter((item) =>
        item.label.toLocaleLowerCase().includes(query),
      );
    };
    return { source: match('source'), target: match('target') };
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

  private search(side: Side, event: Event): void {
    this.query[side].set((event.target as HTMLInputElement).value);
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

  private setChosen(ids: readonly string[]): void {
    this.chosen.set(ids);
  }
}`;
}
