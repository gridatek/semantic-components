import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AlignItemSelectNextDemo } from './align-item-select-next-demo';

@Component({
  selector: 'app-align-item-select-next-demo-container',
  imports: [DemoContainer, AlignItemSelectNextDemo],
  template: `
    <app-demo-container
      title="Align Item With Trigger"
      demoUrl="/demos/select-next/align-item-select-next-demo"
      [code]="code"
    >
      <app-align-item-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignItemSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabelText,
  ScSelectNext,
  ScSelectNextGroup,
  ScSelectNextIcon,
  ScSelectNextItem,
  ScSelectNextItemIndicator,
  ScSelectNextItemText,
  ScSelectNextLabel,
  ScSelectNextList,
  ScSelectNextPopup,
  ScSelectNextPortal,
  ScSelectNextTrigger,
  ScSelectNextValue,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-align-item-select-next-demo',
  imports: [
    ScFieldDescription,
    ScLabelText,
    ScField,
    ScSelectNext,
    ScSelectNextGroup,
    ScSelectNextIcon,
    ScSelectNextItem,
    ScSelectNextItemIndicator,
    ScSelectNextItemText,
    ScSelectNextLabel,
    ScSelectNextList,
    ScSelectNextPopup,
    ScSelectNextPortal,
    ScSelectNextTrigger,
    ScSelectNextValue,
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
      <div scField>
        <div scSelectNext [(value)]="fruit" [items]="fruits">
          <div scSelectNextLabel>Fruit</div>
          <div scSelectNextTrigger class="w-full">
            <span scSelectNextValue placeholder="Select a fruit"></span>
            <svg scSelectNextIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectNextPortal>
            <div scSelectNextPopup [alignItemWithTrigger]="align()">
              <div scSelectNextList>
                <div scSelectNextGroup>
                  @for (item of fruits; track item.value) {
                    <div scSelectNextItem [value]="item.value">
                      <span scSelectNextItemText>{{ item.label }}</span>
                      <span scSelectNextItemIndicator>
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignItemSelectNextDemo {
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
