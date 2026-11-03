import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCard]',
  host: {
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
})
export class ScCard {
  private readonly styles = injectPreset().card;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');

  protected readonly class = computed(() =>
    cn(this.styles.card, this.classInput()),
  );
}
