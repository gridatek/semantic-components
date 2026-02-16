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
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>$</span>
        </div>
        <input scInput variant="group" placeholder="Amount" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>USD</span>
        </div>
      </div>
      <div scInputGroup>
        <div scInputGroupAddon>
          <span scInputGroupText>https://</span>
        </div>
        <input scInput variant="group" placeholder="example.com" />
      </div>
      <div scInputGroup>
        <input scInput variant="group" placeholder="Email" />
        <div scInputGroupAddon align="inline-end">
          <span scInputGroupText>&#64;company.com</span>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGroupDemo {}
