import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * A frame round a box, in the app's preset: the style's card radius, ring and
 * shadow — round an aspect ratio, a table's container, anything. Only the
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
  private readonly frame = injectPreset().frame;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.frame, this.classInput()));
}
