import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRatingDemo } from './disabled-rating-demo';

@Component({
  selector: 'app-disabled-rating-demo-container',
  imports: [DemoContainer, DisabledRatingDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRatingDemoContainer {
  readonly code = '';
}
