import {
  SortedCollection,
  TreePattern,
  convertGetterSetterToWritableSignalLike,
  sortDirectives,
} from '@angular/aria/private';
import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import type { ScTreeItem } from './tree-item';
import { SC_TREE } from './tree-tokens';

/** How many items can be selected; `none`: none (checkboxes, links). */
export type ScTreeMode = 'single' | 'multiple' | 'none';

/** `manual`: Enter, Space or a click selects; `automatic`: the focus does. */
export type ScTreeActivation = 'manual' | 'automatic';

/**
 * What `checked` holds. `trunk`: the outermost fully checked items — a branch
 * stands for all it holds, opened or not; `independent`: each item on its
 * own, no cascading.
 */
export type ScTreeCheckStrategy = 'trunk' | 'independent';

/** An item's checkbox: ticked, empty, or half-ticked (some of its descendants). */
export type ScTreeCheckState = 'checked' | 'unchecked' | 'mixed';

/**
 * A hierarchy of files, pages or choices, its branches opening on their
 * children: Angular Aria's tree pattern (its keyboard, selection, typeahead
 * and ARIA), its items found by their place — no `parent` to pass. Its items
 * (`scTreeItem`) are yours; name it.
 *
 * ```html
 * <ul scTree aria-label="Files" [(expanded)]="open">
 *   <li scTreeItem value="src">
 *     <div scTreeItemLabel><span scTreeItemIndicator>…</span>src</div>
 *     <ul scTreeGroup>
 *       <ng-template scTreeGroupContent>
 *         <li scTreeItem value="src/main.ts">…</li>
 *       </ng-template>
 *     </ul>
 *   </li>
 * </ul>
 * ```
 */
@Directive({
  selector: 'ul[scTree]',
  exportAs: 'scTree',
  providers: [{ provide: SC_TREE, useExisting: ScTree }],
  host: {
    role: 'tree',
    '[id]': 'id()',
    '[attr.aria-multiselectable]': 'pattern.multi()',
    '[attr.aria-disabled]': 'pattern.disabled()',
    '[tabindex]': 'pattern.tabIndex()',
    '[attr.data-checkable]': 'checkable() ? "" : null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(click)': 'onClick($event)',
    '(focusin)': 'pattern.onFocusIn()',
  },
})
export class ScTree<V = string> {
  readonly element =
    inject<ElementRef<HTMLUListElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId('sc-tree-');

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  /** The selected values. */
  readonly value = model<V[]>([]);
  /** How many items can be selected. */
  readonly mode = input<ScTreeMode>('single');
  /** `automatic`: moving the focus selects (single mode). */
  readonly activation = input<ScTreeActivation>('manual');
  /** The open branches' values. */
  readonly expanded = model<V[]>([]);
  /** Pressing a row opens or closes its branch; its indicator always does. */
  readonly expandOnPress = input(true, { transform: booleanAttribute });
  /** Tri-state checkboxes, apart from the selection (`scTreeItemCheckbox`). */
  readonly checkable = input(false, { transform: booleanAttribute });
  /** The checked values, as `checkStrategy` says. */
  readonly checked = model<V[]>([]);
  readonly checkStrategy = input<ScTreeCheckStrategy>('trunk');
  /**
   * The page shown: its item says so (`aria-current="page"`) and is the tab
   * stop — a navigation tree. Open its ancestors with `expanded`.
   */
  readonly current = input<V | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Disabled items stay focusable, so they can be found and read. */
  readonly focusableWhenDisabled = input(true, {
    transform: booleanAttribute,
  });

  readonly id = computed(() => this.idInput() || this.fallbackId);

  /** Items are selectable: a mode that selects, or a current page to mark. */
  readonly itemsSelectable = computed(
    () => this.mode() !== 'none' || this.current() !== null,
  );

  /** The items, in the page's order. */
  private readonly collection = new SortedCollection<ScTreeItem<V>>();

  /** Expand all on: branches open as they appear, until one is closed. */
  readonly expandingAll = signal(false);

  /** An item to show once it is there (`reveal`). */
  private readonly revealing = signal<{ value: V } | null>(null);

  /** Angular Aria's tree pattern: the keyboard, selection, focus, typeahead. */
  readonly pattern: TreePattern<V> = new TreePattern<V>({
    id: this.id,
    element: () => this.element,
    items: computed(() =>
      this.collection.orderedItems().map((item) => item.pattern),
    ),
    activeItem: signal(undefined),
    // A navigation tree's value is its current page: a press there doesn't
    // write yours.
    value: convertGetterSetterToWritableSignalLike(
      () => {
        const current = this.current();
        return current === null ? this.value() : [current];
      },
      (value: V[]) => {
        if (untracked(this.current) === null) this.value.set(value);
      },
    ),
    multi: computed(() => this.mode() === 'multiple'),
    selectionMode: computed(() =>
      this.activation() === 'automatic' ? 'follow' : 'explicit',
    ),
    focusMode: () => 'roving',
    disabled: this.disabled,
    softDisabled: this.focusableWhenDisabled,
    wrap: () => true,
    orientation: () => 'vertical',
    typeaheadDelay: () => 500,
    nav: computed(() => this.current() !== null),
    currentType: () => 'page',
    textDirection: inject(Directionality).valueSignal,
  });

  private readonly class = computed(() =>
    cn('flex flex-col gap-px outline-none', this.classInput()),
  );

  constructor() {
    afterNextRender(() => this.collection.startObserving(this.element));
    inject(DestroyRef).onDestroy(() => this.collection.stopObserving());
    // As Aria's tree: its tab stop set, and found again when its item goes.
    // In the page's order: an item registers before it is attached, where
    // the collection can't place it — sorted again once it is (and before
    // a key or a press reads the order).
    afterRenderEffect({
      write: () => {
        this.collection.orderedItems();
        untracked(() => this.sortItems());
      },
    });
    afterRenderEffect({
      write: () => {
        this.pattern.setDefaultStateEffect();
        // A navigation tree's tab stop: its current page, until one moves.
        const current = this.current();
        if (current === null || this.pattern.hasBeenInteracted()) return;
        const item = this.find(current);
        if (item && untracked(this.pattern.inputs.activeItem) !== item.pattern)
          untracked(() => this.pattern.inputs.activeItem.set(item.pattern));
      },
    });
    // Disabled items no longer focusable: the tab stop off one.
    afterRenderEffect({
      write: () => {
        if (this.focusableWhenDisabled()) return;
        const active = untracked(this.pattern.inputs.activeItem);
        if (active?.disabled())
          untracked(() => {
            this.pattern.treeBehavior.unfocus();
            this.pattern.setDefaultState();
          });
      },
    });
    afterRenderEffect({
      write: () => {
        const items = this.pattern.inputs.items();
        const active = untracked(() => this.pattern.inputs.activeItem());
        if (active && !items.includes(active)) {
          this.pattern.treeBehavior.unfocus();
          this.pattern.setDefaultState();
        }
      },
    });
    // Reveal: its ancestors opened, then scrolled to and focused.
    afterRenderEffect({
      write: () => {
        const revealing = this.revealing();
        if (!revealing) return;
        const item = this.find(revealing.value);
        if (!item) return;
        const closed = item
          .ancestors()
          .filter((ancestor) => !this.isExpanded(ancestor.value()));
        untracked(() => {
          if (closed.length) {
            for (const ancestor of closed)
              this.setExpanded(ancestor.value(), true);
            return;
          }
          this.revealing.set(null);
          this.focus(revealing.value);
          item.element.scrollIntoView({ block: 'nearest' });
        });
      },
    });
  }

  register(item: ScTreeItem<V>): void {
    this.collection.register(item);
  }

  unregister(item: ScTreeItem<V>): void {
    this.collection.unregister(item);
  }

  /** The item of this value, once it is rendered. */
  find(value: V): ScTreeItem<V> | undefined {
    return this.collection
      .orderedItems()
      .find((item) => item.value() === value);
  }

  /** An item's children, as rendered, in order. */
  childrenOf(item: ScTreeItem<V>): ScTreeItem<V>[] {
    return this.collection
      .orderedItems()
      .filter((child) => child.parentItem === item);
  }

  isExpanded(value: V): boolean {
    return this.expanded().includes(value);
  }

  setExpanded(value: V, open: boolean): void {
    if (untracked(() => this.isExpanded(value)) === open) return;
    this.expanded.update((values) =>
      open ? [...values, value] : values.filter((v) => v !== value),
    );
    if (!open) this.expandingAll.set(false);
  }

  /** Opens every branch, and those that appear while it is on. */
  expandAll(): void {
    const branches = this.collection
      .orderedItems()
      .filter((item) => item.branch())
      .map((item) => item.value());
    this.expanded.update((open) => [
      ...open,
      ...branches.filter((value) => !open.includes(value)),
    ]);
    this.expandingAll.set(true);
  }

  collapseAll(): void {
    this.expandingAll.set(false);
    this.expanded.set([]);
  }

  /**
   * Shows an item: opens its ancestors, scrolls to it and focuses it — once
   * it is rendered (an ancestor never opened: open it with `expanded`).
   */
  reveal(value: V): void {
    this.revealing.set({ value });
  }

  /** Focuses an item: the tree's tab stop from then on. */
  focus(value: V): void {
    this.sortItems();
    const item = this.find(value);
    if (!item) return;
    this.pattern.treeBehavior.goto(item.pattern);
    item.element.focus();
  }

