import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
