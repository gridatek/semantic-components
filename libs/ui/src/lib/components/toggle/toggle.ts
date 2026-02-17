import { computed, Directive, input, model } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

export const toggleVariants = cva(
  "hover:text-foreground aria-pressed:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[state=on]:bg-muted gap-1 rounded-lg text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4 group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-input hover:bg-muted border bg-transparent',
      },
      size: {
        default: 'h-8 min-w-8 px-2',
        sm: 'h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]',
        lg: 'h-9 min-w-9 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ScToggleVariants = VariantProps<typeof toggleVariants>;

@Directive({
  selector: 'button[scToggle]',
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
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected toggle(): void {
    if (!this.disabled()) {
      this.pressed.update((v) => !v);
    }
  }
}
