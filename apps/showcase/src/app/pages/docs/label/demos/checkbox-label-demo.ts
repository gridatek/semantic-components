import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScLabel,
  ScCheckboxField,
  ScCheckbox,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-checkbox-label-demo',
  imports: [ScLabel, ScCheckboxField, ScCheckbox],
  template: `
    <div scCheckboxField>
      <input type="checkbox" scCheckbox id="terms-label" />
      <label sc-label [for]="'terms-label'">Accept terms and conditions</label>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxLabelDemo {}
