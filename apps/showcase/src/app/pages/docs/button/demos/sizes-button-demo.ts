import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiArrowRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-button-demo',
  imports: [ScButton, SiArrowRightIcon],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button scButton size="lg">Large</button>
      <button scButton size="default">Default</button>
      <button scButton size="sm">Small</button>
      <button scButton size="icon" aria-label="Go forward">
        <svg siArrowRightIcon></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesButtonDemo {}
