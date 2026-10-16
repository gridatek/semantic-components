import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpeedDialNext } from './speed-dial-next';

/** The actions: a menu, placed by the dial's direction; unreachable while closed. */
@Directive({
  selector: '[scSpeedDialNextList]',
  host: {
    'data-slot': 'speed-dial-list',
    role: 'menu',
    '[id]': 'dial.listId',
    '[attr.aria-labelledby]': 'dial.triggerId',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-open]': 'dial.open() || null',
    '[attr.inert]': 'dial.open() ? null : ""',
    '[class]': 'class()',
  },
})
export class ScSpeedDialNextList {
  protected readonly dial = inject(ScSpeedDialNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly orientation = computed(() => {
    if (this.dial.arc()) return null;
    const direction = this.dial.direction();
    return direction === 'up' || direction === 'down'
      ? 'vertical'
      : 'horizontal';
  });

  protected readonly class = computed(() => {
    const placed: Record<string, string> = {
      up: 'bottom-full left-1/2 mb-3 -translate-x-1/2 flex-col-reverse',
      down: 'top-full left-1/2 mt-3 -translate-x-1/2 flex-col',
      left: 'right-full top-1/2 me-6 -translate-y-1/2 flex-row-reverse gap-6',
      right: 'left-full top-1/2 ms-6 -translate-y-1/2 flex-row gap-6',
    };
    return cn(
      'absolute',
      this.dial.arc()
        ? 'top-1/2 left-1/2 size-0'
        : ['flex items-center gap-3', placed[this.dial.direction()]],
      !this.dial.open() && 'pointer-events-none',
      this.classInput(),
    );
  });
}
