import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/** Between chunks (`scOtpFieldGroup`): write its content (an icon, a dash, a dot). */
@Directive({
  selector: '[scOtpFieldSeparator]',
  host: {
    'data-slot': 'otp-field-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpFieldSeparator {
  private readonly styles = injectPreset().otpField;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
