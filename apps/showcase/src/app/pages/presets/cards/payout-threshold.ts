import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScLabel,
  ScSelect,
  ScSelectGroup,
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
  ScSlider,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A payout's threshold: a currency, the amount on a slider, notes. */
@Component({
  selector: 'app-preview-payout-threshold',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScLabel,
    ScSelect,
    ScSelectGroup,
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
    ScSlider,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Payout Threshold</h2>
        <p scCardDescription>
          Set the minimum balance required before a payout is triggered.
        </p>
        <div scCardAction>
          <button scButton variant="ghost" size="icon-sm" class="bg-muted">
            <svg siXIcon></svg>
            <span class="sr-only">Dismiss payout threshold</span>
          </button>
        </div>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <div
              scSelect
              class="w-full"
              [items]="currencies"
              [formField]="payout.currency"
            >
              <label scSelectLabel>Preferred Currency</label>
              <div scSelectTrigger class="w-full">
                <span scSelectValue></span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </div>
              <ng-template scSelectPortal>
                <div scSelectPopup>
                  <div scSelectList>
                    <div scSelectGroup>
                      @for (item of currencies; track item.value) {
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
          <div scField>
            <div class="flex items-baseline justify-between">
              <label scLabel>Minimum Payout Amount</label>
              <span class="text-2xl font-semibold tabular-nums">
                &#36;{{ payout.amount().value().toFixed(2) }}
              </span>
            </div>
            <input scSlider [step]="50" [formField]="payout.amount" />
            <div class="flex items-center justify-between">
              <p scFieldDescription>$50 (MIN)</p>
              <p scFieldDescription>$10,000 (MAX)</p>
            </div>
          </div>
          <div scField>
            <label scLabel>Notes</label>
            <textarea
              scTextarea
              placeholder="Add any notes for this payout configuration..."
              class="min-h-[100px]"
              [formField]="payout.notes"
            ></textarea>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">Save Threshold</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPayoutThreshold {
  protected readonly currencies = [
    { label: 'USD — United States Dollar', value: 'usd' },
    { label: 'EUR — Euro', value: 'eur' },
    { label: 'GBP — British Pound', value: 'gbp' },
    { label: 'JPY — Japanese Yen', value: 'jpy' },
  ];
  protected readonly payout = form(
    signal({ currency: 'usd', amount: 2500, notes: '' }),
    (path) => {
      min(path.amount, 50);
      max(path.amount, 10000);
    },
  );
}
