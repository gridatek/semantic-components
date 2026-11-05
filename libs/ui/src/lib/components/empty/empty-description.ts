import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scEmptyDescription]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmptyDescription {
  private readonly styles = injectPreset().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
