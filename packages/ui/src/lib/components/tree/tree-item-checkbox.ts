import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { setInput } from '../../utils';
import { ScCheckbox } from '../checkbox/checkbox';
import type { ScTree } from './tree';
import { ScTreeItem } from './tree-item';
import { SC_TREE } from './tree-tokens';

/**
 * An item's checkbox, on an `scCheckbox` in its row (`checkable` tree):
 * ticked, empty, or half-ticked while only some of what it holds is. The item
 * says it (`aria-checked`) and Space checks it: the box is out of the tab
 * order and hidden from screen readers — named by its item all the same
 * (`aria-labelledby`): a form control with no label is one to WAVE, hidden
 * or not.
 *
 * ```html
 * <input type="checkbox" scCheckbox scTreeItemCheckbox />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scTreeItemCheckbox]',
  host: {
    tabindex: '-1',
    'aria-hidden': 'true',
    '[attr.aria-labelledby]': 'itemId()',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
    // A press doesn't focus it (hidden from screen readers): the item
    // takes the focus, as on a press on its row.
    '(mousedown)': '$event.preventDefault()',
  },
})
export class ScTreeItemCheckbox {
  private readonly tree = inject(SC_TREE) as ScTree<unknown>;
  private readonly item = inject<ScTreeItem<unknown>>(ScTreeItem);
  private readonly checkbox = inject(ScCheckbox, { self: true });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
  /** Its item's id: what names it. */
  private readonly itemId = computed(() => this.item.ariaItem.id());

  constructor() {
    this.item.checkbox =
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    effect(() => {
      const state = this.item.checkState();
      this.checkbox.checked.set(state === 'checked');
      setInput(this.checkbox.indeterminate, state === 'mixed');
    });
  }

  private onClick(event: MouseEvent): void {
    // The tree's state decides: the box shows it back.
    event.preventDefault();
    this.tree.toggleCheck(this.item);
  }
}
