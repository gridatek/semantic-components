import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'p[scItemDescription]',
  host: {
    'data-slot': 'item-description',
    '[class]': 'class()',
  },
})
export class ScItemDescription {
  private readonly styles = injectPreset().item;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
