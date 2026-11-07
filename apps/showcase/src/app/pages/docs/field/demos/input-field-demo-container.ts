import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputFieldDemo } from './input-field-demo';

@Component({
  selector: 'app-input-field-demo-container',
  imports: [DemoContainer, InputFieldDemo],
  template: `
    <app-demo-container
      title="Input"
      demoUrl="/demos/field/input-field-demo"
      [code]="code"
    >
      <app-input-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/** Inputs with their labels and descriptions; a description can come before the input. */
@Component({
  selector: 'app-input-field-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScInput,
    ScLabel,
  ],
  template: \`
    <fieldset scFieldset class="w-full max-w-xs">
      <div scFieldGroup>
        <div scField>
          <label scLabel>Username</label>
          <input scInput type="text" placeholder="Max Leiter" />
          <p scFieldDescription>Choose a unique username for your account.</p>
        </div>
        <div scField>
          <label scLabel>Password</label>
          <p scFieldDescription>Must be at least 8 characters long.</p>
          <input scInput type="password" placeholder="••••••••" />
        </div>
      </div>
    </fieldset>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputFieldDemo {}`;
}
