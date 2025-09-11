import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-input-file',
  imports: [ScInput, ScLabel, ScField],
  template: `
    <div sc-field controlId="picture">
      <label sc-label>Picture</label>
      <input sc-input type="file" />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFile {}
