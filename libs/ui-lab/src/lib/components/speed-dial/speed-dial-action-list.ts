import { Menu } from '@angular/aria/menu';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: '[scSpeedDialActionList]',
  hostDirectives: [Menu],
  host: {
    // Closed actions stay rendered (for the animation) but must not be
    // reachable: inert, not aria-hidden (which would hide focusable items).
    '[attr.inert]': 'speedDial.open() ? null : true',
    '[class]': 'class()',
  },
})
export class ScSpeedDialActionList {
  readonly speedDial = inject(SC_SPEED_DIAL);

  constructor() {
    this.speedDial.menu.set(inject(Menu));
  }

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const dir = this.speedDial.direction();
    return cn(
      'flex',
      dir === 'up' && 'flex-col-reverse items-center gap-3 mb-3',
      dir === 'down' && 'flex-col items-center gap-3 mt-3',
      dir === 'left' && 'flex-row-reverse items-center gap-3 me-3',
      dir === 'right' && 'flex-row items-center gap-3 ms-3',
      this.classInput(),
    );
  });
}
