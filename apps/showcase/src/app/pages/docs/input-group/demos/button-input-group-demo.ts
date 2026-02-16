import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInput,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiSearchIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInput,
    ScInputGroupText,
    SiSearchIcon,
    SiXIcon,
  ],
  template: `
    <div sc-input-group>
      <div sc-input-group-addon>
        <span sc-input-group-text>
          <svg si-search-icon></svg>
        </span>
      </div>
      <input sc-input variant="group" placeholder="Search..." />
      <div sc-input-group-addon align="inline-end">
        <button sc-input-group-button size="icon-xs">
          <svg si-x-icon></svg>
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputGroupDemo {}
