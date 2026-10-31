import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignItemSelectDemo } from './align-item-select-demo';

@Component({
  selector: 'app-align-item-select-demo-container',
  imports: [DemoContainer, AlignItemSelectDemo],
  template: `
    <app-demo-container
      title="Align Item With Trigger"
      demoUrl="/demos/select/align-item-select-demo"
      [code]="code"
    >
      <app-align-item-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignItemSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFieldDescription,
  ScLabelText,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-align-item-select-demo',
  imports: [
    ScFieldDescription,
    ScLabelText,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSwitch,
    ScSwitchField,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="grid w-full max-w-xs gap-6">
      <label scSwitchField>
        <p scLabelText>Align Item</p>
        <p scFieldDescription>Toggle to align the item with the trigger.</p>
        <input type="checkbox" scSwitch [(checked)]="align" />
      </label>
      <div scSelect [(value)]="fruit" [items]="fruits" class="w-full">
        <div scSelectLabel>Fruit</div>
        <div scSelectTrigger>
          <span scSelectValue placeholder="Select a fruit"></span>
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup [alignItemWithTrigger]="align()">
            <div scSelectList>
              <div scSelectGroup>
                @for (item of fruits; track item.value) {
                  <div scSelectItem [value]="item.value">
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignItemSelectDemo {
  protected readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
  ];
  protected readonly fruit = signal('banana');
  protected readonly align = signal(false);
}`;
}
