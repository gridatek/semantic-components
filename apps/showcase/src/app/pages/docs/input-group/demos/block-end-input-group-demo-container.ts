import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BlockEndInputGroupDemo } from './block-end-input-group-demo';

@Component({
  selector: 'app-block-end-input-group-demo-container',
  imports: [DemoContainer, BlockEndInputGroupDemo],
  template: `
    <app-demo-container
      title="Block End"
      demoUrl="/demos/input-group/block-end-input-group-demo"
      [code]="code"
    >
      <app-block-end-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEndInputGroupDemoContainer {
  readonly code = ``;
}
