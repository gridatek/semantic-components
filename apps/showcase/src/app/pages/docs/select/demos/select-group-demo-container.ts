import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectGroupDemo } from './select-group-demo';

@Component({
  selector: 'app-select-group-demo-container',
  imports: [DemoContainer, SelectGroupDemo],
  template: `
    <app-demo-container
      title="Select with Groups"
      demoUrl="/demos/select/select-group-demo"
      [code]="code"
    >
      <app-select-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScSelect,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface FormModel {
  food: string;
}

@Component({
  selector: 'app-select-group-demo',
  imports: [
    ScSelect,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectSeparator,
    ScSelectIcon,
    ScSelectTrigger,
    ScSelectValue,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
    FormField,
    FormRoot,
  ],
  template: \`
    <form [formRoot]="foodForm">
      <div scSelect [formField]="foodForm.food" placeholder="Select a food">
        <div scSelectTrigger aria-label="Food">
          <span scSelectValue></span>
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
                <div
                  scSelectItem
                  value="Broccoli"
                  label="Broccoli"
                  [disabled]="true"
                >
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectGroupDemo {
  readonly formModel = signal<FormModel>({ food: '' });
  readonly foodForm = form(this.formModel);
}`;
}
