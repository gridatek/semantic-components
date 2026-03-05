import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectInput,
  ScSelectInputGroup,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTriggerIcon,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectInputGroup,
    ScSelectTriggerIcon,
    ScSelectInput,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect disabled>
      <div scSelectInputGroup>
        <input
          scSelectInput
          placeholder="Select a fruit"
          aria-label="Fruit dropdown"
        />
        <svg scSelectTriggerIcon siChevronDownIcon aria-hidden="true"></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectItem value="Apple" label="Apple">
              Apple
              <svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg>
            </div>
            <div scSelectItem value="Banana" label="Banana">
              Banana
              <svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg>
            </div>
            <div scSelectItem value="Orange" label="Orange">
              Orange
              <svg scSelectItemIndicator siCheckIcon aria-hidden="true"></svg>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemo {}
