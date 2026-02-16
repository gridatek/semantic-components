import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton, ScTooltipTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-tooltip-demo',
  imports: [ScButton, ScTooltipTrigger],
  template: `
    <button sc-button variant="outline" scTooltipTrigger="Add to library">
      Hover me
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTooltipDemo {}
