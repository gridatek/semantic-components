import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-button-usage-demo',
  imports: [ScButton],
  template: `
    <button scButton>Click me</button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonUsageDemo {}
