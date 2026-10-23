import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScSpeedDial } from './speed-dial';

/**
 * An action's label — inside the action, so its name — shown beside it as a
 * chip; on a quarter circle, only read.
 */
@Directive({
  selector: '[scSpeedDialLabel]',
  host: {
    'data-slot': 'speed-dial-label',
    '[class]': 'class()',
  },
})
export class ScSpeedDialLabel {
  private readonly dial = inject(ScSpeedDial);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const direction = this.dial.direction();
    const vertical = direction === 'up' || direction === 'down';
    return cn(
      this.dial.arc()
        ? 'sr-only'
        : [
            'bg-popover text-popover-foreground pointer-events-none absolute rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap shadow-sm',
            vertical
              ? 'end-full top-1/2 me-3 -translate-y-1/2'
              : 'bottom-full left-1/2 mb-2 -translate-x-1/2',
          ],
      this.classInput(),
    );
  });
}
