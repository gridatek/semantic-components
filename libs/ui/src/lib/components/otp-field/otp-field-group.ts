import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/**
 * One chunk of the code's inputs, joined into one box (separate boxes in
 * some styles); a separator goes between chunks (`123 – 456`).
 */
@Directive({
  selector: 'div[scOtpFieldGroup]',
  host: {
    'data-slot': 'otp-field-group',
    '[class]': 'class()',
  },
})
export class ScOtpFieldGroup {
  private readonly styles = injectStyle().otpField;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.group, 'has-disabled:opacity-50', this.classInput()),
  );
}
