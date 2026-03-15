import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: 'button[scSpeedDialTrigger]',
  host: {
    'data-slot': 'speed-dial-trigger',
    type: 'button',
    '[attr.aria-expanded]': 'speedDial.open()',
    '[attr.aria-haspopup]': '"menu"',
    '[class]': 'class()',
    '(click)': 'speedDial.toggle()',
  },
})
export class ScSpeedDialTrigger {
  readonly speedDial = inject(SC_SPEED_DIAL);

  readonly classInput = input<string>('', { alias: 'class' });

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
