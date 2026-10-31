import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectControlGroupDemo } from './select-control-group-demo';

@Component({
  selector: 'app-select-control-group-demo-container',
  imports: [DemoContainer, SelectControlGroupDemo],
  template: `
    <app-demo-container
      title="Select"
      demoUrl="/demos/control-group/select-control-group-demo"
      [code]="code"
    >
      <app-select-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectControlGroupDemoContainer {
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
  selector: 'app-select-control-group-demo',
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
    <form [formRoot]="paymentForm">
      <div scControlGroup aria-label="Payment">
        <div scControlGroup>
          <div scSelect [formField]="paymentForm.currency">
            <div scSelectTrigger class="font-mono" aria-label="Currency">
              <span scSelectValue>{{ paymentForm.currency().value() }}</span>
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup class="min-w-36">
                <div scSelectList>
                  @for (currency of currencies; track currency.value) {
                    <div
                      scSelectItem
                      [value]="currency.value"
                      [label]="currency.value"
                    >
                      <span scSelectItemText>
                        {{ currency.value }}
                        <span class="text-muted-foreground">
                          {{ currency.label }}
                        </span>
                      </span>
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
            aria-label="Amount"
          />
        </div>
        <div scControlGroup>
          <button scButton variant="outline" size="icon" type="submit">
            <svg siArrowRightIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectControlGroupDemo {
  protected readonly currencies = [
    { value: '$', label: 'US Dollar' },
    { value: '€', label: 'Euro' },
    { value: '£', label: 'British Pound' },
  ];

  private readonly model = signal({ currency: '$', amount: '' });
  protected readonly paymentForm = form(this.model);
}`;
}
