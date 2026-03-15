import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: '[scSpeedDialAction]',
  host: {
    'data-slot': 'speed-dial-action',
    role: 'menuitem',
    '[class]': 'class()',
    '[style.transition-delay]': 'transitionDelay()',
  },
})
export class ScSpeedDialAction {
  readonly speedDial = inject(SC_SPEED_DIAL);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly index = computed(() =>
    this.speedDial.actions().indexOf(this),
  );

  protected readonly transitionDelay = computed(() => {
    const i = this.index();
    const total = this.speedDial.actions().length;
    return this.speedDial.open() ? `${i * 50}ms` : `${(total - 1 - i) * 30}ms`;
  });

  protected readonly class = computed(() => {
    const isOpen = this.speedDial.open();
    const dir = this.speedDial.direction();
    return cn(
      'flex items-center gap-3 transition-all duration-200 ease-out',
      dir === 'left' ? 'flex-row-reverse' : 'flex-row',
      isOpen
        ? 'opacity-100 scale-100 translate-y-0 translate-x-0'
        : 'opacity-0 scale-75 pointer-events-none',
      !isOpen && dir === 'up' && 'translate-y-4',
      !isOpen && dir === 'down' && '-translate-y-4',
      !isOpen && dir === 'left' && 'translate-x-4',
      !isOpen && dir === 'right' && '-translate-x-4',
      this.classInput(),
    );
  });
}
