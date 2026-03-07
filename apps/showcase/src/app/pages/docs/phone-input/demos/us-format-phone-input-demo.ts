import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-us-format-phone-input-demo',
  imports: [ScPhoneInputSimple],
  template: `
    <div class="max-w-sm">
      <sc-phone-input-simple
        [(value)]="phone"
        format="us"
        placeholder="(555) 555-5555"
      />
    </div>
    <p class="text-muted-foreground mt-2 text-sm">
      Value: {{ phone() || 'Empty' }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsFormatPhoneInputDemo {
  readonly phone = signal('');
}
