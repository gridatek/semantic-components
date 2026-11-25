import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * Your chevron, on its SVG after the select: placed at the select's end by
 * the style, hidden from screen readers.
 */
@Directive({
  selector: 'svg[scNativeSelectIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScNativeSelectIcon {
  private readonly styles = injectStyle().nativeSelect;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.icon, this.classInput()),
  );
}
