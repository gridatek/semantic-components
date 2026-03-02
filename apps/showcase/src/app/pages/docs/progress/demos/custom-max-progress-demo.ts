import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScProgress } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-max-progress-demo',
  imports: [ScProgress],
  template: `
    <div
      scProgress
      aria-label="Custom max progress"
      [value]="50"
      [max]="200"
      class="w-[60%]"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMaxProgressDemo {}
