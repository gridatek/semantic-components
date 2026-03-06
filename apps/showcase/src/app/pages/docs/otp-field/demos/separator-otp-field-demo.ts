import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOtpField,
  ScOtpFieldSeparator,
  ScOtpFieldSlot,
  ScOtpFieldSlotGroup,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-separator-otp-field-demo',
  imports: [
    ScOtpField,
    ScOtpFieldSlotGroup,
    ScOtpFieldSeparator,
    ScOtpFieldSlot,
    SiMinusIcon,
  ],
  template: `
    <div scOtpField [(value)]="otp">
      <div scOtpFieldSlotGroup>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
      </div>
      <div scOtpFieldSeparator>
        <svg siMinusIcon class="size-4"></svg>
      </div>
      <div scOtpFieldSlotGroup>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
        <div scOtpFieldSlot></div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ otp() || 'empty' }}
    </p>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorOtpFieldDemo {
  readonly otp = signal('');
}
