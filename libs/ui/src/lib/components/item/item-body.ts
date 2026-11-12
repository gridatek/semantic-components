import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scItemBody]',
  host: {
    'data-slot': 'item-body',
    '[class]': 'class()',
  },
})
export class ScItemBody {
  private readonly styles = injectPreset().item;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.body, this.classInput()),
  );
}
