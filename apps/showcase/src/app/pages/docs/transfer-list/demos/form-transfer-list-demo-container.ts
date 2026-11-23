import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTransferListDemo } from './form-transfer-list-demo';

@Component({
  selector: 'app-form-transfer-list-demo-container',
  imports: [DemoContainer, FormTransferListDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/transfer-list/form-transfer-list-demo"
    >
      <app-form-transfer-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTransferListDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormRoot, form, minLength } from '@angular/forms/signals';
import {
  ScButton,
  ScCheckbox,
  ScInput,
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
    title: 'Available',
    search: 'Search available',
    selectAll: 'Select all available',
  },
  {
    key: 'target',
    title: 'Granted',
    search: 'Search granted',
    selectAll: 'Select all granted',
  },
] as const;

/** In a form: the chosen ids are a field of the model — at least two, in the schema; short, the error shows once saved. */
@Component({
  selector: 'app-form-transfer-list-demo',
  imports: [
    FormRoot,
    ScButton,
    ScCheckbox,
    ScInput,
    ScListboxItem,
    ScListboxMultiple,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsLeftIcon,
    SiChevronsRightIcon,
  ],
  template: \`
    <form [formRoot]="roleForm" class="grid w-full max-w-2xl gap-3">
      <p id="role-label" class="text-sm font-medium">
        Permissions for the role
      </p>
      <div
        class="grid grid-cols-[1fr_auto_1fr] gap-3"
        role="group"
        aria-labelledby="role-label"
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
              <span [id]="'form-' + side.key" class="text-sm font-medium">{{
                side.title
              }}</span>
              <span class="text-muted-foreground ms-auto text-xs tabular-nums">
                {{ selected[side.key]().length }} /
                {{ lists()[side.key].length }}
              </span>
            </div>
            <input
              scInput
              type="search"
              placeholder="Search"
              [attr.aria-label]="side.search"
              [value]="query[side.key]()"
              (input)="search(side.key, $event)"
            />
            <!-- Enter, or a double-click: across. -->
            <div
              scListbox
              multiple
              class="h-60"
              [aria-labelledby]="'form-' + side.key"
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
                  <!-- The option is the control: its box only shows the selection (inert). -->
                  <input
                    type="checkbox"
                    scCheckbox
                    inert
                    [checked]="selected[side.key]().includes(item.id)"
                    [disabled]="item.disabled ?? false"
                  />
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
      </div>
      @if (roleForm.permissions().touched()) {
        @for (error of roleForm.permissions().errors(); track error.kind) {
          <p class="text-destructive text-sm" role="alert">
            {{ error.message }}
          </p>
        }
      }
      <button scButton type="submit" class="justify-self-start">Save</button>
      @if (saved()) {
        <p class="text-sm" role="status">{{ saved() }}</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTransferListDemo {
  private readonly model = signal({ permissions: ['read'] as string[] });
  private readonly saved = signal('');
  private readonly roleForm = form(
    this.model,
    (s) => {
      minLength(s.permissions, 2, {
        message: 'Grant at least two permissions.',
      });
    },
    {
      submission: {
        action: async () =>
          this.saved.set(\`Saved: \${this.model().permissions.join(', ')}.\`),
      },
    },
  );

  /** The value: the chosen ids, in order. */
  private readonly chosen = computed(() => this.model().permissions);
  private readonly sides = SIDES;
  private readonly items: readonly Item[] = [
    { id: 'read', label: 'Read' },
    { id: 'write', label: 'Write' },
    { id: 'delete', label: 'Delete' },
    { id: 'share', label: 'Share' },
    { id: 'export', label: 'Export' },
    { id: 'invite', label: 'Invite members' },
    { id: 'billing', label: 'Billing', disabled: true },
    { id: 'admin', label: 'Administer' },
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
    this.model.update((model) => ({ ...model, permissions: [...ids] }));
  }
}`;
}
