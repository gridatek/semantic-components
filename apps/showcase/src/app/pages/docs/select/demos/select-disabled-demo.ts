import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectDisplayValue,
  ScSelectIcon,
  ScSelectInput,
  ScSelectInputGroup,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectDisplayValue,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectInputGroup,
    ScSelectIcon,
    ScSelectInput,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect disabled>
      <div scSelectInputGroup>
        <span scSelectDisplayValue></span>
        <input
          scSelectInput
          placeholder="Select a fruit"
          aria-label="Fruit dropdown"
        />
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectItem value="Apple" label="Apple">
              Apple
              <svg scSelectItemIndicator siCheckIcon></svg>
            </div>
            <div scSelectItem value="Banana" label="Banana">
              Banana
              <svg scSelectItemIndicator siCheckIcon></svg>
            </div>
            <div scSelectItem value="Orange" label="Orange">
              Orange
              <svg scSelectItemIndicator siCheckIcon></svg>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemo {}
