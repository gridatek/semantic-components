import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-orientation-button-group-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  template: `
    <div scButtonGroup orientation="vertical" aria-label="Media controls">
      <button scButton variant="outline" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Volume up</span>
      </button>
      <button scButton variant="outline" size="icon">
        <svg siMinusIcon></svg>
        <span class="sr-only">Volume down</span>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OrientationButtonGroupDemo {}
