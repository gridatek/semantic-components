import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: '[scAlertTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlertTitle {
  private readonly styles = injectPreset().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.title, this.classInput()),
  );
}
