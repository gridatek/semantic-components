import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DropdownInputGroupDemo } from './dropdown-input-group-demo';

@Component({
  selector: 'app-dropdown-input-group-demo-container',
  imports: [DemoContainer, DropdownInputGroupDemo],
  template: `
    <app-demo-container
      title="Dropdown"
      demoUrl="/demos/input-group/dropdown-input-group-demo"
      [code]="code"
    >
      <app-dropdown-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownInputGroupDemoContainer {
  readonly code = ``;
}
