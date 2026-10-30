import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-link-usage-demo',
  imports: [ScLink],
  template: ` <a scLink href="/docs/components/button">Go to Button</a> `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkUsageDemo {}
