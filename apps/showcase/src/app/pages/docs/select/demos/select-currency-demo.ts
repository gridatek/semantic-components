import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScButton,
  ScInputGroup,
  ScInputGroupSeparator,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
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

interface FormModel {
  currency: string;
  amount: string;
}

@Component({
  selector: 'app-select-currency-demo',
  imports: [
    ScButton,
    ScInputGroup,
    ScInputGroupSeparator,
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectIcon,
    ScSelectTrigger,
    ScSelectValue,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiArrowRightIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="currencyForm">
      <div class="flex items-center gap-2">
        <div
          scInputGroup
          class="has-[[data-slot=select-trigger]:focus-visible]:border-ring has-[[data-slot=select-trigger]:focus-visible]:ring-ring/50 w-80 has-[[data-slot=select-trigger]:focus-visible]:ring-3"
        >
          <div
            scSelect
            class="w-12 min-w-12"
            [formField]="currencyForm.currency"
            placeholder="$"
          >
            <div
              scSelectTrigger
              class="h-full gap-1 border-0 bg-transparent ps-2.5 pe-0 focus-visible:ring-0 dark:bg-transparent"
              aria-label="Currency"
            >
              <span scSelectValue>{{ selectedCurrency()?.symbol }}</span>
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  @for (currency of currencies; track currency.value) {
                    <div
                      scSelectItem
                      [value]="currency.value"
                      [label]="currency.label"
                    >
                      <span scSelectItemLabel>{{ currency.label }}</span>
                      <svg scSelectItemIndicator siCheckIcon></svg>
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
          <div scInputGroupSeparator class="mx-2"></div>
          <input
            class="w-full border-none outline-none"
            type="text"
            [formField]="currencyForm.amount"
            placeholder="0.00"
            aria-label="Amount"
          />
        </div>
        <button scButton variant="outline" size="icon">
          <svg siArrowRightIcon></svg>
          <span class="sr-only">Convert</span>
        </button>
      </div>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectCurrencyDemo {
  readonly formModel = signal<FormModel>({ currency: 'usd', amount: '10.00' });
  readonly currencyForm = form(this.formModel);

  readonly selectedCurrency = computed(() =>
    this.currencies.find(
      (c) => c.value === this.currencyForm.currency().value(),
    ),
  );

  currencies = [
    { value: 'usd', label: 'USD', symbol: '$' },
    { value: 'eur', label: 'EUR', symbol: '€' },
    { value: 'gbp', label: 'GBP', symbol: '£' },
    { value: 'jpy', label: 'JPY', symbol: '¥' },
  ];
}
