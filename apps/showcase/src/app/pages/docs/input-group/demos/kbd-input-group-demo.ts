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
    <div scInputGroup>
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg siSearchIcon></svg>
        </span>
      </div>
      <input scInput variant="group" placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <kbd scKbd>&#8984;K</kbd>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KbdInputGroupDemo {}
