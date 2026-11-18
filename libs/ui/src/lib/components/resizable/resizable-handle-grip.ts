import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * The handle's visible grip, in the style's look: a short bar across the
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
  private readonly styles = injectStyle().resizable;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.grip, this.classInput()),
  );
}
