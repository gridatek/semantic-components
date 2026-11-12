import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableRow,
} from '@semantic-components/ui';
import {
  SiCarIcon,
  SiCoffeeIcon,
  SiEllipsisIcon,
  SiShoppingCartIcon,
  SiTvIcon,
  SiWalletIcon,
} from '@semantic-icons/lucide-icons';

/** The latest transactions: a table, each row with a menu of its own. */
@Component({
  selector: 'app-preview-recent-transactions',
  imports: [
    ScFrame,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableRow,
    SiCarIcon,
    SiCoffeeIcon,
    SiEllipsisIcon,
    SiShoppingCartIcon,
    SiTvIcon,
    SiWalletIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Recent Transactions</h2>
        <p scCardDescription>Your latest account activity.</p>
        <div scCardAction>
          <button scButton variant="outline" size="sm">View All</button>
        </div>
      </div>
      <div scCardContent>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Recent transactions"
        >
          <table scTable>
            <tbody scTableBody>
              @for (t of transactions; track t.name) {
                <tr scTableRow>
                  <td scTableCell class="w-10">
                    <div
                      scFrame
                      size="sm"
                      class="bg-muted flex size-10 items-center justify-center"
                    >
                      @switch (t.icon) {
                        @case ('coffee') {
                          <svg siCoffeeIcon class="size-4 shrink-0"></svg>
                        }
                        @case ('cart') {
                          <svg siShoppingCartIcon class="size-4 shrink-0"></svg>
                        }
                        @case ('wallet') {
                          <svg siWalletIcon class="size-4 shrink-0"></svg>
                        }
                        @case ('car') {
                          <svg siCarIcon class="size-4 shrink-0"></svg>
                        }
                        @default {
                          <svg siTvIcon class="size-4 shrink-0"></svg>
                        }
                      }
                    </div>
                  </td>
                  <td scTableCell>
                    <div class="flex flex-col">
                      <span class="font-medium">{{ t.name }}</span>
                      <span class="text-muted-foreground text-sm">{{
                        t.category
                      }}</span>
                    </div>
                  </td>
                  <td scTableCell class="text-muted-foreground text-sm">
                    {{ t.date }}
                  </td>
                  <td scTableCell class="text-end">
                    <span
                      class="text-sm font-semibold tabular-nums"
                      [class.text-emerald-700]="t.income"
                      [class.dark:text-emerald-400]="t.income"
                      >{{ t.amount }}</span
                    >
                  </td>
                  <td scTableCell class="w-8">
                    <div scMenuProvider align="end">
                      <button
                        scButton
                        scMenuTrigger
                        variant="ghost"
                        size="icon-sm"
                      >
                        <svg siEllipsisIcon></svg>
                        <span class="sr-only">{{ t.name }} actions</span>
                      </button>
                      <ng-template scMenuPortal>
                        <div scMenu>
                          <ng-template scMenuContent>
                            <div scMenuItem value="details">View details</div>
                            <div scMenuItem value="note">Add note</div>
                            <div scMenuItem value="categorize">Categorize</div>
                            <div scMenuSeparator></div>
                            <div scMenuItem value="dispute">Dispute</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewRecentTransactions {
  protected readonly transactions = [
    {
      icon: 'coffee',
      name: 'Blue Bottle Coffee',
      category: 'Food & Drink',
      date: 'Today, 10:24 AM',
      amount: '-$6.50',
      income: false,
    },
    {
      icon: 'cart',
      name: 'Whole Foods Market',
      category: 'Groceries',
      date: 'Yesterday',
      amount: '-$142.30',
      income: false,
    },
    {
      icon: 'wallet',
      name: 'Stripe Payout',
      category: 'Income',
      date: 'Oct 12',
      amount: '+$4,200.00',
      income: true,
    },
    {
      icon: 'car',
      name: 'Uber Technologies',
      category: 'Transport',
      date: 'Oct 11',
      amount: '-$24.10',
      income: false,
    },
    {
      icon: 'tv',
      name: 'Netflix Subscription',
      category: 'Entertainment',
      date: 'Oct 10',
      amount: '-$19.99',
      income: false,
    },
  ];
}
