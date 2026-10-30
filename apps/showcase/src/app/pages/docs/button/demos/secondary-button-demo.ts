import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-secondary-button-demo',
  imports: [ScButton],
  template: ` <button scButton variant="secondary">Secondary</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SecondaryButtonDemo {}
