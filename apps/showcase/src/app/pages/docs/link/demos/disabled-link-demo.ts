import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-demo',
  imports: [ScLink, RouterLink],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <a scLink href="/docs/components/button" disabled>Button docs</a>
      <a scLink variant="outline" routerLink="/docs/components/badge" disabled>
        Badge docs
      </a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledLinkDemo {}
