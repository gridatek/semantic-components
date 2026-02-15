import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithDescriptionCheckboxDemo } from './with-description-checkbox-demo';

@Component({
  selector: 'app-with-description-checkbox-demo-container',
  imports: [DemoContainer, WithDescriptionCheckboxDemo],
  template: `
    <app-demo-container
      title="With Description"
      demoUrl="/demos/checkbox/with-description-checkbox-demo"
      [code]="code"
    >
      <app-with-description-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithDescriptionCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScFieldDescription } from '@semantic-components/ui';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-with-description-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, ScFieldDescription],
  template: \`
    <div scCheckboxField>
      <input
        type="checkbox"
        scCheckbox
        [(checked)]="marketing"
        id="marketing"
      />
      <label sc-label for="marketing">Marketing emails</label>
      <p sc-field-description>
        Receive emails about new products, features, and more.
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithDescriptionCheckboxDemo {
  readonly marketing = signal(true);
}`;
}
