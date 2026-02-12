import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-label-demo',
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Email</label>
      <input sc-input type="email" placeholder="Enter your email" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLabelDemo {}
