import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-button-group-usage-demo',
  imports: [ScButton, ScButtonGroup],
  template: `
    <div scButtonGroup aria-label="Text alignment">
      <button scButton variant="outline">Left</button>
      <button scButton variant="outline">Center</button>
      <button scButton variant="outline">Right</button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonGroupUsageDemo {}
