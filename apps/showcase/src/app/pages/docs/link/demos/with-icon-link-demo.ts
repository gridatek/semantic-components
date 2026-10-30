import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icon-link-demo',
  imports: [ScLink, SiArrowLeftIcon, SiArrowRightIcon],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <a scLink variant="outline" href="/docs/components/badge">
        <svg siArrowLeftIcon data-icon="inline-start"></svg>
        Badge
      </a>
      <a scLink variant="outline" href="/docs/components/card">
        Card
        <svg siArrowRightIcon data-icon="inline-end"></svg>
      </a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconLinkDemo {}
