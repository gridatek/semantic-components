import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCardFooter]',
  host: {
    'data-slot': 'card-footer',
    '[class]': 'class()',
  },
})
export class ScCardFooter {
  private readonly styles = injectPreset().card;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
