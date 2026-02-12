import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInputDemo } from './basic-input-demo';

@Component({
  selector: 'app-basic-input-demo-container',
  imports: [DemoContainer, BasicInputDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/input/basic-input-demo"
      [code]="code"
    >
      <app-basic-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: \`
    <div sc-field>
      <label sc-label>Text</label>
      <input
        sc-input
        type="text"
        [formField]="textForm.text"
        placeholder="Enter text..."
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputDemo {
  readonly formModel = signal({ text: '' });
  readonly textForm = form(this.formModel);
}`;
}
