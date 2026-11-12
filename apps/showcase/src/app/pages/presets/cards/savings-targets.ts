import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupText,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemFooter,
  ScItemGroup,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Two cards side by side: savings goals, and an investment to buy. */
@Component({
  selector: 'app-preview-savings-targets',
  imports: [
    FormField,
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
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupText,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemFooter,
    ScItemGroup,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    SiChevronDownIcon,
  ],
  template: `
    <div class="grid grid-cols-2 gap-6">
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle>Savings Targets</h2>
          <p scCardDescription>Active milestones for 2024</p>
          <div scCardAction>
            <button scButton variant="outline" size="sm">New Goal</button>
          </div>
        </div>
        <div scCardContent>
          <div scItemGroup role="list" class="gap-3">
            @for (goal of goals; track goal.name) {
              <div
                scItem
                role="listitem"
                variant="muted"
                class="flex-col items-stretch"
              >
                <div scItemBody class="gap-3">
                  <p
                    scItemDescription
                    class="font-heading text-muted-foreground text-xs font-medium tracking-wider uppercase"
                  >
                    {{ goal.name }}
                  </p>
                  <span class="text-3xl font-semibold tabular-nums">{{
                    goal.target
                  }}</span>
                  <div
                    scProgress
                    [value]="goal.percent"
                    [attr.aria-label]="goal.name + ' savings progress'"
                  >
                    <div scProgressTrack><div scProgressRange></div></div>
                  </div>
                </div>
                <div scItemFooter>
                  <span class="text-muted-foreground text-sm"
                    >{{ goal.percent }}% achieved</span
                  >
                  <span class="text-sm font-medium tabular-nums">{{
                    goal.saved
                  }}</span>
                </div>
              </div>
            }
          </div>
        </div>
        <div scCardFooter>
          <p scCardDescription class="text-center">
            You have not met your targets for this year.
          </p>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle>Buy Investment</h2>
        </div>
        <div scCardContent class="flex flex-1 flex-col gap-3">
          <div scFieldGroup class="flex-1">
            <div scField>
              <label scLabel>Amount to Invest</label>
              <div scInputGroup>
                <input scInput [formField]="order.amount" />
                <div scInputGroupAddon>
                  <span scInputGroupText>$</span>
                </div>
              </div>
            </div>
            <div scField>
              <label scLabel>Order Type</label>
              <div scNativeSelectContainer class="w-full">
                <select scNativeSelect [formField]="order.type">
                  <option scNativeSelectOption value="market">
                    Market Order
                  </option>
                  <option scNativeSelectOption value="limit">
                    Limit Order
                  </option>
                  <option scNativeSelectOption value="stop">Stop Order</option>
                </select>
                <svg siChevronDownIcon scNativeSelectIcon></svg>
              </div>
              <p scFieldDescription>
                Market orders execute at the current price.
              </p>
            </div>
            <dl class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <dt class="text-muted-foreground text-sm">Estimated Shares</dt>
                <dd class="text-sm font-semibold tabular-nums">1.95</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-muted-foreground text-sm">Buying Power</dt>
                <dd class="text-sm font-semibold tabular-nums">$12,450.00</dd>
              </div>
            </dl>
          </div>
        </div>
        <div scCardFooter class="flex-col gap-3">
          <button scButton class="w-full">Review Order</button>
          <p scCardDescription class="text-center">
            Trades are typically executed within minutes during market hours.
          </p>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSavingsTargets {
  protected readonly goals = [
    { name: 'Retirement', target: '$420,000', percent: 65, saved: '$273,000' },
    { name: 'Real Estate', target: '$85,000', percent: 32, saved: '$27,200' },
  ];
  protected readonly order = form(
    signal({ amount: '1,000.00', type: 'market' }),
  );
}
