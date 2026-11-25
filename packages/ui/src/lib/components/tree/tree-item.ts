import type { TreeItemGroup } from '@angular/aria/tree';
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
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { bindInput, setInput } from '../../utils';
import type { ScTree } from './tree';
import { ScTreeAriaItem } from './tree-aria-item';
import { SC_TREE } from './tree-tokens';

/** The item a group's children belong to: given by `scTreeGroupContent`. */
export abstract class ScTreeParent<V = unknown> {
  abstract readonly owner: ScTreeItem<V>;
  /** Angular Aria's group: the children's `parent`. */
  abstract readonly ariaGroup: TreeItemGroup<V>;
}

/**
 * An item: Angular Aria's tree item (`ngTreeItem`), its place found by its
 * tree or group — no `parent` to pass. A branch when it holds a `scTreeGroup`.
 * Its row is `scTreeItemLabel`; it takes the focus. Children from data, in a
 * template of yours: stamp it with `ngTemplateOutletInjector="outlet"` so
 * they find this item.
 */
@Directive({
  selector: 'li[scTreeItem]',
  exportAs: 'scTreeItem',
  hostDirectives: [
    { directive: ScTreeAriaItem, inputs: ['value', 'disabled'] },
  ],
  host: {
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-busy]': 'loading() || null',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(blur)': 'focusVisible.set(false)',
  },
})
export class ScTreeItem<V = string> {
  private readonly tree = inject(SC_TREE) as ScTree<V>;
  /** Angular Aria's item, under this one. */
  readonly ariaItem = inject<ScTreeAriaItem<V>>(ScTreeAriaItem);
  readonly element =
    inject<ElementRef<HTMLLIElement>>(ElementRef).nativeElement;
  private readonly parent = inject(ScTreeParent, {
    optional: true,
  }) as ScTreeParent<V> | null;

  /** The item whose group holds this one; `null` at the top. */
  readonly parentItem: ScTreeItem<V> | null = this.parent?.owner ?? null;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its text for typeahead; its row's text by default. */
  readonly label = input<string>();
  /** Selectable, in a tree that selects: off, an item that only opens (a folder). */
  readonly selectable = input(true, { transform: booleanAttribute });
  /** Its children are being loaded: `aria-busy`, and the label's `data-loading`. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Its children failed to load: the label's `data-failed`. */
  readonly failed = input(false, { transform: booleanAttribute });

  readonly value = computed(() => this.ariaItem.value());
  /** Holds a group: a branch. */
  readonly branch = signal(false);
  readonly expanded = computed(
    () => this.branch() && this.tree.isExpanded(this.value()),
  );
  readonly selected = computed(() => !!this.ariaItem.selected());
  readonly current = computed(() => {
    const current = this.tree.current();
    return current !== null && current === this.value();
  });
  readonly level = computed(() => this.ariaItem.level());
  readonly isDisabled = computed(
    () => this.ariaItem.disabled() || this.ariaItem.tree().disabled(),
  );
  readonly checkState = computed(() =>
    this.tree.checkable() ? this.tree.checkState(this) : null,
  );
  /** Selectable now: a tree that selects, and this item. */
  readonly selectableNow = computed(
    () => this.tree.itemsSelectable() && this.selectable(),
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

  private readonly ariaChecked = computed(() => {
    const state = this.checkState();
    if (!state) return null;
    return state === 'mixed' ? 'mixed' : state === 'checked';
  });

  private readonly class = computed(() =>
    cn('flex flex-col outline-none', this.classInput()),
  );

  constructor() {
    // Its place: the group it is in, else the tree — set before Aria's item
    // registers.
    setInput(
      this.ariaItem.parent,
      this.parent ? this.parent.ariaGroup : this.tree.ariaTree,
    );
    // A group's content stays once rendered: it closes with its animation,
    // and its items keep their place for reveal and the checkboxes.
    this.ariaItem.preserveContent.set(true);
    bindInput(this.ariaItem.selectable, this.selectableNow);
    // Typeahead: its row's text, not its children's.
    bindInput(
      this.ariaItem.label,
      computed(
        () => this.label() ?? this.labelElement()?.textContent?.trim() ?? '',
      ),
    );

    this.tree.register(this);
    inject(DestroyRef).onDestroy(() => this.tree.unregister(this));

    // The tree's expanded list → Aria's item, and back.
    effect(() => {
      const open = this.tree.isExpanded(this.value());
      untracked(() => {
        if (this.ariaItem.expanded() !== open) this.ariaItem.expanded.set(open);
      });
    });
    this.ariaItem.expanded.subscribe((open) =>
      this.tree.setExpanded(this.value(), open),
    );
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
