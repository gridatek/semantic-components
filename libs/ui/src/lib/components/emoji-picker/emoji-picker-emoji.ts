import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_EMOJI_FONT_FAMILY } from './emoji-picker-data';
import { ScEmojiPickerState } from './emoji-picker-state';
import type { ScEmojiListEmoji as Emoji } from './emoji-picker-types';

/**
 * An emoji of the list (write `emoji.emoji` in it): picks it; `data-active`
 * when hovered or moved to with the arrow keys. Named by its label.
 */
@Directive({
  selector: 'button[scEmojiPickerEmoji]',
  host: {
    'data-slot': 'emoji-picker-emoji',
    type: 'button',
    role: 'gridcell',
    tabindex: '-1',
    '[attr.aria-colindex]': 'emoji().columnIndex + 1',
    '[attr.aria-label]': 'emoji().label',
    '[attr.aria-selected]': 'active() || null',
    '[attr.data-active]': 'active() || null',
    '[class]': 'class()',
    '[style.font-family]': 'font',
    '(click)': 'select()',
    // Keep focus where it is (the search field).
    '(pointerdown)': '$event.preventDefault()',
    '(pointerenter)': 'hover()',
    '(pointerleave)': 'state.resetActive()',
  },
})
export class ScEmojiPickerEmoji {
  protected readonly state = inject(ScEmojiPickerState);

  readonly emoji = input.required<Emoji>({ alias: 'scEmojiPickerEmoji' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly font = SC_EMOJI_FONT_FAMILY;

  protected readonly active = computed(() => {
    const active = this.state.activeEmoji();
    const emoji = this.emoji();
    return (
      !!active &&
      active.rowIndex === emoji.rowIndex &&
      active.columnIndex === emoji.columnIndex
    );
  });

  protected readonly class = computed(() =>
    cn(
      'data-active:bg-accent flex size-7 items-center justify-center rounded-sm text-base',
      this.classInput(),
    ),
  );

  protected select(): void {
    const { emoji, label } = this.emoji();
    this.state.onSelect({ emoji, label });
  }

  protected hover(): void {
    const { columnIndex, rowIndex } = this.emoji();
    this.state.setActive('pointer', columnIndex, rowIndex);
  }
}
