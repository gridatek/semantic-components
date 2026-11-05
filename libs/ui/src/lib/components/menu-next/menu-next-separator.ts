import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A line between items. */
@Directive({
  selector: '[scMenuNextSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[class]': 'class()',
  },
})
export class ScMenuNextSeparator {
  private readonly styles = injectPreset().menu;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
