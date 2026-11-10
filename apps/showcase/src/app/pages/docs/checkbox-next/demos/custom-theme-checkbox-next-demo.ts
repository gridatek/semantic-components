import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScLabel,
} from '@semantic-components/ui';

/** The app's colours, changed on a part of the page: --primary and --primary-foreground. */
@Component({
  selector: 'app-custom-theme-checkbox-next-demo',
  imports: [FormField, ScCheckboxNext, ScCheckboxNextField, ScLabel],
  template: `
    <div
      scCheckboxNextField
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <input type="checkbox" scCheckboxNext [formField]="themeForm.purple" />
      <label scLabel>Purple color scheme</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomThemeCheckboxNextDemo {
  protected readonly themeForm = form(signal({ purple: true }));
}
