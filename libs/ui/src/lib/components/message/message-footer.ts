import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';

@Directive({
  selector: 'div[scMessageFooter]',
  host: {
    'data-slot': 'message-footer',
    '[class]': 'class()',
  },
})
export class ScMessageFooter {
  private readonly styles = injectPreset().message;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.footer, this.classInput()),
  );
}
