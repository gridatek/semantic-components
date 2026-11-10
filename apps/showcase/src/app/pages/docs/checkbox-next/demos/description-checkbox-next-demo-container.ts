import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionCheckboxNextDemo } from './description-checkbox-next-demo';

@Component({
  selector: 'app-description-checkbox-next-demo-container',
  imports: [DemoContainer, DescriptionCheckboxNextDemo],
  template: `
    <app-demo-container
      title="Description"
      demoUrl="/demos/checkbox-next/description-checkbox-next-demo"
      [code]="code"
    >
      <app-description-checkbox-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionCheckboxNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScCheckboxNext,
  ScCheckboxNextField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

/** A description under the label, read with the checkbox. */
@Component({
  selector: 'app-description-checkbox-next-demo',
  imports: [
    FormField,
    ScCheckboxNext,
    ScCheckboxNextField,
    ScFieldDescription,
    ScLabel,
  ],
  template: \`
    <div scCheckboxNextField class="w-72">
      <input type="checkbox" scCheckboxNext [formField]="termsForm.terms" />
      <label scLabel>Accept terms and conditions</label>
      <p scFieldDescription>
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionCheckboxNextDemo {
  protected readonly termsForm = form(signal({ terms: true }));
}`;
}
