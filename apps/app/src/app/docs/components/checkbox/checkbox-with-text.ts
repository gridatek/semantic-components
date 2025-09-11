import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScCheckbox,
  ScField,
  ScFieldDescription,
  ScLabel,
  ScLabelGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-checkbox-with-text',
  imports: [ScCheckbox, ScFieldDescription, ScField, ScLabel, ScLabelGroup],
  template: `
    <div sc-field orientation="horizontal-checkbox" controlId="terms1">
      <input sc-checkbox />
      <div sc-label-group>
        <label sc-label>Accept terms and conditions</label>
        <p sc-field-description>You agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxWithText {}
