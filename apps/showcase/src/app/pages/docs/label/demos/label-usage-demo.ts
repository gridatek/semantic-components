import { Component, ViewEncapsulation } from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-label-usage-demo',
  imports: [ScCheckbox, ScCheckboxField, ScLabel],
  template: `
    <div scCheckboxField>
      <input scCheckbox />
      <label scLabel>Accept terms and conditions</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelUsageDemo {}
