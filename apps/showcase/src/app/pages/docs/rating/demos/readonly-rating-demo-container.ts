import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReadonlyRatingDemo } from './readonly-rating-demo';

@Component({
  selector: 'app-readonly-rating-demo-container',
  imports: [DemoContainer, ReadonlyRatingDemo],
  template: `
    <app-demo-container title="Readonly" [code]="code">
      <app-readonly-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyRatingDemoContainer {
  readonly code = '';
}
