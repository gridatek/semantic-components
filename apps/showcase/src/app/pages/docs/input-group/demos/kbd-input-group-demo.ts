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
  ScKbd,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-kbd-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInput,
    ScInputGroupText,
    ScKbd,
    SiSearchIcon,
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
        <kbd sc-kbd>&#8984;K</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdInputGroupDemo {}
