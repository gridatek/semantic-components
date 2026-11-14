import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import type { ScCommandItem } from './command-item';

/** Whether an item matches the search: its text, its `value` and its `keywords`. */
export type ScCommandFilter = (
  text: string,
  search: string,
  keywords: readonly string[],
) => boolean;

/** Items in the page's order; one not in the page yet keeps its place. */
const byPageOrder = (items: readonly ScCommandItem[]): ScCommandItem[] =>
  [...items].sort((a, b) => {
    if (!a.element.isConnected || !b.element.isConnected) return 0;
    return a.element.compareDocumentPosition(b.element) &
      Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1;
  });

/** Lower case, without accents: "Éclair" is found by "ecla". */
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();

/** The default filter: the search found in the item's text or one of its keywords. */
export const scCommandContains: ScCommandFilter = (text, search, keywords) => {
  const query = normalize(search.trim());
  if (!query) return true;
  return [text, ...keywords].some((word) => normalize(word).includes(query));
};

/**
 * A search box over a list of commands: typing filters the items (yours, kept
 * in your order), the arrows move the highlight while focus stays in the
 * search, Enter runs the highlighted item. The first match is always
 * highlighted.
 */
@Directive({
  selector: 'div[scCommand]',
  exportAs: 'scCommand',
  host: {
    'data-slot': 'command',
    '[class]': 'class()',
  },
})
export class ScCommand {
  private readonly styles = injectPreset().command;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Replaces the matching (a contains, accents and case ignored). */
  readonly filter = input<ScCommandFilter>(scCommandContains);
  /** Off: every item is shown, filtered by you (an async search). */
  readonly shouldFilter = input(true, { transform: booleanAttribute });
  /** The arrows wrap round from the last item to the first. */
  readonly loopFocus = input(true, { transform: booleanAttribute });
  /** Ctrl+N / Ctrl+J and Ctrl+P / Ctrl+K move the highlight too. */
  readonly vimBindings = input(true, { transform: booleanAttribute });
  /** The pointer highlights the item it moves over. */
  readonly highlightItemOnHover = input(true, {
    transform: booleanAttribute,
  });

  /** The search text (the input's value). */
  readonly search = signal('');
  /** The list's id, for the input's aria-controls. */
  readonly listId = signal<string | null>(null);

  private readonly itemsSignal = signal<readonly ScCommandItem[]>([]);
  /** The items, in the page's order. */
  readonly items = this.itemsSignal.asReadonly();
  /** The items shown (matching, or always shown). */
  readonly shownItems = computed(() =>
    this.itemsSignal().filter((item) => item.shown()),
  );
  /** How many items are shown: write it in a `scCommandStatus`. */
  readonly count = computed(() => this.shownItems().length);

  private readonly activeSignal = signal<ScCommandItem | null>(null);
  /** The highlighted item. */
  readonly active = this.activeSignal.asReadonly();

