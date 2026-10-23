import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScEmojiPickerState } from './emoji-picker-state';
import type { ScEmojiListRow as Row } from './emoji-picker-types';

/** A row of emojis (write its `emojis` as `scEmojiPickerEmoji` buttons). */
@Directive({
  selector: 'div[scEmojiPickerRow]',
  host: {
    'data-slot': 'emoji-picker-row',
    role: 'row',
    '[attr.aria-rowindex]': 'row().index + 1',
    '[class]': 'class()',
    // A category's first row: its header is above it.
    '[style.margin-top.px]':
      'row().startsCategory ? state.headerHeight() : null',
  },
})
export class ScEmojiPickerRow {
  protected readonly state = inject(ScEmojiPickerState);

  readonly row = input.required<Row>({ alias: 'scEmojiPickerRow' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex scroll-my-1 px-1 [contain:content]', this.classInput()),
  );
}
