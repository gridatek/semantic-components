import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
} from '@semantic-components/ui';
import { SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    SiMailIcon,
  ],
  template: `
    <div scInputGroup>
      <div scInputGroupAddon>
        <span scInputGroupText>
          <svg siMailIcon></svg>
        </span>
      </div>
      <input scInput variant="group" placeholder="Email address" />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputGroupDemo {}
