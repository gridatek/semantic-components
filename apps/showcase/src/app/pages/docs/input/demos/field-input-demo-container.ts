import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FieldInputDemo } from './field-input-demo';

@Component({
  selector: 'app-field-input-demo-container',
  imports: [DemoContainer, FieldInputDemo],
  template: `
    <app-demo-container
      title="Field"
      demoUrl="/demos/input/field-input-demo"
      [code]="code"
    >
      <app-field-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-field-input-demo',
  imports: [ScField, ScFieldDescription, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-xs">
      <label scLabel>Username</label>
      <input scInput type="text" placeholder="Enter your username" />
      <p scFieldDescription>Choose a unique username for your account.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FieldInputDemo {}`;
}
