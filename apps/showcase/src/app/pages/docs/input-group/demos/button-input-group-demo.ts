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
    <div scInputGroup>
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg siSearchIcon></svg>
        </span>
      </div>
      <input scInput variant="group" placeholder="Search..." />
      <div scInputGroupAddon align="inline-end">
        <button scInputGroupButton size="icon-xs">
          <svg siXIcon></svg>
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonInputGroupDemo {}
