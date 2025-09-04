import { Directive, booleanAttribute, computed, input, linkedSignal } from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 pointer-fine:cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  host: {
    '[class]': 'class()',
    '[attr.type]': 'type()',
    '[attr.data-disabled]': 'disabled()',
  },
})
export class ScButtonBase {
  readonly variantInput = input<ButtonVariants['variant']>('primary', {
    alias: 'variant',
  });
  protected readonly variant = linkedSignal<ButtonVariants['variant']>(() => this.variantInput());

  readonly sizeInput = input<ButtonVariants['size']>('default', {
    alias: 'size',
  });
  protected readonly size = linkedSignal<ButtonVariants['size']>(() => this.sizeInput());

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.classInput()),
  );

  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  protected readonly disabled = linkedSignal<boolean>(() => this.disabledInput());

  readonly type = input<'submit' | 'reset' | 'button'>('button');
}
