import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BlockStartInputGroupDemo } from './block-start-input-group-demo';

@Component({
  selector: 'app-block-start-input-group-demo-container',
  imports: [DemoContainer, BlockStartInputGroupDemo],
  template: `
    <app-demo-container
      title="Block Start"
      demoUrl="/demos/input-group/block-start-input-group-demo"
      [code]="code"
    >
      <app-block-start-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockStartInputGroupDemoContainer {
  readonly code = ``;
}
