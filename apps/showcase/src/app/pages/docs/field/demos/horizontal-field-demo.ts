import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel, ScInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-horizontal-field-demo',
  imports: [ScField, ScLabel, ScInput],
  template: `
    <div sc-field [orientation]="'horizontal'">
      <label sc-label for="username">Username</label>
      <input sc-input id="username" type="text" placeholder="Enter username" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalFieldDemo {}
