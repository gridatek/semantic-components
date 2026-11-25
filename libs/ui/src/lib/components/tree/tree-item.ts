import {
  DeferredContentAware,
  TreeItemPattern,
  convertGetterSetterToWritableSignalLike,
  sortDirectives,
} from '@angular/aria/private';
import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import type { ScTree } from './tree';
import { SC_TREE } from './tree-tokens';

/** The item a group's children belong to: given by `scTreeGroupContent`. */
export abstract class ScTreeParent<V = unknown> {
  abstract readonly owner: ScTreeItem<V>;
}

/**
 * An item: Angular Aria's tree item pattern, its place found by its tree or
 * group — no `parent` to pass. A branch when it holds a `scTreeGroup`.
 * Its row is `scTreeItemLabel`; it takes the focus. Children from data,
 * in a template of yours: stamp it with `ngTemplateOutletInjector="outlet"`
 * so they find this item.
 */
@Directive({
  selector: 'li[scTreeItem]',
  exportAs: 'scTreeItem',
  // Its group's content renders the first time it opens, then stays.
  hostDirectives: [DeferredContentAware],
  host: {
    role: 'treeitem',
    '[id]': 'pattern.id()',
    '[attr.aria-expanded]': 'branch() ? expanded() : null',
    '[attr.aria-selected]': 'pattern.selected()',
    '[attr.aria-current]': 'pattern.current()',
    '[attr.aria-disabled]': 'pattern.disabled()',
    '[attr.aria-level]': 'pattern.level()',
    '[attr.aria-setsize]': 'pattern.setsize()',
    '[attr.aria-posinset]': 'pattern.posinset()',
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-busy]': 'loading() || null',
    '[tabindex]': 'pattern.tabIndex()',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(blur)': 'focusVisible.set(false)',
  },
})
export class ScTreeItem<V = string> {
  private readonly tree = inject(SC_TREE) as ScTree<V>;
  readonly element =
    inject<ElementRef<HTMLLIElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId('sc-tree-item-');
  private readonly deferred = inject(DeferredContentAware);

  /** The item whose group holds this one; `null` at the top. */
  readonly parentItem: ScTreeItem<V> | null =
    (inject(ScTreeParent, { optional: true })?.owner as ScTreeItem<V> | null) ??
    null;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly value = input.required<V>();
  readonly disabledInput = input(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  /** Its text for typeahead; its own text by default. */
  readonly label = input<string>();
  /** Selectable, in a tree that selects: off, an item that only opens (a folder). */
  readonly selectable = input(true, { transform: booleanAttribute });
  /** Its children are being loaded: `aria-busy`, and the label's `data-loading`. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Its children failed to load: the label's `data-failed`. */
  readonly failed = input(false, { transform: booleanAttribute });

  /** Holds a group: a branch. */
  readonly branch = signal(false);
  readonly expanded = computed(
    () => this.branch() && this.tree.isExpanded(this.value()),
  );
  readonly selected = computed(() => !!this.pattern.selected());
  readonly current = computed(() => !!this.pattern.current());
  readonly level = computed(() => this.pattern.level());
  readonly isDisabled = computed(
    () => this.disabledInput() || this.tree.disabled(),
  );
  readonly checkState = computed(() =>
    this.tree.checkable() ? this.tree.checkState(this) : null,
  );
  /** Focused from the keyboard: its row shows the ring. */
  readonly focusVisible = signal(false);

  /** Its indicator and checkbox, so a press on them is told apart. */
  indicator: HTMLElement | null = null;
  checkbox: HTMLElement | null = null;
  /** Its row, when it is a link: Enter follows it. */
  link: HTMLAnchorElement | null = null;
  /** Its row: its text is what typeahead matches. */
  readonly labelElement = signal<HTMLElement | null>(null);

  /** Angular Aria's tree item pattern. */
  readonly pattern: TreeItemPattern<V> = new TreeItemPattern<V>({
    id: computed(() => this.idInput() || this.fallbackId),
    value: this.value,
    element: () => this.element,
    disabled: this.disabledInput,
    selectable: computed(
      () => this.tree.itemsSelectable() && this.selectable(),
    ),
    // Its row's text, not its children's.
    searchTerm: computed(
      () => this.label() ?? this.labelElement()?.textContent?.trim() ?? '',
    ),
    // Open or closed: the tree's list.
    expanded: convertGetterSetterToWritableSignalLike(
      () => this.tree.isExpanded(this.value()),
      (open: boolean) => this.tree.setExpanded(this.value(), open),
    ),
    hasChildren: this.branch,
    children: computed(() =>
      this.tree
        .childrenOf(this)
        .sort(sortDirectives)
        .map((child) => child.pattern),
    ),
    tree: () => this.tree.pattern,
    parent: () => this.parentItem?.pattern ?? this.tree.pattern,
  });

  private readonly ariaChecked = computed(() => {
    const state = this.checkState();
    if (!state) return null;
    return state === 'mixed' ? 'mixed' : state === 'checked';
  });

  private readonly class = computed(() =>
    cn('flex flex-col outline-none', this.classInput()),
  );

  constructor() {
    this.deferred.preserveContent.set(true);
    // Before the render: its group's content shows on the first one.
    effect(() => this.deferred.contentVisible.set(this.expanded()));
    this.tree.register(this);
    inject(DestroyRef).onDestroy(() => this.tree.unregister(this));
  }

  /** Its ancestors, nearest first. */
  ancestors(): ScTreeItem<V>[] {
    const ancestors: ScTreeItem<V>[] = [];
    for (let item = this.parentItem; item; item = item.parentItem)
      ancestors.push(item);
    return ancestors;
  }

  followLink(): void {
    this.link?.click();
  }

  private onFocus(): void {
    this.focusVisible.set(this.element.matches(':focus-visible'));
  }
}
