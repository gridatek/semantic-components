import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { SC_NUMBER_SCRUB_AREA } from './number-scrub-area';

/**
 * Stands in for the mouse pointer while scrubbing (it's locked): write an
 * icon in it. Put it inside the `scNumberScrubArea`.
 */
@Directive({
  selector: '[scNumberScrubAreaCursor]',
  host: {
    'data-slot': 'number-scrub-area-cursor',
    'aria-hidden': 'true',
    '[hidden]': '!scrubArea.locked()',
    '[class]': 'class()',
    '[style.left.px]': 'scrubArea.cursorX()',
    '[style.top.px]': 'scrubArea.cursorY()',
  },
})
export class ScNumberScrubAreaCursor {
  protected readonly scrubArea = inject(SC_NUMBER_SCRUB_AREA);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
