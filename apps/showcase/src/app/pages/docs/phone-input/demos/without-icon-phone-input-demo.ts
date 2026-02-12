import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-without-icon-phone-input-demo',
  imports: [ScPhoneInputSimple],
  template: `
    <div class="max-w-sm">
      <sc-phone-input-simple
        [showIcon]="false"
        format="us"
        placeholder="Enter phone number"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutIconPhoneInputDemo {}
