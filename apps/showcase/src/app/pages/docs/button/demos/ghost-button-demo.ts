import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-ghost-button-demo',
  imports: [ScButton],
  template: ` <button scButton variant="ghost">Ghost</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GhostButtonDemo {}
