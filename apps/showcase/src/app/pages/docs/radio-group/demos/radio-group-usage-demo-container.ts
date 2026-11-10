import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { RadioGroupUsageDemo } from './radio-group-usage-demo';

@Component({
  selector: 'app-radio-group-usage-demo-container',
  imports: [UsageCode, RadioGroupUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-radio-group-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

@Component({
  selector: 'app-radio-group-usage-demo',
  imports: [FormField, ScRadio, ScRadioField, ScRadioGroup],
  template: \`
    <div scRadioGroup aria-label="Spacing" class="w-fit">
      <label scRadioField>
        <input type="radio"
          scRadio
          value="default"
          [formField]="spacingForm.spacing"
        />
        Default
      </label>
      <label scRadioField>
        <input type="radio"
          scRadio
          value="comfortable"
          [formField]="spacingForm.spacing"
        />
        Comfortable
      </label>
      <label scRadioField>
        <input type="radio"
          scRadio
          value="compact"
          [formField]="spacingForm.spacing"
        />
        Compact
      </label>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RadioGroupUsageDemo {
  protected readonly spacingForm = form(signal({ spacing: 'comfortable' }));
}`;
}
