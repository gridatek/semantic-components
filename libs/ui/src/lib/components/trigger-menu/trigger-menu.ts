import { Directionality } from '@angular/cdk/bidi';
import {
  type ConnectedOverlayPositionChange,
  type ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  resource,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import {
  ScTokenInput,
  type ScTokenInputMenuHost,
} from '../token-input/token-input';
import {
  type ScToken,
  scTokenValueFlat,
  scTokenValueSplice,
} from '../token-input/token-input-value';
import { ScTriggerMenuPortal } from './trigger-menu-portal';
import type {
  ScTrigger,
  ScTriggerItem,
  ScTriggerItemsLoader,
  ScTriggerMatch,
} from './trigger-menu-types';

/** An item part, as the menu finds its id. */
interface ScTriggerMenuItemHost {
  readonly id: string;
  item(): ScTriggerItem;
}

/**
 * Where the menu reads what is typed and puts what is chosen: a Token Input's
 * editor, or a textarea or input of its own (`scTriggerMenuInput`).
 */
export interface ScTriggerMenuField {
  /** What the popup hangs from. */
  element(): HTMLElement | undefined;
  /** Its text, each token one object character (U+FFFC). */
  text(): string;
  caret(): number | null;
  focused(): boolean;
  editable(): boolean;
  /** Where the character at `offset` is drawn, in the viewport. */
  rectAt(offset: number): DOMRect | null;
  /**
   * The choice in place of `start` to `end` (the trigger and the query): a
   * token — or, in a text field, its text — and a space.
   */
  insert(start: number, end: number, token: ScToken, text: string): void;
}

let nextId = 0;

/** Below the trigger, above without room — until it is measured. */
const FALLBACK: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 4,
  },
];

/**
 * Suggestions as you type a trigger (`@` for people, `/` for commands) in a
 * Token Input — or a textarea or input (`scTriggerMenuInput`): a list at the
 * character, filtered by what follows it; the one chosen becomes a token (in
 * a text field, its text), and a space. Focus stays in the field: ↓ / ↑
 * highlight, Enter or Tab choose, Escape dismisses (Ctrl + Space brings it
 * back). Its template (`scTriggerMenuPortal`) holds the popup, the list and
 * its items (`menu.items()`, already filtered), the empty text.
 */
