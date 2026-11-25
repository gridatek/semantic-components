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
import type { ScTreeNext } from './tree-next';
import { ScTreeNextItem } from './tree-next-item';
import { SC_TREE_NEXT } from './tree-next-tokens';

/**
 * An item's checkbox, on an `scCheckbox` in its row (`checkable` tree):
 * ticked, empty, or half-ticked while only some of what it holds is. The item
 * says it (`aria-checked`) and Space checks it: the box is out of the tab
 * order and hidden from screen readers.
 *
 * ```html
 * <input type="checkbox" scCheckbox scTreeNextItemCheckbox />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scTreeNextItemCheckbox]',
  host: {
    tabindex: '-1',
    'aria-hidden': 'true',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScTreeNextItemCheckbox {
  private readonly tree = inject(SC_TREE_NEXT) as ScTreeNext<unknown>;
  private readonly item = inject<ScTreeNextItem<unknown>>(ScTreeNextItem);
  private readonly checkbox = inject(ScCheckbox, { self: true });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

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
