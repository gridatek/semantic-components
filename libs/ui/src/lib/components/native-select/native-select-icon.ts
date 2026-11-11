import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Your chevron, on its SVG after the select: placed at the select's end by
 * the preset, hidden from screen readers.
 */
@Directive({
  selector: 'svg[scNativeSelectIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScNativeSelectIcon {
  private readonly styles = injectPreset().nativeSelect;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.icon, this.classInput()),
  );
}
