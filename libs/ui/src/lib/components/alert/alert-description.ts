import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: '[scAlertDescription]',
  host: {
    'data-slot': 'alert-description',
    '[class]': 'class()',
  },
})
export class ScAlertDescription {
  private readonly styles = injectPreset().alert;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.description, this.classInput()),
  );
}
