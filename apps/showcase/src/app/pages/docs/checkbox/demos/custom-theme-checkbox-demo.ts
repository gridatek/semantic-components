import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

/** The app's colours, changed on a part of the page: --primary and --primary-foreground. */
@Component({
  selector: 'app-custom-theme-checkbox-demo',
  imports: [FormField, ScCheckbox, ScCheckboxField, ScLabel],
  template: `
    <div
      scCheckboxField
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <input type="checkbox" scCheckbox [formField]="themeForm.purple" />
      <label scLabel>Purple color scheme</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomThemeCheckboxDemo {
  protected readonly themeForm = form(signal({ purple: true }));
}
