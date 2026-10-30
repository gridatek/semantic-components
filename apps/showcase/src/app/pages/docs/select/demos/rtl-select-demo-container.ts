import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSelectDemo } from './rtl-select-demo';

@Component({
  selector: 'app-rtl-select-demo-container',
  imports: [DemoContainer, RtlSelectDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/select/rtl-select-demo"
      [code]="code"
    >
      <app-rtl-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
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
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-select-demo',
  imports: [
    ScField,
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
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-48">
      <div scField>
        <div scSelect [(value)]="fruit" [items]="fruits">
          <div scSelectLabel>الفاكهة</div>
          <div scSelectTrigger class="w-full">
            <span scSelectValue placeholder="اختر فاكهة"></span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </div>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSelectDemo {
  protected readonly fruits = [
    { value: 'apple', label: 'تفاح' },
    { value: 'banana', label: 'موز' },
    { value: 'blueberry', label: 'توت أزرق' },
    { value: 'grapes', label: 'عنب' },
    { value: 'pineapple', label: 'أناناس' },
  ];
  protected readonly fruit = signal('');
}`;
}
