import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: `
    <div class="flex flex-col gap-4">
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [disabled]="true" />
        <label scLabel>Disabled unchecked</label>
      </div>
      <div scCheckboxField>
        <input type="checkbox" scCheckbox [checked]="true" [disabled]="true" />
        <label scLabel>Disabled checked</label>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledCheckboxDemo {}
