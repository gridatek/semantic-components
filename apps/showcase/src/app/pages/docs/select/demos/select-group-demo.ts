import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectDisplayValue,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectInput,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectOrigin,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-group-demo',
  imports: [
    ScSelect,
    ScSelectDisplayValue,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectOrigin,
    ScSelectSeparator,
    ScSelectIcon,
    ScSelectInput,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect>
      <div scSelectOrigin>
        <span scSelectDisplayValue></span>
        <input
          scSelectInput
          placeholder="Select a food"
          aria-label="Food dropdown"
        />
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectGroup>
              <div scSelectGroupLabel>Fruits</div>
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
            <div scSelectSeparator></div>
            <div scSelectGroup>
              <div scSelectGroupLabel>Vegetables</div>
              <div scSelectItem value="Carrot" label="Carrot">
                <span scSelectItemLabel>Carrot</span>
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Broccoli" label="Broccoli">
                <span scSelectItemLabel>Broccoli</span>
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
              <div scSelectItem value="Spinach" label="Spinach">
                <span scSelectItemLabel>Spinach</span>
                <svg scSelectItemIndicator siCheckIcon></svg>
              </div>
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
export class SelectGroupDemo {}
