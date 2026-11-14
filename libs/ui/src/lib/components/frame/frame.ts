import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * A frame round a box, in the app's preset: the style's card radius, ring and
 * shadow — round an aspect ratio, a table's container, anything; `size="sm"`
 * for a small box (a row, an icon's box): shadcn's smaller corners, no shadow;
 * `size="xs"` for a tiny one (a meter's track and fill): its corners only. Only the
 * look: clipping its content is the box's (the aspect ratio clips; the table's
 * container scrolls).
 */
@Directive({
  selector: '[scFrame]',
  host: {
    '[class]': 'class()',
  },
})
export class ScFrame {
  private readonly preset = injectPreset();

  readonly classInput = input<string>('', { alias: 'class' });
  /** `sm`: a small box's frame (a row, an icon's box); `xs`: a tiny box's corners (a meter's track and fill). */
  readonly size = input<'default' | 'sm' | 'xs'>('default');

  protected readonly class = computed(() =>
    cn(
      {
        default: this.preset.frame,
        sm: this.preset.frameSm,
        xs: this.preset.frameXs,
      }[this.size()],
      this.classInput(),
    ),
  );
}
