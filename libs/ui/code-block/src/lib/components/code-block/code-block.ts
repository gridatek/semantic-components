import { Directive, computed, input } from '@angular/core';
import type { ScCodeBlockVariant } from '@semantic-components/presets';
import { cn, injectPreset } from '@semantic-components/ui';

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

  private readonly styles = injectPreset().codeBlock;

  protected readonly class = computed(() => {
    const root = this.styles.root({ variant: this.variant() });
    return cn(root, editorStates(root), this.classInput());
  });
}

/**
 * A code editor in the block (the Code Editor): the preset's focus look for
 * the code, given to the editor while it has focus; a ring when invalid.
 */
function editorStates(root: string): string {
  const focused = 'has-[>[data-slot=code-block-content]:focus-visible]:';
  return [
    ...root
      .split(/s+/)
      .filter((c) => c.includes(focused))
      .map((c) =>
        c.replace(focused, 'has-[>[data-slot=code-editor]:focus-within]:'),
      ),
    'has-[>[data-slot=code-editor][data-invalid]]:ring-3',
    'has-[>[data-slot=code-editor][data-invalid]]:ring-destructive/20',
    'has-[>[data-slot=code-editor][data-invalid]]:border-destructive',
  ].join(' ');
}
