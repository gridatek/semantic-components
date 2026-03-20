import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomIconsRatingDemo } from './custom-icons-rating-demo';

@Component({
  selector: 'app-custom-icons-rating-demo-container',
  imports: [DemoContainer, CustomIconsRatingDemo],
  template: `
    <app-demo-container title="Custom Icons" [code]="code">
      <app-custom-icons-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconsRatingDemoContainer {
  readonly code = '';
}
