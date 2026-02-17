import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-theme-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div scRadioGroup>
        <label scRadioField class="flex items-center space-x-2">
          <input
            type="radio"
            scRadio
            value="option1"
            [formField]="themeForm.selected"
          />
          <span class="text-sm">Option 1</span>
        </label>
        <label scRadioField class="flex items-center space-x-2">
          <input
            type="radio"
            scRadio
            value="option2"
            [formField]="themeForm.selected"
          />
          <span class="text-sm">Option 2</span>
        </label>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeRadioGroupDemo {
  readonly formModel = signal({ selected: 'option1' });
  readonly themeForm = form(this.formModel);
}
