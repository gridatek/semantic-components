import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

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
  private readonly styles = injectStyle().otpField;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.separator, this.classInput()),
  );
}
