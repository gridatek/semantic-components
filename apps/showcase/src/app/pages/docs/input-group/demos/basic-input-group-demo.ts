import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupInput,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupInput,
    ScInputGroupText,
    SiMailIcon,
  ],
  template: `
    <div sc-input-group>
      <div sc-input-group-addon>
        <span sc-input-group-text>
          <svg si-mail-icon></svg>
        </span>
      </div>
      <input sc-input-group-input placeholder="Email address" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputGroupDemo {}
