import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-input-with-label',
  imports: [ScField, ScInput, ScLabel],
  template: `
    <div class="w-full max-w-sm" sc-field controlId="email">
      <label sc-label>Email</label>
      <input sc-input type="email" placeholder="Email" data-slot="control" />
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWithLabel {}
