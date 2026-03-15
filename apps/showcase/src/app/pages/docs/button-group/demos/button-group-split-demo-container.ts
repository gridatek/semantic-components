import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonGroupSplitDemo } from './button-group-split-demo';

@Component({
  selector: 'app-button-group-split-demo-container',
  imports: [DemoContainer, ButtonGroupSplitDemo],
  encapsulation: ViewEncapsulation.None,
  template: `
    <app-demo-container
      title="Split Button"
      demoUrl="/demos/button-group/button-group-split-demo"
      [code]="code"
    >
      <app-button-group-split-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSplitDemoContainer {
  readonly code = '';
}
