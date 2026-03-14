import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScInput, ScSelectOnFocus } from '@semantic-components/ui';

@Component({
  selector: 'app-select-on-focus-usage-demo',
  imports: [ScSelectOnFocus, ScInput],
  template: `
    <input scInput scSelectOnFocus value="Text to select" />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOnFocusUsageDemo {}
