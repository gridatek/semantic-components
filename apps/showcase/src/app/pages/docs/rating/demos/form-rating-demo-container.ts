import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormRatingDemo } from './form-rating-demo';

@Component({
  selector: 'app-form-rating-demo-container',
  imports: [DemoContainer, FormRatingDemo],
  template: `
    <app-demo-container title="Form Integration" [code]="code">
      <app-form-rating-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRatingDemoContainer {
  readonly code = '';
}
