import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_SPEED_DIAL } from './speed-dial-types';

@Directive({
  selector: 'button[scSpeedDialActionButton]',
  host: {
    'data-slot': 'speed-dial-action-button',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScSpeedDialActionButton {
  private readonly speedDial = inject(SC_SPEED_DIAL);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-secondary text-secondary-foreground',
      'shadow-md hover:shadow-lg',
      'transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md',
      this.sizeClasses(),
      this.classInput(),
    ),
  );

  private sizeClasses(): string {
    const sizes = {
      sm: 'h-10 w-10',
      md: 'h-12 w-12',
      lg: 'h-14 w-14',
    };
    return sizes[this.speedDial.size()];
  }
}
