import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInput,
  ScInputGroupText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-text-input-group-demo',
  imports: [ScInputGroup, ScInputGroupAddon, ScInput, ScInputGroupText],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <div sc-input-group>
        <div sc-input-group-addon>
          <span sc-input-group-text>$</span>
        </div>
        <input sc-input variant="group" placeholder="Amount" />
        <div sc-input-group-addon align="inline-end">
          <span sc-input-group-text>USD</span>
        </div>
      </div>
      <div sc-input-group>
        <div sc-input-group-addon>
          <span sc-input-group-text>https://</span>
        </div>
        <input sc-input variant="group" placeholder="example.com" />
      </div>
      <div sc-input-group>
        <input sc-input variant="group" placeholder="Email" />
        <div sc-input-group-addon align="inline-end">
          <span sc-input-group-text>&#64;company.com</span>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGroupDemo {}
