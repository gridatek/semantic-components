import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'td[scTableCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCell {
  private readonly styles = injectStyle().table;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.cell, this.classInput()),
  );
}
