import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-as-link-button-demo',
  imports: [ScLink],
  template: ` <a scLink href="/docs/components/link">Go to the Link docs</a> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AsLinkButtonDemo {}
