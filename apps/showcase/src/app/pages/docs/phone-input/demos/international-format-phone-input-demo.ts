import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-international-format-phone-input-demo',
  imports: [ScPhoneInputSimple],
  template: `
    <div class="max-w-sm">
      <sc-phone-input-simple
        [(value)]="phone"
        format="international"
        placeholder="+1 555 555 5555"
      />
    </div>
    <p class="text-sm text-muted-foreground mt-2">
      Value: {{ phone() || 'Empty' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalFormatPhoneInputDemo {
  readonly phone = signal('');
}
