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
  selector: 'app-types-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div scField>
        <label scLabel>Text</label>
        <input
          scInput
          type="text"
          [formField]="typesForm.text"
          placeholder="Text input"
        />
      </div>
      <div scField>
        <label scLabel>Password</label>
        <input
          scInput
          type="password"
          [formField]="typesForm.password"
          placeholder="Password"
        />
      </div>
      <div scField>
        <label scLabel>Number</label>
        <input
          scInput
          type="number"
          [formField]="typesForm.number"
          placeholder="0"
        />
      </div>
      <div scField>
        <label scLabel>Date</label>
        <input scInput type="date" [formField]="typesForm.date" />
      </div>
      <div scField>
        <label scLabel>Time</label>
        <input scInput type="time" [formField]="typesForm.time" />
      </div>
      <div scField>
        <label scLabel>Search</label>
        <input
          scInput
          type="search"
          [formField]="typesForm.search"
          placeholder="Search..."
        />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesInputDemo {
  readonly formModel = signal({
    text: '',
    password: '',
    number: '',
    date: '',
    time: '',
    search: '',
  });
  readonly typesForm = form(this.formModel);
}
