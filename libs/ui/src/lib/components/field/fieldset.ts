import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'fieldset[scFieldset]',
  host: {
    '[class]': 'class()',
  },
})
export class ScFieldset {
  private readonly styles = injectPreset().field;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.set, this.classInput()),
  );
}
