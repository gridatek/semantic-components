import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControlGroupInputDemo } from './control-group-input-demo';

@Component({
  selector: 'app-control-group-input-demo-container',
  imports: [DemoContainer, ControlGroupInputDemo],
  template: `
    <app-demo-container
      title="Control Group"
      demoUrl="/demos/input/control-group-input-demo"
      [code]="code"
    >
      <app-control-group-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScField,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-control-group-input-demo',
  imports: [ScButton, ScControlGroup, ScField, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Search</label>
      <div scControlGroup class="w-full">
        <input scInput placeholder="Type to search..." />
        <button scButton variant="outline">Search</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlGroupInputDemo {}`;
}