@Component({
  selector: 'div[scTriggerMenu]',
  exportAs: 'scTriggerMenu',
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <ng-content />
    @if (origin(); as origin) {
      <ng-template
        [cdkConnectedOverlay]="{
          origin,
          usePopover: 'inline',
          transformOriginSelector: '[data-slot=trigger-menu-popup]',
          flexibleDimensions: true,
          viewportMargin: 8,
        }"
        [cdkConnectedOverlayOpen]="!!match()"
        [cdkConnectedOverlayPositions]="positions()"
        (positionChange)="onPositionChange($event)"
      >
        @if (portal(); as portal) {
          <ng-container [ngTemplateOutlet]="portal.templateRef" />
        }
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'trigger-menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTriggerMenu<
  T extends ScTriggerItem = ScTriggerItem,
> implements ScTokenInputMenuHost {
  private readonly tokenInput = inject(ScTokenInput, { optional: true });
  private readonly dir = inject(Directionality, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  /** The characters that open it, each with its items. */
  readonly triggers = input.required<readonly ScTrigger<T>[]>();

  /** An item chosen (its token is in the value). */
  readonly choose = output<T>();

  readonly listId = `sc-trigger-menu-list-${nextId++}`;
  /** Where it shows: below the trigger, or above. */
  readonly side = signal<'top' | 'bottom'>('bottom');

  private readonly portal = contentChild(ScTriggerMenuPortal);
  /** Escape at this trigger: closed until Ctrl + Space. */
  private readonly dismissedAt = signal<number | null>(null);
  /** A token reverted here: its text, spaces and all, is the query. */
  private readonly pinnedAt = signal<number | null>(null);
  /** Empty parts in its template: then it shows with nothing found. */
  readonly ɵempties = signal(0);
  readonly ɵitemParts = signal<readonly ScTriggerMenuItemHost[]>([]);
  /** A textarea or input of its own. */
  readonly ɵinput = signal<ScTriggerMenuField | undefined>(undefined);

  /** The Token Input it is in, as a field. */
  private readonly tokenField: ScTriggerMenuField | undefined = this.tokenInput
    ? this.fieldOf(this.tokenInput)
    : undefined;
  /** Where it reads and writes: its own text field, or its Token Input. */
  private readonly field = computed(() => this.ɵinput() ?? this.tokenField);

  /** The trigger typed before the caret, and what follows it. */
  readonly match = computed<ScTriggerMatch<T> | null>(() => {
    const field = this.field();
    if (!field?.focused() || !field.editable()) return null;
    const caret = field.caret();
    if (caret === null) return null;
    const text = field.text().slice(0, caret);
    let best: ScTriggerMatch<T> | null = null;
    for (const trigger of this.triggers()) {
      const start = text.lastIndexOf(trigger.char);
      if (start < 0 || (best && start <= best.start)) continue;
      if (start === this.dismissedAt()) continue;
      const query = text.slice(start + trigger.char.length);
      if (/[\n￼]/.test(query)) continue;
      if (start !== this.pinnedAt() && /\s/.test(query)) continue;
      const before = start > 0 ? text[start - 1] : '';
      const opens =
        trigger.boundary === 'start'
          ? !before || before === '\n'
          : !before || /[\s￼]/.test(before);
      if (opens) best = { trigger, start, end: caret, query };
    }
    return best;
  });

  private readonly loaded = resource({
    params: () => {
      const match = this.match();
      return match && typeof match.trigger.items === 'function'
        ? { load: match.trigger.items, query: match.query }
        : undefined;
    },
    loader: ({ params, abortSignal }) =>
      (params.load as ScTriggerItemsLoader<T>)(params.query, abortSignal),
  });

  /** Items are loading. */
  readonly loading = computed(() => this.loaded.isLoading());

  /** The items for what is typed. */
  readonly items = computed<readonly T[]>(() => {
    const match = this.match();
    if (!match) return [];
    const items = match.trigger.items;
    if (typeof items === 'function')
      return this.loaded.hasValue() ? (this.loaded.value() ?? []) : [];
    const query = match.query.toLocaleLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        item.label.toLocaleLowerCase().includes(query) ||
        !!item.keywords?.some((word) =>
          word.toLocaleLowerCase().includes(query),
        ),
    );
  });

  /** The item Enter chooses: the first that can be, then the arrows'. */
  readonly active = linkedSignal<readonly T[], T | null>({
    source: this.items,
    computation: (items, previous) =>
      previous?.value && items.includes(previous.value)
        ? previous.value
        : (items.find((item) => !item.disabled) ?? null),
  });

  /** Shown: something found, or an empty text to show. */
  readonly visible = computed(
    () => !!this.match() && (this.items().length > 0 || this.ɵempties() > 0),
  );

  readonly activeId = computed(() => {
    const active = this.active();
    return this.ɵitemParts().find((part) => part.item() === active)?.id ?? null;
  });

  /** The field: what the popup hangs from. */
  private readonly origin = computed(() => this.field()?.element());

  /** At the trigger character: below it, or above it without room. */
  private readonly positions = computed<ConnectedPosition[]>(() => {
    const match = this.match();
    const field = this.field();
    const element = field?.element();
    if (!match || !field || !element) return FALLBACK;
    field.text();
    const at = field.rectAt(match.start);
    if (!at) return FALLBACK;
    const box = element.getBoundingClientRect();
    const rtl = this.dir?.value === 'rtl';
    const offsetX = rtl ? at.right - box.right : at.left - box.left;
    return [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
        offsetX,
        offsetY: at.bottom - box.top + 4,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetX,
        offsetY: at.top - box.top - 4,
      },
    ];
  });

  private readonly class = computed(() => cn('contents', this.classInput()));

  constructor() {
    const root = this.tokenInput;
    if (root) {
      root.ɵmenu.set(this);
      inject(DestroyRef).onDestroy(() => {
        if (root.ɵmenu() === this) root.ɵmenu.set(undefined);
      });
    }
    // Focus gone: a dismissed or reverted trigger forgotten.
    effect(() => {
      if (this.field()?.focused()) return;
      untracked(() => {
        this.dismissedAt.set(null);
        this.pinnedAt.set(null);
      });
    });
  }

  onKeydown(event: KeyboardEvent): boolean {
    if (event.isComposing) return false;
    if (event.key === ' ' && event.ctrlKey) {
      if (this.dismissedAt() === null) return false;
      this.dismissedAt.set(null);
      event.preventDefault();
      return true;
    }
    if (!this.visible()) return false;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.move(event.key === 'ArrowDown' ? 1 : -1);
        break;
      case 'Enter':
      case 'Tab': {
        if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey)
          return false;
        const active = this.active();
        if (active) this.pick(active);
        else if (event.key === 'Tab') return false;
        break;
      }
      case 'Escape':
        this.dismissedAt.set(this.match()?.start ?? null);
        event.stopPropagation();
        break;
      default:
        return false;
    }
    event.preventDefault();
    return true;
  }

  charFor(type: string): string | null {
    return (
      this.triggers().find((trigger) => trigger.type === type)?.char ?? null
    );
  }

  pin(start: number): void {
    this.dismissedAt.set(null);
    this.pinnedAt.set(start);
  }

  /** An item chosen: its token (its text) in place of the trigger and the query, then a space. */
  pick(item: T): void {
    const match = this.match();
    const field = this.field();
    if (!match || !field || item.disabled) return;
    const { trigger } = match;
    field.insert(
      match.start,
      match.end,
      { type: trigger.type, value: item.value, label: item.label },
      trigger.insert ? trigger.insert(item) : trigger.char + item.label,
    );
    this.pinnedAt.set(null);
    this.choose.emit(item);
  }

  /** A Token Input as a field: its editor, its value; a token put in. */
  private fieldOf(root: ScTokenInput): ScTriggerMenuField {
    return {
      element: () => root.ɵeditor()?.element,
      text: () => scTokenValueFlat(root.value()),
      caret: () => root.ɵeditor()?.caret() ?? null,
      focused: () => !!root.ɵeditor()?.focused(),
      editable: () => root.editable(),
      rectAt: (offset) => root.ɵeditor()?.rectAt(offset) ?? null,
      insert: (start, end, token) => {
        root.ɵcaretBefore = end;
        root.ɵcommit(
          scTokenValueSplice(root.value(), start, end, [token, ' ']),
          'item-press',
          start + 2,
        );
      },
    };
  }

  private move(step: 1 | -1): void {
    const items = this.items().filter((item) => !item.disabled);
    if (!items.length) return;
    const index = items.indexOf(this.active() as T);
    const next =
      index < 0
        ? step > 0
          ? 0
          : items.length - 1
        : (index + step + items.length) % items.length;
    this.active.set(items[next]);
  }

  private onPositionChange(change: ConnectedOverlayPositionChange): void {
    this.side.set(change.connectionPair.overlayY === 'top' ? 'bottom' : 'top');
  }
}
