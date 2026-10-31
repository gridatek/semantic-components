import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlControlGroupDemo } from './rtl-control-group-demo';

@Component({
  selector: 'app-rtl-control-group-demo-container',
  imports: [DemoContainer, RtlControlGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/control-group/rtl-control-group-demo"
      [code]="code"
    >
      <app-rtl-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlControlGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScButton,
  ScControlGroup,
  ScInput,
  ScSelect,
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
import {
  SiArrowRightIcon,
  SiCheckIcon,
  SiChevronDownIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-control-group-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScControlGroup,
    ScInput,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiArrowRightIcon,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <form [formRoot]="paymentForm" dir="rtl" lang="ar">
      <div scControlGroup aria-label="الدفع">
        <div scSelect [formField]="paymentForm.currency">
          <div scSelectTrigger aria-label="العملة">
            <span scSelectValue>{{ paymentForm.currency().value() }}</span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectPortal>
            <div scSelectPopup class="min-w-36" dir="rtl" lang="ar">
              <div scSelectList>
                @for (currency of currencies; track currency.value) {
                  <div
                    scSelectItem
                    [value]="currency.value"
                    [label]="currency.value"
                  >
                    <span scSelectItemText>{{ currency.label }}</span>
                    <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                  </div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <input
          scInput
          [formField]="paymentForm.amount"
          placeholder="10.00"
          aria-label="المبلغ"
        />
        <button scButton variant="outline" size="icon" type="submit">
          <svg siArrowRightIcon class="rtl:rotate-180"></svg>
          <span class="sr-only">إرسال</span>
        </button>
      </div>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlControlGroupDemo {
  protected readonly currencies = [
    { value: 'د.م.', label: 'درهم مغربي' },
    { value: '$', label: 'دولار أمريكي' },
    { value: '€', label: 'يورو' },
  ];

  private readonly model = signal({ currency: 'د.م.', amount: '' });
  protected readonly paymentForm = form(this.model);
}`;
}
