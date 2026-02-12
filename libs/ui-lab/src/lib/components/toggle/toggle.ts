import { computed, Directive, input, model } from '@angular/core';
import { cn } from '../../utils';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'default' | 'sm' | 'lg';

const variantClasses: Record<ToggleVariant, string> = {
  default: 'bg-transparent',
  outline:
    'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses: Record<ToggleSize, string> = {
  default: 'h-10 px-3',
  sm: 'h-9 px-2.5',
  lg: 'h-11 px-5',
};

@Directive({
  selector: 'button[sc-toggle]',
  host: {
    'data-slot': 'toggle',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[disabled]': 'disabled()',
    '(click)': 'toggle()',
  },
})
export class ScToggle {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly pressed = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly variant = input<ToggleVariant>('default');
  readonly size = input<ToggleSize>('default');

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      this.pressed() && 'bg-accent text-accent-foreground',
      variantClasses[this.variant()],
      sizeClasses[this.size()],
      this.classInput(),
    ),
  );

  protected toggle(): void {
    if (!this.disabled()) {
      this.pressed.update((v) => !v);
    }
  }
}
