import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Text</label>
      <input
        sc-input
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
