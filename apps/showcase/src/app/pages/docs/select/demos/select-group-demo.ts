import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScInputGroup,
  ScInputGroupAddon,
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

interface FormModel {
  food: string;
}

@Component({
  selector: 'app-select-group-demo',
  imports: [
    ScInputGroup,
    ScInputGroupAddon,
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
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="foodForm">
      <div scSelect>
        <div scSelectOrigin>
          <div scInputGroup>
            <span scSelectDisplayValue>{{ displayValue() }}</span>
            <input
              scSelectInput
              [formField]="foodForm.food"
              placeholder="Select a food"
              aria-label="Food dropdown"
            />
            <div scInputGroupAddon align="inline-end">
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
          </div>
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
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGroupDemo {
  readonly formModel = signal<FormModel>({ food: '' });
  readonly foodForm = form(this.formModel);

  displayValue = computed(() => this.foodForm.food().value());
}
