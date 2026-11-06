import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * The handle's visible grip, in the preset's look: a short bar across the
 * line (turned in a vertical group). Inside its handle; only for the eye.
 */
@Directive({
  selector: 'div[scResizableHandleGrip]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScResizableHandleGrip {
  private readonly styles = injectPreset().resizable;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.grip, this.classInput()),
  );
}
