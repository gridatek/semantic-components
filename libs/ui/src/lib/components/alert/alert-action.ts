import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: '[scAlertAction]',
  host: {
    'data-slot': 'alert-action',
    '[class]': 'class()',
  },
})
export class ScAlertAction {
  private readonly styles = injectPreset().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.action, this.classInput()),
  );
}
