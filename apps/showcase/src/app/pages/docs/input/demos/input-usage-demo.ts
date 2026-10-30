import { Component, ViewEncapsulation } from '@angular/core';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-input-usage-demo',
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>Name</label>
      <input scInput placeholder="Jordan Lee" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputUsageDemo {}
