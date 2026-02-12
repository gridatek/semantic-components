import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCheckboxField,
  ScCheckbox,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: `
    <div class="flex flex-col gap-4">
      <div sc-checkbox-field>
        <input
          type="checkbox"
          sc-checkbox
          [disabled]="true"
          id="disabled-unchecked"
        />
        <label sc-label for="disabled-unchecked">Disabled unchecked</label>
      </div>
      <div sc-checkbox-field>
        <input
          type="checkbox"
          sc-checkbox
          [checked]="true"
          [disabled]="true"
          id="disabled-checked"
        />
        <label sc-label for="disabled-checked">Disabled checked</label>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCheckboxDemo {}
