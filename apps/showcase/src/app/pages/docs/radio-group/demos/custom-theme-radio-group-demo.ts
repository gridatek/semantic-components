import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-theme-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div scRadioGroup>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="option1"
            [formField]="themeForm.selected"
          />
          Option 1
        </label>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="option2"
            [formField]="themeForm.selected"
          />
          Option 2
        </label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeRadioGroupDemo {
  readonly formModel = signal({ selected: 'option1' });
  readonly themeForm = form(this.formModel);
}
