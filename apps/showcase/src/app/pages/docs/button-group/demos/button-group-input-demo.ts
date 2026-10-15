import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup, ScInput } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-input-demo',
  imports: [ScButton, ScButtonGroup, ScInput, SiMinusIcon, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scButtonGroup>
      <button scButton variant="outline" size="icon">
        <svg siMinusIcon></svg>
        <span class="sr-only">Decrease</span>
      </button>
      <input
        scInput
        class="w-16 text-center"
        type="text"
        value="5"
        aria-label="Quantity"
      />
      <button scButton variant="outline" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Increase</span>
      </button>
    </div>
  `,
})
export class ButtonGroupInputDemo {}
