import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckboxField, ScCheckbox } from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, FormsModule],
  template: `
    <div class="space-y-4">
      <label sc-checkbox-field class="cursor-pointer">
        <input type="checkbox" sc-checkbox [(ngModel)]="option1" id="option1" />
        One
      </label>

      <label sc-checkbox-field class="cursor-pointer">
        <input type="checkbox" sc-checkbox [(ngModel)]="option2" id="option2" />
        Two
      </label>

      <label sc-checkbox-field class="cursor-pointer">
        <input type="checkbox" sc-checkbox [(ngModel)]="option3" id="option3" />
        Three with a much longer label that spans multiple lines to demonstrate
        how the checkbox aligns with the first line of text
      </label>
    </div>

    <p class="text-sm text-muted-foreground mt-4">
      Selected: {{ option1() ? 'One' : '' }}
      {{ option2() ? 'Two' : '' }}
      {{ option3() ? 'Three' : '' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelCheckboxDemo {
  readonly option1 = signal(false);
  readonly option2 = signal(false);
  readonly option3 = signal(false);
}
