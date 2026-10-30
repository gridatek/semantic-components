import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-link-button-demo',
  imports: [ScButton],
  template: ` <button scButton variant="link">Link</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkButtonDemo {}
