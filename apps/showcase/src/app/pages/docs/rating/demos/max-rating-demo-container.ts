import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MaxRatingDemo } from './max-rating-demo';

@Component({
  selector: 'app-max-rating-demo-container',
  imports: [DemoContainer, MaxRatingDemo],
  template: `
    <app-demo-container title="Custom Maximum" [code]="code">
      <app-max-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxRatingDemoContainer {
  readonly code = '';
}
