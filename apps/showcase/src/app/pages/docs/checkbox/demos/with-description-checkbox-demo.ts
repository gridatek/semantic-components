import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
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
      <input type="checkbox" scCheckbox [(checked)]="marketing" />
      <label scLabel>Marketing emails</label>
      <p scFieldDescription>
        Receive emails about new products, features, and more.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithDescriptionCheckboxDemo {
  readonly marketing = signal(true);
}
