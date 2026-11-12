import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scEmpty]',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmpty {
  private readonly styles = injectPreset().empty;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.root, this.classInput()),
  );
}
