import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput, ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-phone-input-demo',
  imports: [ScPhoneInput, ScPhoneInputSimple],
  template: `
    <div class="flex flex-col gap-3 max-w-sm">
      <scPhoneInput [disabled]="true" />
      <scPhoneInputSimple [disabled]="true" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPhoneInputDemo {}
