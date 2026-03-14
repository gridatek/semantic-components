import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-input-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scButtonGroup>
      <button scButton variant="outline" size="icon" aria-label="Decrease">
        <svg siMinusIcon></svg>
      </button>
      <input
        class="border-input bg-background h-8 w-16 border border-r-0 border-l-0 text-center text-sm outline-none"
        type="text"
        value="5"
        aria-label="Quantity"
      />
      <button scButton variant="outline" size="icon" aria-label="Increase">
        <svg siPlusIcon></svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupInputDemo {}
