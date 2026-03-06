import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField } from '@semantic-components/ui';

@Component({
  selector: 'app-label-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox],
  template: `
    <div class="space-y-4">
      <label scCheckboxField class="cursor-pointer">
        <input type="checkbox" scCheckbox [(checked)]="option1" />
        One
      </label>

      <label scCheckboxField class="cursor-pointer">
        <input type="checkbox" scCheckbox [(checked)]="option2" />
        Two
      </label>

      <label scCheckboxField class="cursor-pointer">
        <input type="checkbox" scCheckbox [(checked)]="option3" />
        Three with a much longer label that spans multiple lines to demonstrate
        how the checkbox aligns with the first line of text
      </label>
    </div>

    <p class="text-muted-foreground mt-4 text-sm">
      Selected: {{ option1() ? 'One' : '' }}
      {{ option2() ? 'Two' : '' }}
      {{ option3() ? 'Three' : '' }}
    </p>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelCheckboxDemo {
  readonly option1 = signal(false);
  readonly option2 = signal(false);
  readonly option3 = signal(false);
}