  /** An item's checkbox state. */
  checkState(item: ScTreeItem<V>): ScTreeCheckState {
    if (this.isChecked(item)) return 'checked';
    if (this.checkStrategy() === 'independent') return 'unchecked';
    return this.anyDescendantChecked(item) ? 'mixed' : 'unchecked';
  }

  /** Checks or unchecks an item — and, cascading, what it holds. */
  toggleCheck(item: ScTreeItem<V>): void {
    if (item.isDisabled()) return;
    const value = item.value();
    if (this.checkStrategy() === 'independent') {
      this.checked.update((values) =>
        values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value],
      );
      return;
    }
    const set = new Set(this.checked());
    if (this.isChecked(item)) this.uncheck(item, set);
    else this.check(item, set);
    this.checked.set([...set]);
  }

  private isChecked(item: ScTreeItem<V>): boolean {
    const checked = this.checked();
    if (checked.includes(item.value())) return true;
    if (this.checkStrategy() === 'independent') return false;
    return item
      .ancestors()
      .some((ancestor) => checked.includes(ancestor.value()));
  }

  private anyDescendantChecked(item: ScTreeItem<V>): boolean {
    return this.childrenOf(item).some(
      (child) => this.isChecked(child) || this.anyDescendantChecked(child),
    );
  }

  /** Checked: it stands for its descendants; a parent whose children all are, for them. */
  private check(item: ScTreeItem<V>, set: Set<V>): void {
    for (const descendant of this.descendantsOf(item))
      set.delete(descendant.value());
    set.add(item.value());
    for (let parent = item.parentItem; parent; parent = parent.parentItem) {
      const children = this.childrenOf(parent);
      if (!children.every((child) => set.has(child.value()))) break;
      for (const child of children) set.delete(child.value());
      set.add(parent.value());
    }
  }

  /** Unchecked: the checked ancestor gives way to the rest of what it held. */
  private uncheck(item: ScTreeItem<V>, set: Set<V>): void {
    if (set.delete(item.value())) return;
    const path = [item, ...item.ancestors()];
    const top = path.findIndex((node) => set.has(node.value()));
    if (top < 0) return;
    set.delete(path[top].value());
    for (let i = top; i > 0; i--)
      for (const child of this.childrenOf(path[i]))
        if (child !== path[i - 1]) set.add(child.value());
  }

  private descendantsOf(item: ScTreeItem<V>): ScTreeItem<V>[] {
    return this.childrenOf(item).flatMap((child) => [
      child,
      ...this.descendantsOf(child),
    ]);
  }

  /** The items in the page's order again, if one was placed before it was attached. */
  private sortItems(): void {
    const items = this.collection.orderedItems();
    const unsorted = items.some(
      (item, i) => i > 0 && sortDirectives(items[i - 1], item) > 0,
    );
    if (!unsorted) return;
    this.collection.unregister(items[0]);
    this.collection.register(items[0]);
  }

  /** The item of an event: the nearest one around its target. */
  private itemOf(event: Event): ScTreeItem<V> | undefined {
    const element = (event.target as Element).closest?.('li[scTreeItem]');
    return this.collection
      .orderedItems()
      .find((item) => item.element === element);
  }

  /** The focused item: the pattern's active one. */
  private activeItem(): ScTreeItem<V> | undefined {
    const active = this.pattern.inputs.activeItem();
    return this.collection
      .orderedItems()
      .find((item) => item.pattern === active);
  }

  private onKeydown(event: KeyboardEvent): void {
    this.sortItems();
    const plain =
      !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey;
    const item = this.activeItem();
    // Checkboxes: Space checks the focused item.
    if (plain && item && event.key === ' ' && this.checkable()) {
      event.preventDefault();
      this.toggleCheck(item);
      return;
    }
    this.pattern.onKeydown(event);
    // A link's row: Enter follows it.
    if (plain && item && event.key === 'Enter') item.followLink();
  }

  /**
   * A press on a row: the pattern selects, and opens or closes the branch —
   * not when `expandOnPress` is off. On the indicator: it opens or closes
   * only; on the checkbox: it checks only (`scTreeItemCheckbox`). Both
   * focus their item, nothing selected.
   */
  private onClick(event: PointerEvent): void {
    this.sortItems();
    const item = this.itemOf(event);
    if (!item) return this.pattern.onClick(event);
    const target = event.target as Node;
    const value = item.value();
    const was = this.isExpanded(value);
    if (item.indicator?.contains(target) || item.checkbox?.contains(target)) {
      if (this.disabled()) return;
      this.pattern.treeBehavior.goto(item.pattern);
      if (item.indicator?.contains(target) && !item.isDisabled())
        this.setExpanded(value, !was);
      return;
    }
    this.pattern.onClick(event);
    if (item.branch() && !this.expandOnPress()) this.setExpanded(value, was);
  }
}
