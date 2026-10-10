import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectDisabledDemo } from './select-disabled-demo';

@Component({
  selector: 'app-select-disabled-demo-container',
  imports: [DemoContainer, SelectDisabledDemo],
  template: `
    <app-demo-container
      title="Disabled Select"
      demoUrl="/demos/select/select-disabled-demo"
      [code]="code"
    >
      <app-select-disabled-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectDisabledDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, disabled, form } from '@angular/forms/signals';
import {
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface FormModel {
  fruit: string;
}

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
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
    <form [formRoot]="fruitForm">
      <div scSelect [formField]="fruitForm.fruit" placeholder="Select a fruit">
        <div scSelectTrigger aria-label="Fruit">
          <span scSelectValue></span>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectDisabledDemo {
  readonly formModel = signal<FormModel>({ fruit: '' });
  readonly fruitForm = form(this.formModel, (schemaPath) => {
    disabled(schemaPath.fruit);
  });
}`;
}
