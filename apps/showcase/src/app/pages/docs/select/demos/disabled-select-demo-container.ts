import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSelectDemo } from './disabled-select-demo';

@Component({
  selector: 'app-disabled-select-demo-container',
  imports: [DemoContainer, DisabledSelectDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/select/disabled-select-demo"
      [code]="code"
    >
      <app-disabled-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSelectDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A disabled select, and a select with a disabled option. */
@Component({
  selector: 'app-disabled-select-demo',
  imports: [
    ScField,
    ScLabel,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="grid w-full max-w-48 gap-6">
      @for (select of selects; track select.label) {
        <div scField class="w-full">
          <label scLabel>{{ select.label }}</label>
          <div scSelect [disabled]="select.disabled" [items]="fruits">
            <button scSelectTrigger>
              <span scSelectValue placeholder="Select a fruit"></span>
              <svg scSelectIcon siChevronDownIcon></svg>
            </button>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  <div scSelectGroup>
                    @for (item of fruits; track item.value) {
                      <div
                        scSelectItem
                        [value]="item.value"
                        [disabled]="item.disabled"
                      >
                        <span scSelectItemText>{{ item.label }}</span>
                        <span scSelectItemIndicator>
                          <svg siCheckIcon></svg>
                        </span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledSelectDemo {
  private readonly selects = [
    { label: 'Disabled', disabled: true },
    { label: 'Disabled option', disabled: false },
  ];
  private readonly fruits = [
    { value: 'apple', label: 'Apple', disabled: false },
    { value: 'banana', label: 'Banana', disabled: false },
    { value: 'blueberry', label: 'Blueberry', disabled: false },
    { value: 'grapes', label: 'Grapes', disabled: true },
    { value: 'pineapple', label: 'Pineapple', disabled: false },
  ];
}`;
}
