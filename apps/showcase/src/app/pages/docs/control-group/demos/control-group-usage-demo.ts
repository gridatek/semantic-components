import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup, ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-control-group-usage-demo',
  imports: [ScButton, ScControlGroup, ScInput],
  template: `
    <div scControlGroup aria-label="Newsletter">
      <input
        scInput
        type="email"
        placeholder="Email"
        aria-label="Email"
        autocomplete="email"
      />
      <button scButton variant="outline">Subscribe</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupUsageDemo {}
