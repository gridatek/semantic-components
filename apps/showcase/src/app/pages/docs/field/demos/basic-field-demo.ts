import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScLabel,
  ScFieldDescription,
  ScInput,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-field-demo',
  imports: [ScField, ScLabel, ScFieldDescription, ScInput],
  template: `
    <div sc-field>
      <label sc-label for="email">Email</label>
      <input sc-input id="email" type="email" placeholder="Enter your email" />
      <p sc-field-description>We'll never share your email with anyone else.</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemo {}
