import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'td[scTableCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableCell {
  private readonly styles = injectPreset().table;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.cell, this.classInput()),
  );
}
