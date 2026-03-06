import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScSpinner,
} from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-spinner-input-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
    ScInput,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scInputGroup>
      <div scInputGroupAddon>
        <svg scSpinner siLoaderCircleIcon class="size-4"></svg>
      </div>
      <input scInput variant="group" placeholder="Loading..." disabled />
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerInputGroupDemo {}
