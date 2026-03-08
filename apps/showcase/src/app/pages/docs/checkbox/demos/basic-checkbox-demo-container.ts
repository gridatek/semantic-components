import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCheckboxDemo } from './basic-checkbox-demo';

@Component({
  selector: 'app-basic-checkbox-demo-container',
  imports: [DemoContainer, BasicCheckboxDemo],
  template: `
    <app-demo-container
      title="Basic Checkbox"
      demoUrl="/demos/checkbox/basic-checkbox-demo"
      [code]="code"
    >
      <app-basic-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: \`
    <div>
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [(checked)]="terms" />
        <label scLabel>Accept terms and conditions</label>
      </div>
      <div class="bg-muted mt-4 rounded-md p-4">
        <p class="text-sm font-medium">State:</p>
        <pre class="mt-2 text-xs">checked: {{ terms() }}</pre>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemo {
  readonly terms = signal(false);
}`;
}
