import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TypesInputDemo } from './types-input-demo';

@Component({
  selector: 'app-types-input-demo-container',
  imports: [DemoContainer, TypesInputDemo],
  template: `
    <app-demo-container
      title="Input Types"
      demoUrl="/demos/input/types-input-demo"
      [code]="code"
    >
      <app-types-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScInput, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-types-input-demo',
  imports: [FormField, ScField, ScInput, ScLabel],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <div sc-field>
        <label sc-label>Text</label>
        <input
          sc-input
          type="text"
          [formField]="typesForm.text"
          placeholder="Text input"
        />
      </div>
      <div sc-field>
        <label sc-label>Password</label>
        <input
          sc-input
          type="password"
          [formField]="typesForm.password"
          placeholder="Password"
        />
      </div>
      <div sc-field>
        <label sc-label>Number</label>
        <input
          sc-input
          type="number"
          [formField]="typesForm.number"
          placeholder="0"
        />
      </div>
      <div sc-field>
        <label sc-label>Date</label>
        <input sc-input type="date" [formField]="typesForm.date" />
      </div>
      <div sc-field>
        <label sc-label>Time</label>
        <input sc-input type="time" [formField]="typesForm.time" />
      </div>
      <div sc-field>
        <label sc-label>Search</label>
        <input
          sc-input
          type="search"
          [formField]="typesForm.search"
          placeholder="Search..."
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesInputDemo {
  readonly formModel = signal({
    text: '',
    password: '',
    number: '',
    date: '',
    time: '',
    search: '',
  });
  readonly typesForm = form(this.formModel);
}`;
}
