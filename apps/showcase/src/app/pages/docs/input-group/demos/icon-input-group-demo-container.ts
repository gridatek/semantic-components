import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconInputGroupDemo } from './icon-input-group-demo';

@Component({
  selector: 'app-icon-input-group-demo-container',
  imports: [DemoContainer, IconInputGroupDemo],
  template: `
    <app-demo-container
      title="Icon"
      demoUrl="/demos/input-group/icon-input-group-demo"
      [code]="code"
    >
      <app-icon-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconInputGroupDemoContainer {
  readonly code = ``;
}
