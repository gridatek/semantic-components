import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
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
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScItem,
  ScItemBody,
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
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Money between accounts: an amount, two selects, and the summary. */
@Component({
  selector: 'app-preview-transfer-funds',
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
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScItem,
    ScItemBody,
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
    ScSeparator,
    SiCheckIcon,
    SiChevronDownIcon,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Transfer Funds</h2>
        <p scCardDescription>Move money between your connected accounts.</p>
        <div scCardAction>
          <button scButton variant="ghost" size="icon-sm" class="bg-muted">
            <svg siXIcon></svg>
            <span class="sr-only">Dismiss transfer funds</span>
          </button>
        </div>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Amount to Transfer</label>
            <div scInputGroup>
              <input scInput [formField]="transfer.amount" />
              <div scInputGroupAddon>
                <span scInputGroupText>$</span>
              </div>
            </div>
          </div>
          @for (select of selects; track select.label) {
            <div scField>
              <div
                scSelect
                class="w-full"
                [items]="select.items"
                [formField]="transfer[select.key]"
              >
                <label scSelectLabel>{{ select.label }}</label>
                <div scSelectTrigger class="w-full">
                  <span scSelectValue></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (item of select.items; track item.value) {
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
          }
          <div scItem variant="muted" class="flex-col items-stretch">
            <div scItemBody class="gap-3">
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground text-sm">
                  Estimated arrival
                </span>
                <span class="text-sm font-medium">Today, Apr 14</span>
              </div>
              <div scSeparator aria-hidden="true"></div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground text-sm">
                  Transaction fee
                </span>
                <span class="text-sm font-medium tabular-nums">$0.00</span>
              </div>
              <div scSeparator aria-hidden="true"></div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Total amount</span>
                <span class="text-sm font-semibold tabular-nums">
                  $1,200.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">Confirm Transfer</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewTransferFunds {
  protected readonly transfer = form(
    signal({ amount: '1,200.00', from: 'checking', to: 'savings' }),
  );
  protected readonly selects = [
    {
      key: 'from',
      label: 'From Account',
      items: [
        { label: 'Main Checking (··8402) — $12,450.00', value: 'checking' },
        { label: 'Business (··7731) — $8,920.00', value: 'business' },
      ],
    },
    {
      key: 'to',
      label: 'To Account',
      items: [
        { label: 'High Yield Savings (··1192) — $42,100.00', value: 'savings' },
        { label: 'Investment (··3349) — $18,200.00', value: 'investment' },
      ],
    },
  ] as const;
}
