import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCheckboxField,
  ScCheckbox,
  ScLabel,
} from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-theme-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, FormsModule],
  template: `
    <div
      class="space-y-3"
      style="--primary: oklch(0.6 0.25 280); --primary-foreground: oklch(0.985 0 0);"
    >
      <div sc-checkbox-field>
        <input
          type="checkbox"
          sc-checkbox
          [(ngModel)]="checked"
          id="purple-theme"
        />
        <label sc-label for="purple-theme">Purple color scheme</label>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomThemeCheckboxDemo {
  readonly checked = signal(true);
}
