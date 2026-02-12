import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullPasswordFieldDemo } from './full-password-field-demo';

@Component({
  selector: 'app-full-password-field-demo-container',
  imports: [DemoContainer, FullPasswordFieldDemo],
  template: `
    <app-demo-container
      title="With Strength and Requirements"
      demoUrl="/demos/password-field/full-password-field-demo"
      [code]="code"
    >
      <app-full-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FullPasswordFieldDemoContainer {
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
  ScPasswordFieldStrength,
  ScPasswordFieldRequirements,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-full-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldStrength,
    ScPasswordFieldRequirements,
    ScLabel,
  ],
  template: \`
    <div sc-password-field [(value)]="password" class="space-y-2">
      <label sc-label>Create Password</label>
      <div sc-password-field-input-group>
        <input
          sc-password-field-input
          placeholder="Enter a strong password"
          autocomplete="new-password"
        />
        <button sc-password-field-toggle></button>
      </div>
      <div sc-password-field-strength></div>
      <ul sc-password-field-requirements></ul>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}
