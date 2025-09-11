import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCheckbox, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-checkbox-demo',
  imports: [ScCheckbox, ScLabel, ScField],
  template: `
    <div sc-field orientation="horizontal-checkbox" controlId="terms">
      <input sc-checkbox />
      <label sc-label>Accept terms and conditions</label>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDemo {}
