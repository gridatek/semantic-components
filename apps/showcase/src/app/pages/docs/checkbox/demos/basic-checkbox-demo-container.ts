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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckboxField, ScCheckbox, ScLabel } from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, FormsModule],
  template: \`
    <div sc-checkbox-field>
      <input type="checkbox" sc-checkbox [(ngModel)]="terms" id="terms" />
      <label sc-label for="terms">Accept terms and conditions</label>
    </div>
    <p class="text-sm text-muted-foreground mt-2">Checked: {{ terms() }}</p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemo {
  readonly terms = signal(false);
}`;
}
