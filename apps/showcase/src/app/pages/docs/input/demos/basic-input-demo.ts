import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Text</label>
      <input
        scInput
        type="text"
        [formField]="textForm.text"
        placeholder="Enter text..."
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputDemo {
  readonly formModel = signal({ text: '' });
  readonly textForm = form(this.formModel);
}
