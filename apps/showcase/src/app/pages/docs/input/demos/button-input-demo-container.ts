import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonInputDemo } from './button-input-demo';

@Component({
  selector: 'app-button-input-demo-container',
  imports: [DemoContainer, ButtonInputDemo],
  template: `
    <app-demo-container
      title="With Button"
      demoUrl="/demos/input/button-input-demo"
      [code]="code"
    >
      <app-button-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScButton, ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-button-input-demo',
  imports: [FormField, ScButton, ScField, ScInput, ScLabel],
  template: \`
    <div class="flex max-w-sm items-end gap-2">
      <div sc-field class="flex-1">
        <label sc-label>Email</label>
        <input
          sc-input
          type="email"
          [formField]="emailForm.email"
          placeholder="Email"
        />
      </div>
      <button sc-button>Subscribe</button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputDemo {
  readonly formModel = signal({ email: '' });
  readonly emailForm = form(this.formModel);
}`;
}
