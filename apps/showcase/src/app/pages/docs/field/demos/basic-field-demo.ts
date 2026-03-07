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
    <div scField class="w-full max-w-sm">
      <label scLabel>Email</label>
      <input scInput type="email" placeholder="Enter your email" />
      <p scFieldDescription>We'll never share your email with anyone else.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFieldDemo {}
