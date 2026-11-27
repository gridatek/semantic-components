import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
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
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-select-demo',
  imports: [
    ScField,
    ScLabel,
    Dir,
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
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-48">
      <div scField class="w-full">
        <label scLabel>الفاكهة</label>
        <div scSelect [(value)]="fruit" [items]="fruits">
          <button scSelectTrigger>
            <span scSelectValue placeholder="اختر فاكهة"></span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </button>
          <ng-template scSelectPortal>
            <div scSelectPopup dir="rtl" lang="ar">
              <div scSelectList>
                <div scSelectGroup>
                  <div scSelectGroupLabel>الفواكه</div>
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
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSelectDemo {
  private readonly fruits = [
    { value: 'apple', label: 'تفاح' },
    { value: 'banana', label: 'موز' },
    { value: 'blueberry', label: 'توت أزرق' },
    { value: 'grapes', label: 'عنب' },
    { value: 'pineapple', label: 'أناناس' },
  ];
  private readonly fruit = signal('');
}
