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
    <div scField [orientation]="'horizontal'" class="w-full max-w-sm">
      <label scLabel>Username</label>
      <input scInput type="text" placeholder="Enter username" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalFieldDemo {}
