import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-outline-button-demo',
  imports: [ScButton],
  template: ` <button scButton variant="outline">Outline</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OutlineButtonDemo {}
