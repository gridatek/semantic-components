import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScFieldDescription, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-field-demo',
  imports: [ScField, ScLabel, ScFieldDescription, ScInput],
  template: `
    <div scField>
      <label scLabel for="email">Email</label>
      <input scInput id="email" type="email" placeholder="Enter your email" />
      <p scFieldDescription>We'll never share your email with anyone else.</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemo {}
