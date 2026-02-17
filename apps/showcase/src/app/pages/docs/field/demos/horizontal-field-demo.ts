import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-horizontal-field-demo',
  imports: [ScField, ScLabel, ScInput],
  template: `
    <div scField [orientation]="'horizontal'">
      <label scLabel for="username">Username</label>
      <input scInput id="username" type="text" placeholder="Enter username" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalFieldDemo {}
