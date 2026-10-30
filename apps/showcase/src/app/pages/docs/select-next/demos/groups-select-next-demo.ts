import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScSelectNext,
  ScSelectNextGroup,
  ScSelectNextGroupLabel,
  ScSelectNextIcon,
  ScSelectNextItem,
  ScSelectNextItemIndicator,
  ScSelectNextItemText,
  ScSelectNextLabel,
  ScSelectNextList,
  ScSelectNextPopup,
  ScSelectNextPortal,
  ScSelectNextSeparator,
  ScSelectNextTrigger,
  ScSelectNextValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-groups-select-next-demo',
  imports: [
    ScField,
    ScSelectNext,
    ScSelectNextGroup,
    ScSelectNextGroupLabel,
    ScSelectNextIcon,
    ScSelectNextItem,
    ScSelectNextItemIndicator,
    ScSelectNextItemText,
    ScSelectNextLabel,
    ScSelectNextList,
    ScSelectNextPopup,
    ScSelectNextPortal,
    ScSelectNextSeparator,
    ScSelectNextTrigger,
    ScSelectNextValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-full max-w-48">
      <div scSelectNext [(value)]="food" [items]="all">
        <div scSelectNextLabel>Food</div>
        <div scSelectNextTrigger class="w-full">
          <span scSelectNextValue placeholder="Select a fruit"></span>
          <svg scSelectNextIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectNextPortal>
          <div scSelectNextPopup>
            <div scSelectNextList>
              <div scSelectNextGroup>
                <div scSelectNextGroupLabel>Fruits</div>
                @for (item of fruits; track item.value) {
                  <div scSelectNextItem [value]="item.value">
                    <span scSelectNextItemText>{{ item.label }}</span>
                    <span scSelectNextItemIndicator>
                      <svg siCheckIcon></svg>
                    </span>
                  </div>
                }
              </div>
              <div scSelectNextSeparator></div>
              <div scSelectNextGroup>
                <div scSelectNextGroupLabel>Vegetables</div>
                @for (item of vegetables; track item.value) {
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsSelectNextDemo {
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
}
