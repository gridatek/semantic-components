import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** Between chunks (`scOtpFieldNextGroup`): write its content (an icon, a dash, a dot). */
@Directive({
  selector: '[scOtpFieldNextSeparator]',
  host: {
    'data-slot': 'otp-field-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpFieldNextSeparator {
  private readonly styles = injectPreset().otpField;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
