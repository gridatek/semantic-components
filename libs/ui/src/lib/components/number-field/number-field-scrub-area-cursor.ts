import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_NUMBER_FIELD_SCRUB_AREA } from './number-field-scrub-area';

/**
 * Stands in for the mouse pointer while scrubbing (it's locked): write an
 * icon in it. Put it inside the `scNumberFieldScrubArea`.
 */
@Directive({
  selector: '[scNumberFieldScrubAreaCursor]',
  host: {
    'data-slot': 'number-field-scrub-area-cursor',
    'aria-hidden': 'true',
    '[hidden]': '!scrubArea.locked()',
    '[class]': 'class()',
    '[style.left.px]': 'scrubArea.cursorX()',
    '[style.top.px]': 'scrubArea.cursorY()',
  },
})
export class ScNumberFieldScrubAreaCursor {
  protected readonly scrubArea = inject(SC_NUMBER_FIELD_SCRUB_AREA);

  constructor() {
    // Its area locks the pointer only when a cursor part can stand in for it.
    this.scrubArea.cursors.update((n) => n + 1);
    inject(DestroyRef).onDestroy(() =>
      this.scrubArea.cursors.update((n) => n - 1),
    );
  }

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
