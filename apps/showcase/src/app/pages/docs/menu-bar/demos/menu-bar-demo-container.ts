import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MenuBarDemo } from './menu-bar-demo';

@Component({
  selector: 'app-menu-bar-demo-container',
  imports: [DemoContainer, MenuBarDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/menu-bar/menu-bar-demo"
      [code]="code"
    >
      <app-menu-bar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarDemoContainer {
  readonly code = ``;
}
