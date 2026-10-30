import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-link-demo',
  imports: [ScLink],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <a scLink href="/docs/components/button">Default</a>
      <a scLink variant="outline" href="/docs/components/badge">Outline</a>
      <a scLink variant="secondary" href="/docs/components/card">Secondary</a>
      <a scLink variant="ghost" href="/docs/components/dialog">Ghost</a>
      <a scLink variant="destructive" href="/docs/components/alert"
        >Destructive</a
      >
      <a scLink variant="link" href="/docs/components/tabs">Link</a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsLinkDemo {}
