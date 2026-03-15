import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScMenuAlignDemo } from './menu-align-demo';

@Component({
  selector: 'app-menu-align-demo-container',
  imports: [DemoContainer, ScMenuAlignDemo],
  template: `
    <app-demo-container
      title="Alignment"
      demoUrl="/demos/menu/menu-align-demo"
      [code]="code"
    >
      <app-menu-align-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAlignDemoContainer {
  readonly code = '';
}
