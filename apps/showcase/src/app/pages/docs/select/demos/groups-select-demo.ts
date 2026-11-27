import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectGroup,
  ScSelectGroupLabel,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
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
    ScField,
    ScLabel,
    ScSelect,
    ScSelectGroup,
    ScSelectGroupLabel,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectSeparator,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-full max-w-48">
      <label scLabel>Food</label>
      <div scSelect [(value)]="food" [items]="all">
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsSelectDemo {
  private readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
  ];
  private readonly vegetables = [
    { value: 'carrot', label: 'Carrot' },
    { value: 'broccoli', label: 'Broccoli' },
    { value: 'spinach', label: 'Spinach' },
  ];
  private readonly all = [...this.fruits, ...this.vegetables];
  private readonly food = signal('');
}
