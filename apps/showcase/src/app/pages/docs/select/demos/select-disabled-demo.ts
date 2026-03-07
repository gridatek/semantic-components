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
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectOrigin,
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
    ScSelectOrigin,
    ScSelectIcon,
    ScSelectInput,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect disabled>
      <div scSelectOrigin>
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
              <span scSelectItemLabel>Apple</span>
              <svg scSelectItemIndicator siCheckIcon></svg>
            </div>
            <div scSelectItem value="Banana" label="Banana">
              <span scSelectItemLabel>Banana</span>
              <svg scSelectItemIndicator siCheckIcon></svg>
            </div>
            <div scSelectItem value="Orange" label="Orange">
              <span scSelectItemLabel>Orange</span>
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
