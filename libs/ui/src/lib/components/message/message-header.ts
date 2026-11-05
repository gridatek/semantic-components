import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: 'div[scMessageHeader]',
  host: {
    'data-slot': 'message-header',
    '[class]': 'class()',
  },
})
export class ScMessageHeader {
  private readonly styles = injectPreset().message;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.header, this.classInput()),
  );
}
