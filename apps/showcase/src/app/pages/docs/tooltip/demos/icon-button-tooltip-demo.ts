import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-button-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger, SiPlusIcon],
  template: `
    <button scButton variant="outline" size="icon" scTooltipTrigger="Add item">
      <svg siPlusIcon></svg>
      <span class="sr-only">Add item</span>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconButtonTooltipDemo {}
