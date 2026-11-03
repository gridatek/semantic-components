import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: '[scCardTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCardTitle {
  private readonly styles = injectPreset().card;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
