import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-inline-end-input-group-demo',
  imports: [ScButton, ScInput, ScInputGroup, ScInputGroupAddon, SiEyeOffIcon],
  template: `
    <div scInputGroup class="w-full max-w-sm">
      <input scInput type="password" placeholder="Enter password" />
      <div scInputGroupAddon align="inline-end">
        <button
          scButton
          variant="ghost"
          size="icon-sm"
          aria-label="Toggle password visibility"
        >
          <svg siEyeOffIcon></svg>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEndInputGroupDemo {}
