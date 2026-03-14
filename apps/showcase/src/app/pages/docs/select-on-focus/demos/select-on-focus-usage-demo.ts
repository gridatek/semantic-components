import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-on-focus-usage-demo',
  imports: [ScSelectOnFocus, ScInput, ScField, ScLabel],
  template: `
    <div scField>
      <label scLabel>Text</label>
      <input scInput scSelectOnFocus value="Text to select" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOnFocusUsageDemo {}
