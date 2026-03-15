import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-size-demo',
  imports: [ScButton, ScButtonGroup, SiPlusIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="flex flex-col items-center gap-4">
      <div scButtonGroup>
        <button scButton variant="outline" size="sm">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
        <button scButton variant="outline" size="sm">Small</button>
      </div>

      <div scButtonGroup>
        <button scButton variant="outline">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
        <button scButton variant="outline">Default</button>
      </div>

      <div scButtonGroup>
        <button scButton variant="outline" size="lg">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add</span>
        </button>
        <button scButton variant="outline" size="lg">Large</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSizeDemo {}
