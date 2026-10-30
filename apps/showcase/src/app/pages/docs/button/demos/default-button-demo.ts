import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-default-button-demo',
  imports: [ScButton],
  template: ` <button scButton>Button</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DefaultButtonDemo {}
