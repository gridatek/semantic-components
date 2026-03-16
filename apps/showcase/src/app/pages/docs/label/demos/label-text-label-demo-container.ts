import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelTextLabelDemo } from './label-text-label-demo';

@Component({
  selector: 'app-label-text-label-demo-container',
  imports: [DemoContainer, LabelTextLabelDemo],
  template: `
    <app-demo-container
      title="Label Text"
      demoUrl="/demos/label/label-text-label-demo"
      [code]="code"
    >
      <app-label-text-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTextLabelDemoContainer {
  readonly code = ``;
}
