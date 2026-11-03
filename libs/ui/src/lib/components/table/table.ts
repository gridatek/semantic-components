import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'table[scTable]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTable {
  private readonly styles = injectPreset().table;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.table, this.classInput()),
  );
}