  private readonly injector = inject(Injector);
  private readonly keyManager = new ActiveDescendantKeyManager(
    this.itemsSignal,
    this.injector,
  ).skipPredicate((item) => !item.shown() || item.disabled);

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );

  constructor() {
    const changes = this.keyManager.change.subscribe(() =>
      this.activeSignal.set(this.keyManager.activeItem ?? null),
    );
    inject(DestroyRef).onDestroy(() => {
      changes.unsubscribe();
      this.keyManager.destroy();
    });

    effect(() => this.keyManager.withWrap(this.loopFocus()));
    // Items came or went (or the filter changed): the active one stays,
    // unless it no longer shows.
    effect(() => {
      this.shownItems();
      untracked(() => this.keepActiveShown());
    });
  }

  /**
   * A new search: the items filtered and the first match highlighted at once,
   * so an Enter right after typing runs a match.
   */
  setSearch(text: string): void {
    if (text === untracked(this.search)) return;
    this.search.set(text);
    this.highlightFirst();
  }

  /** Whether an item matches the search. */
  matches(text: string, keywords: readonly string[]): boolean {
    if (!this.shouldFilter()) return true;
    return this.filter()(text, this.search(), keywords);
  }

  /** Highlights an item (the pointer over it). */
  highlight(item: ScCommandItem): void {
    if (item.disabled || !item.shown()) return;
    if (this.keyManager.activeItem !== item) {
      this.keyManager.setActiveItem(item);
    }
  }

  /**
   * Handles the search's keys: the arrows (and the vim bindings) move the
   * highlight, Alt+arrows jump between groups, Enter runs it.
   */
  handleKeydown(event: KeyboardEvent): void {
    if (event.isComposing) return;
    const vim = this.vimBindings() && event.ctrlKey && !event.altKey;
    const key = event.key.toLowerCase();
    if (vim && (key === 'n' || key === 'j')) {
      this.step(1);
    } else if (vim && (key === 'p' || key === 'k')) {
      this.step(-1);
    } else if (event.altKey && event.key === 'ArrowDown') {
      this.jumpGroup(1);
    } else if (event.altKey && event.key === 'ArrowUp') {
      this.jumpGroup(-1);
    } else if (event.key === 'ArrowDown') {
      this.step(1);
    } else if (event.key === 'ArrowUp') {
      this.step(-1);
    } else if (event.key === 'Enter') {
      // Never a hidden item.
      this.keepActiveShown();
      const active = this.keyManager.activeItem;
      if (!active) return;
      active.run();
    } else {
      return;
    }
    event.preventDefault();
  }

  /**
   * @internal Registers an item, in the page's order. An item created with a
   * new view (a page switched, results arrived) registers before the view is
   * in the page, and two detached elements have no order — browsers answer
   * at random (WebKit) or by memory address: added last for now (creation
   * order, the template's), sorted once rendered.
   */
  register(item: ScCommandItem): void {
    if (!item.element.isConnected) {
      this.itemsSignal.update((items) => [...items, item]);
      this.sortOnceRendered();
      return;
    }
    this.itemsSignal.update((items) => byPageOrder([...items, item]));
  }

  private sortPending = false;

  private sortOnceRendered(): void {
    if (this.sortPending) return;
    this.sortPending = true;
    afterNextRender(
      () => {
        this.sortPending = false;
        this.itemsSignal.update(byPageOrder);
      },
      { injector: this.injector },
    );
  }

  /** @internal */
  unregister(item: ScCommandItem): void {
    this.itemsSignal.update((items) => items.filter((i) => i !== item));
  }

  private step(direction: 1 | -1): void {
    if (!this.keyManager.activeItem) {
      if (direction === 1) this.keyManager.setFirstItemActive();
      else this.keyManager.setLastItemActive();
    } else if (direction === 1) {
      this.keyManager.setNextItemActive();
    } else {
      this.keyManager.setPreviousItemActive();
    }
  }

  /**
   * The active item is gone (its page changed), no longer shows, or is
   * disabled: the first match instead.
   */
  private keepActiveShown(): void {
    const active = this.keyManager.activeItem;
    if (
      !active ||
      !untracked(this.itemsSignal).includes(active) ||
      !active.shown() ||
      active.disabled
    ) {
      this.highlightFirst();
    }
  }

  private highlightFirst(): void {
    this.keyManager.setFirstItemActive();
    if (!this.keyManager.activeItem) this.activeSignal.set(null);
  }

  /** The first item of the next (1) or previous (-1) group that shows. */
  private jumpGroup(direction: 1 | -1): void {
    const items = this.shownItems().filter((item) => !item.disabled);
    const active = this.keyManager.activeItem;
    const group = active?.group ?? null;
    let i = active ? items.indexOf(active) : -1;
    // Past the active item's group…
    while (
      items[i + direction] &&
      group &&
      items[i + direction].group === group
    ) {
      i += direction;
    }
    const next = items[i + direction];
    if (!next) return;
    // …to the first item of the group found.
    const target = next.group
      ? (items.find((item) => item.group === next.group) ?? next)
      : next;
    this.keyManager.setActiveItem(target);
  }
}
