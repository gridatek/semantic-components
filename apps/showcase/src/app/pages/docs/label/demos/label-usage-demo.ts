import { Component, ViewEncapsulation } from '@angular/core';
import { ScCheckbox, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-label-usage-demo',
  imports: [ScCheckbox, ScLabel, ScField],
  template: `
    <div scField orientation="horizontal">
      <input scCheckbox />
      <label scLabel>Accept terms and conditions</label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelUsageDemo {}
