import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-floating-label-demo',
  imports: [FormsModule, ScField, ScInput, ScLabel],
  template: `
    <sc-field [floatingLabel]="true">
      <label sc-label>Full Name</label>
      <input [(ngModel)]="floatingName" sc-input />
    </sc-field>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingLabelDemo {
  floatingName: string = '';
}
