import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBadge,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemTitle,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** A calendar to pick a day, and the payments to come. */
@Component({
  selector: 'app-preview-upcoming-payments',
  imports: [
    ScBadge,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemTitle,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Upcoming Payments</h2>
        <p scCardDescription>Select a date to view scheduled payments.</p>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <div scItem variant="outline" class="justify-center">
          <div
            scCalendar
            #cal="scCalendar"
            aria-label="Payment date"
            class="w-full [--cell-size:--spacing(8)]"
            [(value)]="date"
          >
            <div scCalendarHeader>
              <button scCalendarPrevious>
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">{{ previous[cal.view()] }}</span>
              </button>
              <button scCalendarNext>
                <svg siChevronRightIcon></svg>
                <span class="sr-only">{{ next[cal.view()] }}</span>
              </button>
            </div>
          </div>
        </div>
        <div scItemGroup role="list" class="w-full">
          @for (payment of payments; track payment.name) {
            <div scItem variant="muted" role="listitem">
              <div scItemBody>
                <div scItemTitle>{{ payment.name }}</div>
                <p scItemDescription>{{ payment.date }}</p>
              </div>
              <span scBadge variant="secondary">{{ payment.amount }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewUpcomingPayments {
  protected readonly date = signal<Temporal.PlainDate | null>(
    Temporal.Now.plainDateISO(),
  );
  protected readonly previous = {
    day: 'Previous month',
    month: 'Previous year',
    year: 'Previous years',
  };
  protected readonly next = {
    day: 'Next month',
    month: 'Next year',
    year: 'Next years',
  };
  protected readonly payments = [
    { name: 'Netflix Subscription', date: 'Apr 15, 2024', amount: '$19.99' },
    { name: 'Rent Payment', date: 'Apr 1, 2024', amount: '$2,400.00' },
    { name: 'Auto Insurance', date: 'Apr 22, 2024', amount: '$186.00' },
  ];
}
