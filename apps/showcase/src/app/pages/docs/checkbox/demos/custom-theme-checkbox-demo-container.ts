import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomThemeCheckboxDemo } from './custom-theme-checkbox-demo';

@Component({
  selector: 'app-custom-theme-checkbox-demo-container',
  imports: [DemoContainer, CustomThemeCheckboxDemo],
  template: `
    <app-demo-container
      title="Custom theme"
      demoUrl="/demos/checkbox/custom-theme-checkbox-demo"
      [code]="code"
    >
      <app-custom-theme-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomThemeCheckboxDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

/** The app's colours, changed on a part of the page: --primary and --primary-foreground. */
@Component({
  selector: 'app-custom-theme-checkbox-demo',
  imports: [FormField, ScCheckbox, ScCheckboxField, ScLabel],
  template: \`
    <div
      scCheckboxField
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <input scCheckbox [formField]="themeForm.purple" />
      <label scLabel>Purple color scheme</label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomThemeCheckboxDemo {
  protected readonly themeForm = form(signal({ purple: true }));
}`;
}
