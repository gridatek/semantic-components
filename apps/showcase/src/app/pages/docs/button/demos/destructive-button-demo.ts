import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-destructive-button-demo',
  imports: [ScButton],
  template: ` <button scButton variant="destructive">Destructive</button> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveButtonDemo {}
