import { Directive, computed, input } from '@angular/core';
import type { ScCodeBlockVariant } from '@semantic-components/styles';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';

export type ScCodeBlockVariants = { variant?: ScCodeBlockVariant | null };

/**
 * A block of code: its header (title, actions), its content — highlighted
 * when the app provides a highlighter (`withCodeHighlighter()`) — and a
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

  private readonly styles = injectStyle().codeBlock;

  private readonly class = computed(() => {
    const root = this.styles.root({ variant: this.variant() });
    return cn(root, this.classInput());
  });
}
