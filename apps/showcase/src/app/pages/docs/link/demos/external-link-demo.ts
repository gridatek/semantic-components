import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { SiExternalLinkIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-external-link-demo',
  imports: [ScLink, SiExternalLinkIcon],
  template: `
    <a
      scLink
      variant="outline"
      href="https://github.com/gridatek/semantic-components"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
      <svg siExternalLinkIcon data-icon="inline-end"></svg>
      <span class="sr-only">(opens in a new tab)</span>
    </a>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExternalLinkDemo {}
