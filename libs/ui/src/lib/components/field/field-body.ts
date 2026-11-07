import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: '[scFieldBody]',
  host: {
    'data-slot': 'field-body',
    '[class]': 'class()',
  },
})
export class ScFieldBody {
  private readonly styles = injectPreset().field;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.body, this.classInput()),
  );
}
