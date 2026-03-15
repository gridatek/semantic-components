import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: '[scSpeedDialActionList]',
  host: {
    'data-slot': 'speed-dial-action-list',
    role: 'menu',
    '[attr.aria-hidden]': '!speedDial.open()',
    '[class]': 'class()',
  },
})
export class ScSpeedDialActionList {
  readonly speedDial = inject(SC_SPEED_DIAL);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const dir = this.speedDial.direction();
    return cn(
      'flex',
      dir === 'up' && 'flex-col-reverse items-center gap-3 mb-3',
      dir === 'down' && 'flex-col items-center gap-3 mt-3',
      dir === 'left' && 'flex-row-reverse items-center gap-3 mr-3',
      dir === 'right' && 'flex-row items-center gap-3 ml-3',
      this.classInput(),
    );
  });
}
