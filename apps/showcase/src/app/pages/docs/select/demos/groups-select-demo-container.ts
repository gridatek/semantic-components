import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsSelectDemo } from './groups-select-demo';

@Component({
  selector: 'app-groups-select-demo-container',
  imports: [DemoContainer, GroupsSelectDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/select/groups-select-demo"
      [code]="code"
    >
      <app-groups-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSelect,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectSeparator,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-groups-select-demo',
  imports: [
    ScSelect,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectSeparator,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scSelect [(value)]="food" [items]="all" class="w-full max-w-48">
      <div scSelectLabel>Food</div>
      <div scSelectTrigger>
        <span scSelectValue placeholder="Select a fruit"></span>
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectGroup>
              <div scSelectGroupLabel>Fruits</div>
              @for (item of fruits; track item.value) {
                <div scSelectItem [value]="item.value">
                  <span scSelectItemText>{{ item.label }}</span>
                  <span scSelectItemIndicator>
                    <svg siCheckIcon></svg>
                  </span>
                </div>
              }
            </div>
            <div scSelectSeparator></div>
            <div scSelectGroup>
              <div scSelectGroupLabel>Vegetables</div>
              @for (item of vegetables; track item.value) {
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsSelectDemo {
  protected readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
  ];
  protected readonly vegetables = [
    { value: 'carrot', label: 'Carrot' },
    { value: 'broccoli', label: 'Broccoli' },
    { value: 'spinach', label: 'Spinach' },
  ];
  protected readonly all = [...this.fruits, ...this.vegetables];
  protected readonly food = signal('');
}`;
}
