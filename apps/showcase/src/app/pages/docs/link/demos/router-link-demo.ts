import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-router-link-demo',
  imports: [ScLink, RouterLink],
  template: `
    <a scLink variant="outline" routerLink="/docs/components/button">
      Go to Button
    </a>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RouterLinkDemo {}
