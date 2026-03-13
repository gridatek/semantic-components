import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelInputGroupDemo } from './label-input-group-demo';

@Component({
  selector: 'app-label-input-group-demo-container',
  imports: [DemoContainer, LabelInputGroupDemo],
  template: `
    <app-demo-container
      title="Label"
      demoUrl="/demos/input-group/label-input-group-demo"
      [code]="code"
    >
      <app-label-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputGroupDemoContainer {
  readonly code = ``;
}
