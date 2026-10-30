import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The box around the input and the toggle: one border, one focus ring. */
@Directive({
  selector: 'div[scPasswordGroup]',
  host: {
    'data-slot': 'input-group',
    '[class]': 'class()',
  },
})
export class ScPasswordGroup {
  private readonly groupStyles = injectPreset().inputGroup;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.groupStyles, 'pe-1', this.classInput()),
  );
}
