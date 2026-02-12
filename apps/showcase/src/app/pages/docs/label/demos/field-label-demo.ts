import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScFieldDescription,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-field-label-demo',
  imports: [ScField, ScInput, ScLabel, ScFieldDescription],
  template: `
    <div sc-field>
      <label sc-label>Email</label>
      <input sc-input type="email" placeholder="Enter your email" />
      <p sc-field-description>
        The label automatically links to the input via the field context.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLabelDemo {}
