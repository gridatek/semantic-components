import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-floating-label-demo',
  imports: [FormsModule, ScField, ScInput, ScLabel],
  template: `
    <sc-field [floating]="true">
      <label sc-label>Full Name</label>
      <input [(ngModel)]="floatingName" sc-input placeholder=" " />
    </sc-field>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingLabelDemo {
  floatingName: string = '';
}
