import { Tree } from '@angular/aria/tree';
import {
  DestroyRef,
  Directive,
  ElementRef,
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
import { bindInput } from '../../utils';
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
 * children: Angular Aria's tree (`ngTree`) — its keyboard, selection,
 * typeahead and ARIA. Its items (`scTreeItem`) are yours, and find their tree
 * and their parent by their place; name it.
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
  hostDirectives: [
    {
      directive: Tree,
      inputs: ['value', 'disabled'],
      outputs: ['valueChange'],
    },
  ],
  providers: [{ provide: SC_TREE, useExisting: ScTree }],
  host: {
    '[attr.data-checkable]': 'checkable() ? "" : null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScTree<V = string> {
  /** Angular Aria's tree, under this one. */
  readonly ariaTree = inject<Tree<V>>(Tree);
  private readonly element =
    inject<ElementRef<HTMLUListElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
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
   * The page shown: its item says so (`aria-current="page"`) — a navigation
   * tree. Open its ancestors with `expanded`.
   */
  readonly current = input<V | null>(null);
  /** Disabled items stay focusable, so they can be found and read. */
  readonly focusableWhenDisabled = input(true, {
    transform: booleanAttribute,
  });

  /** Items are selectable: a mode that selects, or a current page to mark. */
  readonly itemsSelectable = computed(
    () => this.mode() !== 'none' || this.current() !== null,
  );

  private readonly items = signal<ReadonlySet<ScTreeItem<V>>>(new Set());

  /** Expand all on: branches open as they appear, until one is closed. */
  readonly expandingAll = signal(false);

  /** An item to show once it is there (`reveal`). */
  private readonly revealing = signal<{ value: V } | null>(null);

  private readonly class = computed(() =>
    cn('flex flex-col gap-px outline-none', this.classInput()),
  );

  constructor() {
    bindInput(
      this.ariaTree.multi,
      computed(() => this.mode() === 'multiple'),
    );
    bindInput(
      this.ariaTree.selectionMode,
      computed(() =>
        this.activation() === 'automatic' ? 'follow' : 'explicit',
      ),
    );
    bindInput(
      this.ariaTree.nav,
      computed(() => this.current() !== null),
    );
    bindInput(this.ariaTree.softDisabled, this.focusableWhenDisabled);
    // A navigation tree: its value is the current page.
    afterRenderEffect({
      write: () => {
        const current = this.current();
        if (current === null) return;
        untracked(() => {
          const value = this.ariaTree.value();
          if (value.length !== 1 || value[0] !== current)
            this.ariaTree.value.set([current]);
        });
      },
    });
    // Reveal: its ancestors opened, then scrolled to.
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
          item.element.scrollIntoView({ block: 'nearest' });
        });
      },
    });
    // Before Aria's handlers (capture): the indicator and the checkbox
    // select nothing; Space checks.
    const onPress = (event: MouseEvent) => this.beforePress(event);
    const onSpace = (event: KeyboardEvent) => this.checkOnSpace(event);
    this.element.addEventListener('click', onPress, true);
    this.element.addEventListener('keydown', onSpace, true);
    inject(DestroyRef).onDestroy(() => {
      this.element.removeEventListener('click', onPress, true);
      this.element.removeEventListener('keydown', onSpace, true);
    });
  }

  register(item: ScTreeItem<V>): void {
    this.items.update((items) => new Set(items).add(item));
  }

  unregister(item: ScTreeItem<V>): void {
    this.items.update((items) => {
      const next = new Set(items);
      next.delete(item);
      return next;
    });
  }

  /** The item of this value, once it is rendered. */
  find(value: V): ScTreeItem<V> | undefined {
    for (const item of this.items()) if (item.value() === value) return item;
    return undefined;
  }

  /** An item's children, as rendered. */
  childrenOf(item: ScTreeItem<V>): ScTreeItem<V>[] {
    return [...this.items()].filter((child) => child.parentItem === item);
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
    const branches = [...this.items()]
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
   * Shows an item: opens its ancestors and scrolls to it — once it is
   * rendered (an ancestor never opened: open it with `expanded`).
   */
  reveal(value: V): void {
    this.revealing.set({ value });
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

  /** The item around a node: the nearest one. */
  private itemAt(node: EventTarget | null): ScTreeItem<V> | undefined {
    const element = (node as Element | null)?.closest?.('li[scTreeItem]');
    for (const item of this.items()) if (item.element === element) return item;
    return undefined;
  }

  /**
   * Before Aria's press (capture), which focuses the item, selects it and
   * opens or closes it. On the indicator or the checkbox, the selection is
   * kept as it was — the indicator only opens or closes, the checkbox only
   * checks; the checkbox and, with `expandOnPress` off, the row don't open
   * or close it. Put back once Aria has handled the press.
   */
  private beforePress(event: MouseEvent): void {
    const item = this.itemAt(event.target);
    if (!item) return;
    const target = event.target as Node;
    const onIndicator = !!item.indicator?.contains(target);
    const onCheckbox = !!item.checkbox?.contains(target);
    const keepOpen =
      item.branch() && (onCheckbox || (!this.expandOnPress() && !onIndicator));
    const value = item.value();
    const wasOpen = this.isExpanded(value);
    const selection = this.ariaTree.value();
    // Added now, during the capture: called in the bubble phase, after Aria's.
    const after = (handled: Event) => {
      if (handled !== event) return;
      if (onIndicator || onCheckbox) {
        const now = this.ariaTree.value();
        if (
          now.length !== selection.length ||
          now.some((v, i) => v !== selection[i])
        )
          this.ariaTree.value.set(selection);
      }
      if (keepOpen) this.setExpanded(value, wasOpen);
    };
    this.element.addEventListener('click', after, { once: true });
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const item = this.itemAt(event.target);
    if (!item || event.target !== item.element) return;
    // A link's row: Enter follows it.
    if (event.key === 'Enter') item.followLink();
  }

  /** Before Aria's keys (capture): Space checks the focused item. */
  private checkOnSpace(event: KeyboardEvent): void {
    if (event.key !== ' ' || !this.checkable()) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
      return;
    const item = this.itemAt(event.target);
    if (!item || event.target !== item.element) return;
    event.preventDefault();
    event.stopPropagation();
    this.toggleCheck(item);
  }
}
