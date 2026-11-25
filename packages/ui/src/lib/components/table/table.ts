import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'table[scTable]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTable {
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.table, this.classInput()),
  );
}
