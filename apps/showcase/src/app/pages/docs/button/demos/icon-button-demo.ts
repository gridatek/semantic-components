import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiCircleFadingArrowUpIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-button-demo',
  imports: [ScButton, SiCircleFadingArrowUpIcon],
  template: `
    <button scButton variant="outline" size="icon">
      <svg siCircleFadingArrowUpIcon></svg>
      <span class="sr-only">Upgrade</span>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconButtonDemo {}
