import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel],
  template: `
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemo {
  readonly terms = signal(false);
}
