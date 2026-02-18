import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-button-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger, SiPlusIcon],
  template: `
    <button scButton variant="outline" size="icon" scTooltipTrigger="Add item">
      <svg siPlusIcon class="size-4"></svg>
      <span class="sr-only">Add item</span>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonTooltipDemo {}
