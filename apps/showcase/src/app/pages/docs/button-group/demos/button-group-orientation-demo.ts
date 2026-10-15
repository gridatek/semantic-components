import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-orientation-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scButtonGroup orientation="vertical">
      <button scButton variant="outline" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Increase</span>
      </button>
      <button scButton variant="outline" size="icon">
        <svg siMinusIcon></svg>
        <span class="sr-only">Decrease</span>
      </button>
    </div>
  `,
})
export class ButtonGroupOrientationDemo {}
