import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: `
    <div scField>
      <label scLabel>Text</label>
      <input
        scInput
        type="text"
        [formField]="textForm.text"
        placeholder="Enter text..."
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputDemo {
  readonly formModel = signal({ text: '' });
  readonly textForm = form(this.formModel);
}
