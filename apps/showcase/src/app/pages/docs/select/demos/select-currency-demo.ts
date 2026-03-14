import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScButton,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupSeparator,
  ScSelect,
  ScSelectDisplayValue,
  ScSelectIcon,
  ScSelectInput,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectOrigin,
  ScSelectPopup,
  ScSelectPortal,
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
    ScInputGroupAddon,
    ScInputGroupSeparator,
    ScSelect,
    ScSelectDisplayValue,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectOrigin,
    ScSelectInput,
    ScSelectIcon,
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
        <div scInputGroup class="w-80">
          <div scInputGroupAddon align="inline-start">
            <div scSelect class="w-10 min-w-10">
              <div scSelectOrigin>
                <div scInputGroup class="border-none">
                  <span scSelectDisplayValue>{{ displayCurrency() }}</span>
                  <input
                    scSelectInput
                    [formField]="currencyForm.currency"
                    placeholder=""
                    aria-label="Currency dropdown"
                  />
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
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
        </button>
      </div>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCurrencyDemo {
  readonly formModel = signal<FormModel>({ currency: '', amount: '10.00' });
  readonly currencyForm = form(this.formModel);

  displayCurrency = computed(() => {
    const val = this.currencyForm.currency().value();
    const currency = this.currencies.find((c) => c.label === val);
    return currency ? currency.symbol : '$';
  });

  currencies = [
    { value: 'usd', label: 'USD', symbol: '$' },
    { value: 'eur', label: 'EUR', symbol: '€' },
    { value: 'gbp', label: 'GBP', symbol: '£' },
    { value: 'jpy', label: 'JPY', symbol: '¥' },
  ];
}
