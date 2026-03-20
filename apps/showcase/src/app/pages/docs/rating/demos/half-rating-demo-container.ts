import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HalfRatingDemo } from './half-rating-demo';

@Component({
  selector: 'app-half-rating-demo-container',
  imports: [DemoContainer, HalfRatingDemo],
  template: `
    <app-demo-container title="Half-Star Rating" [code]="code">
      <app-half-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HalfRatingDemoContainer {
  readonly code = '';
}
