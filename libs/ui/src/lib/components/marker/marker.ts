import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cva } from 'class-variance-authority';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

export type ScMarkerVariant = 'default' | 'separator' | 'border';

// The same in every style: the variants. The base is the preset's.
const variants = cva('', {
  variants: {
    variant: {
      default: '',
      separator:
        'before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-border',
      border: 'border-b border-border pb-2',
    },
  },
});

/**
 * A note between messages — a status, a divider, an action. On a link or a
 * button it does what it says (a button gets `type="button"`). Streaming or
 * in progress: give it `role="status"`.
 */
@Directive({
  selector: 'div[scMarker], a[scMarker], button[scMarker]',
  host: {
    'data-slot': 'marker',
    '[attr.data-variant]': 'variant()',
    '[attr.type]': "isButton ? 'button' : null",
    '[class]': 'class()',
  },
})
export class ScMarker {
  private readonly styles = injectPreset().marker;
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScMarkerVariant>('default');

  protected readonly isButton =
    inject(ElementRef<HTMLElement>).nativeElement.tagName === 'BUTTON';

  protected readonly class = computed(() =>
    cn(
      this.styles.root,
      variants({ variant: this.variant() }),
      '[a,button]:transition-colors [a,button]:hover:text-foreground [button]:cursor-pointer',
      this.classInput(),
    ),
  );
}
