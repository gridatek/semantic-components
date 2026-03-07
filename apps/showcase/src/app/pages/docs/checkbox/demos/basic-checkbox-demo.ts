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
      <input type="checkbox" scCheckbox [(checked)]="terms" />
      <label scLabel>Accept terms and conditions</label>
    </div>
    <p class="text-muted-foreground mt-2 text-sm">Checked: {{ terms() }}</p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCheckboxDemo {
  readonly terms = signal(false);
}
