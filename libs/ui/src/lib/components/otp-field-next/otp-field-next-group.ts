import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * One chunk of the code's inputs, joined into one box (separate boxes in
 * some styles); a separator goes between chunks (`123 – 456`).
 */
@Directive({
  selector: 'div[scOtpFieldNextGroup]',
  host: {
    'data-slot': 'otp-field-group',
    '[class]': 'class()',
  },
})
export class ScOtpFieldNextGroup {
  private readonly styles = injectPreset().otpField;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.group, 'has-disabled:opacity-50', this.classInput()),
  );
}
