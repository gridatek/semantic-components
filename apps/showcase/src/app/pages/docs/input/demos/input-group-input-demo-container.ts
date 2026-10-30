import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupInputDemo } from './input-group-input-demo';

@Component({
  selector: 'app-input-group-input-demo-container',
  imports: [DemoContainer, InputGroupInputDemo],
  template: `
    <app-demo-container
      title="Input Group"
      demoUrl="/demos/input/input-group-input-demo"
      [code]="code"
    >
      <app-input-group-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScLabel,
} from '@semantic-components/ui';
import { SiInfoIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-group-input-demo',
  imports: [
    ScField,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScLabel,
    SiInfoIcon,
  ],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Website URL</label>
      <div scInputGroup>
        <input scInput placeholder="example.com" />
        <div scInputGroupAddon>
          <span scInputGroupText>https://</span>
        </div>
        <div scInputGroupAddon align="inline-end">
          <svg siInfoIcon></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupInputDemo {}`;
}
