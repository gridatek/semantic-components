import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** Between chunks (`scOtpInputGroup`): write its content (an icon, a dash, a dot). */
@Directive({
  selector: '[scOtpInputSeparator]',
  host: {
    'data-slot': 'otp-input-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScOtpInputSeparator {
  private readonly styles = injectStyle().otpInput;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
