import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScLabel,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A currency to choose, the minimum as a bar, and notes. */
@Component({
  selector: 'app-home-payout-threshold',
  imports: [
    ScButton,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldDescription,
    ScFieldGroup,
    ScLabel,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
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
      <div scCardContent>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Preferred Currency</label>
            <div
              scSelect
              [(value)]="currency"
              [items]="currencies"
              class="w-full"
            >
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
                          <span scSelectItemIndicator
                            ><svg siCheckIcon></svg
                          ></span>
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
              <span scLabel>Minimum Payout Amount</span>
              <span class="text-2xl font-semibold tabular-nums">$2500.00</span>
            </div>
            <div
              scProgress
              [value]="25"
              aria-label="Minimum payout amount"
              aria-valuetext="$2,500 of $10,000"
            >
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
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
export class HomePayoutThreshold {
  protected readonly currencies = [
    { label: 'USD — United States Dollar', value: 'usd' },
    { label: 'EUR — Euro', value: 'eur' },
    { label: 'GBP — British Pound', value: 'gbp' },
    { label: 'JPY — Japanese Yen', value: 'jpy' },
  ];
  protected readonly currency = signal('usd');
}
