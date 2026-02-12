import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RequirementsPasswordFieldDemo } from './requirements-password-field-demo';

@Component({
  selector: 'app-requirements-password-field-demo-container',
  imports: [DemoContainer, RequirementsPasswordFieldDemo],
  template: `
    <app-demo-container
      title="With Requirements Checklist"
      demoUrl="/demos/password-field/requirements-password-field-demo"
      [code]="code"
    >
      <app-requirements-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequirementsPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
  ScPasswordFieldRequirements,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-requirements-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldRequirements,
    ScLabel,
  ],
  template: \`
    <div sc-password-field [(value)]="password" class="space-y-2">
      <label sc-label>Password</label>
      <div sc-password-field-input-group>
        <input
          sc-password-field-input
          placeholder="Enter password"
          autocomplete="new-password"
        />
        <button sc-password-field-toggle></button>
      </div>
      <ul sc-password-field-requirements></ul>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}
