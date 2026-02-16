import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCheckbox,
  ScCheckboxField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-with-description-checkbox-demo',
  imports: [ScCheckboxField, ScCheckbox, ScLabel, ScFieldDescription],
  template: `
    <div scCheckboxField>
      <input
        type="checkbox"
        scCheckbox
        [(checked)]="marketing"
        id="marketing"
      />
      <label scLabel for="marketing">Marketing emails</label>
      <p scFieldDescription>
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
