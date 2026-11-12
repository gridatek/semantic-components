import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'th[scTableHeaderCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTableHeaderCell {
  private readonly styles = injectPreset().table;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.headerCell, this.classInput()),
  );
}
