import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RowsTextareaDemo } from './rows-textarea-demo';

@Component({
  selector: 'app-rows-textarea-demo-container',
  imports: [DemoContainer, RowsTextareaDemo],
  template: `
    <app-demo-container
      title="Custom Rows"
      demoUrl="/demos/textarea/rows-textarea-demo"
      [code]="code"
    >
      <app-rows-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsTextareaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScField, ScLabel, ScTextarea } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-rows-textarea-demo',
  imports: [FormField, ScField, ScLabel, ScTextarea],
  template: \`
    <div class="grid w-full gap-4">
      <div sc-field>
        <label sc-label>Small (2 rows)</label>
        <textarea
          sc-textarea
          rows="2"
          [formField]="rowsForm.small"
          placeholder="Small textarea"
        ></textarea>
      </div>
      <div sc-field>
        <label sc-label>Large (6 rows)</label>
        <textarea
          sc-textarea
          rows="6"
          [formField]="rowsForm.large"
          placeholder="Large textarea"
        ></textarea>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsTextareaDemo {
  readonly formModel = signal({ small: '', large: '' });
  readonly rowsForm = form(this.formModel);
}`;
}
