import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScProgress } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-styling-progress-demo',
  imports: [ScProgress],
  template: `
    <div sc-progress [value]="66" class="h-4 w-[60%]"></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomStylingProgressDemo {}
