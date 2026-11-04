import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScBadge } from '@semantic-components/ui';
import { SiArrowUpRightIcon } from '@semantic-icons/lucide-icons';

/** On an a: a link that looks like a badge, with a hover. */
@Component({
  selector: 'app-link-badge-demo',
  imports: [RouterLink, ScBadge, SiArrowUpRightIcon],
  template: `
    <a scBadge routerLink="/docs/components/button">
      Open Link
      <svg siArrowUpRightIcon data-icon="inline-end"></svg>
    </a>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkBadgeDemo {}
