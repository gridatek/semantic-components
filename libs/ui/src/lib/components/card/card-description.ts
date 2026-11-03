import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: '[scCardDescription]',
  host: {
    'data-slot': 'card-description',
    '[class]': 'class()',
  },
})
export class ScCardDescription {
  private readonly styles = injectPreset().card;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
