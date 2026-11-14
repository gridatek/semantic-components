import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScRadio, ScRadioGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-theme-radio-group-demo',
  imports: [ScRadioGroup, ScRadio, FormField, ScField],
  template: `
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div scRadioGroup [formField]="themeForm.selected">
        <label scField orientation="horizontal">
          <input scRadio value="option1" />
          Option 1
        </label>
        <label scField orientation="horizontal">
          <input scRadio value="option2" />
          Option 2
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomThemeRadioGroupDemo {
  readonly formModel = signal({ selected: 'option1' });
  readonly themeForm = form(this.formModel);
}
