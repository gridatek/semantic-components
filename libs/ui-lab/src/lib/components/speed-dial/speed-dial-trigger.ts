import { MenuTrigger } from '@angular/aria/menu';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: 'button[scSpeedDialTrigger]',
  // aria MenuTrigger: toggles on click/Enter/Space/ArrowDown, sets
  // aria-expanded/aria-haspopup, focuses the first action on open.
  hostDirectives: [MenuTrigger],
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSpeedDialTrigger {
  readonly speedDial = inject(SC_SPEED_DIAL);

  private readonly trigger = inject(MenuTrigger);

  readonly classInput = input<string>('', { alias: 'class' });

  constructor() {
    bindInput(this.trigger.menu, this.speedDial.menu);

    // trigger → speed dial
    effect(() => {
      const expanded = this.trigger.expanded();
      untracked(() => this.speedDial.open.set(expanded));
    });
    // speed dial → trigger (programmatic open/close, outside click)
    effect(() => {
      const open = this.speedDial.open();
      untracked(() => {
        if (open === this.trigger.expanded()) return;
        if (open) this.trigger.open();
        else this.trigger.close();
      });
    });
  }

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-primary text-primary-foreground',
      'shadow-lg hover:shadow-xl',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.sizeClasses(),
      this.classInput(),
    ),
  );

  private sizeClasses(): string {
    const sizes = {
      sm: 'h-12 w-12',
      md: 'h-14 w-14',
      lg: 'h-16 w-16',
    };
    return sizes[this.speedDial.size()];
  }
}
