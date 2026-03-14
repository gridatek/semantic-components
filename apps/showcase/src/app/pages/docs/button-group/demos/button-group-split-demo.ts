import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-split-demo',
  imports: [ScButton, ScButtonGroup, ScButtonGroupSeparator, SiChevronDownIcon],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scButtonGroup>
      <button scButton variant="outline">Save</button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="outline" size="icon" aria-label="More options">
        <svg siChevronDownIcon></svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSplitDemo {}
