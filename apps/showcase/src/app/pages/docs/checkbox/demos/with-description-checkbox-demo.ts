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
  ScFieldDescription,
} from '@semantic-components/ui-lab';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-with-description-checkbox-demo',
  imports: [
    ScCheckboxField,
    ScCheckbox,
    ScLabel,
    ScFieldDescription,
    FormsModule,
  ],
  template: `
    <div sc-checkbox-field>
      <input
        type="checkbox"
        sc-checkbox
        [(ngModel)]="marketing"
        id="marketing"
      />
      <label sc-label for="marketing">Marketing emails</label>
      <p sc-field-description>
        Receive emails about new products, features, and more.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithDescriptionCheckboxDemo {
  readonly marketing = signal(true);
}
