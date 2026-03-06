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
    <div scCheckboxField>
      <input type="checkbox" scCheckbox [(checked)]="terms" id="terms" />
      <label scLabel for="terms">Accept terms and conditions</label>
    </div>
    <p class="text-muted-foreground mt-2 text-sm">Checked: {{ terms() }}</p>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemo {
  readonly terms = signal(false);
}
