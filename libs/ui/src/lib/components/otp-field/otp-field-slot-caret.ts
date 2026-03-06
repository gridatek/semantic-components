import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scOtpFieldSlotCaret]',
  host: {
    'data-slot': 'otp-field-slot-caret',
    '[class]': 'class()',
  },
  template: `
    <div class="animate-caret-blink bg-foreground h-4 w-px"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScOtpFieldSlotCaret {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 flex items-center justify-center',
      this.classInput(),
    ),
  );
}
