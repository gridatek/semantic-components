import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSelectNextDemo } from './rtl-select-next-demo';

@Component({
  selector: 'app-rtl-select-next-demo-container',
  imports: [DemoContainer, RtlSelectNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/select-next/rtl-select-next-demo"
      [code]="code"
    >
      <app-rtl-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScSelectNextTrigger,
  ScSelectNextValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-select-next-demo',
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
    ScSelectNextTrigger,
    ScSelectNextValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-48">
      <div scField>
        <div scSelectNext [(value)]="fruit" [items]="fruits">
          <div scSelectNextLabel>الفاكهة</div>
          <div scSelectNextTrigger class="w-full">
            <span scSelectNextValue placeholder="اختر فاكهة"></span>
            <svg scSelectNextIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectNextPortal>
            <div scSelectNextPopup dir="rtl" lang="ar">
              <div scSelectNextList>
                <div scSelectNextGroup>
                  <div scSelectNextGroupLabel>الفواكه</div>
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
export class RtlSelectNextDemo {
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
