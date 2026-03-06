import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-checkbox-label-demo',
  imports: [ScLabel, ScCheckboxField, ScCheckbox],
  template: `
    <div scCheckboxField>
      <input type="checkbox" scCheckbox />
      <label scLabel>Accept terms and conditions</label>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxLabelDemo {}
