import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: '[scFieldTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScFieldTitle {
  private readonly styles = injectPreset().field;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
