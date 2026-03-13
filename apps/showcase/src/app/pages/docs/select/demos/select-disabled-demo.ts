import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
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

interface FormModel {
  fruit: string;
}

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
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="fruitForm">
      <div scSelect disabled>
        <div scSelectOrigin>
          <span scSelectDisplayValue>{{ displayValue() }}</span>
          <input
            scSelectInput
            [formField]="fruitForm.fruit"
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
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemo {
  readonly formModel = signal<FormModel>({ fruit: '' });
  readonly fruitForm = form(this.formModel);

  displayValue = computed(() => this.fruitForm.fruit().value());
}
