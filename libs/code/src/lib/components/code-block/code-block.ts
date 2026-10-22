import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { type VariantProps, cva } from 'class-variance-authority';

const codeBlockVariants = cva(
  'group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg text-sm has-[>[data-slot=code-block-content]:focus-visible]:ring-3 has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50 data-[size=sm]:text-xs',
  {
    variants: {
      variant: {
        default:
          'border border-input text-foreground has-[>[data-slot=code-block-content]:focus-visible]:border-ring dark:bg-input/30',
        destructive:
          'border border-destructive/30 text-destructive dark:border-destructive/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ScCodeBlockVariants = VariantProps<typeof codeBlockVariants>;

/**
 * A block of code: its header (title, actions), its content — highlighted
 * when the app provides a highlighter (`provideCodeHighlighter()`) — and a
 * footer. `destructive` for an error's output; `size="sm"` for a tighter one.
 */
@Directive({
  selector: 'div[scCodeBlock]',
  host: {
    'data-slot': 'code-block',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScCodeBlock {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScCodeBlockVariants['variant']>('default');
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(codeBlockVariants({ variant: this.variant() }), this.classInput()),
  );
}
