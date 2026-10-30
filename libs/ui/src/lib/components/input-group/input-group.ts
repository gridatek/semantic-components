import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * An input or a textarea with addons — icons, text, buttons — in one box: the
 * group draws the border, the ring and the corners, and gives its control
 * (`[data-slot=control]`: `scInput`, `scTextarea`, or a control of yours) the
 * look of being inside. Its classes are the preset's.
 */
@Directive({
  selector: 'div[scInputGroup]',
  host: {
    // Read by a control group around it, and by the parts that join it.
    'data-slot': 'input-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScInputGroup {
  private readonly styles = injectPreset().inputGroup;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
