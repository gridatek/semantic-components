import { Directive, computed, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

// The same in every style: where the row sits. Its look is the preset's.
const position = cva('', {
  variants: {
    side: {
      top: 'top-0 -translate-y-3/4',
      bottom: 'bottom-0 translate-y-3/4',
    },
    align: {
      start: 'start-3',
      end: 'end-3',
    },
  },
});

/**
 * Reactions or quick actions over the bubble's edge. A row of emoji: name it
 * as one image (`role="img"`, `aria-label`). Buttons: name each.
 */
@Directive({
  selector: 'div[scBubbleReactions]',
  host: {
    // align is our input: the HTML attribute would align the text in a div.
    '[attr.align]': 'null',
    'data-slot': 'bubble-reactions',
    '[attr.data-side]': 'side()',
    '[attr.data-align]': 'align()',
    '[class]': 'class()',
  },
})
export class ScBubbleReactions {
  private readonly styles = injectPreset().bubble;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input<'top' | 'bottom'>('bottom');
  readonly align = input<'start' | 'end'>('end');

  protected readonly class = computed(() =>
    cn(
      this.styles.reactions,
      position({ side: this.side(), align: this.align() }),
      this.classInput(),
    ),
  );
}
