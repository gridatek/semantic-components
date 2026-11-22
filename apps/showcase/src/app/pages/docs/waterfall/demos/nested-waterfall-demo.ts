import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScWaterfall,
  ScWaterfallAxis,
  ScWaterfallBar,
  ScWaterfallColumnHeader,
  ScWaterfallHeaderRow,
  ScWaterfallIndicator,
  type ScWaterfallItem,
  ScWaterfallRow,
  ScWaterfallRowHeader,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** A trace: spans that started others — closed at first; → and ← (or the chevron) open and close; [(expanded)], [(value)], expandAll(), collapseAll(); times narrow. */
@Component({
  selector: 'app-nested-waterfall-demo',
  imports: [
    ScWaterfall,
    ScWaterfallAxis,
    ScWaterfallBar,
    ScWaterfallColumnHeader,
    ScWaterfallHeaderRow,
    ScWaterfallIndicator,
    ScWaterfallRow,
    ScWaterfallRowHeader,
    ScButton,
    SiChevronRightIcon,
  ],
  template: `
    <div class="grid w-full max-w-2xl gap-3">
      <div class="flex gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="waterfall.expandAll()"
        >
          Expand all
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="waterfall.collapseAll()"
        >
          Collapse all
        </button>
      </div>
      <div
        scWaterfall
        #waterfall="scWaterfall"
        aria-label="Checkout trace"
        [items]="trace"
        [format]="narrow"
        [(expanded)]="expanded"
        [(value)]="selected"
      >
        <div scWaterfallHeaderRow>
          <div scWaterfallColumnHeader class="w-48">Span</div>
          <div
            scWaterfallColumnHeader
            aria-label="Timeline"
            class="min-w-24 flex-1"
          >
            <div scWaterfallAxis></div>
          </div>
        </div>
        @for (row of waterfall.rows(); track row.item.value) {
          <div scWaterfallRow [row]="row">
            <div scWaterfallRowHeader>
              <button scWaterfallIndicator>
                <svg siChevronRightIcon></svg>
              </button>
              {{ row.item.label }}
            </div>
            <div scWaterfallBar></div>
          </div>
        }
      </div>
      <p class="text-muted-foreground text-sm" data-testid="picked">
        {{ selected() ?? 'None' }} · {{ expanded().length }} open
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedWaterfallDemo {
  private readonly expanded = signal<readonly string[]>([]);
  private readonly selected = signal<string | null>(null);
  private readonly narrow: Intl.NumberFormatOptions = {
    style: 'unit',
    unit: 'millisecond',
    unitDisplay: 'narrow',
  };
  private readonly trace: ScWaterfallItem[] = [
    {
      value: 'checkout',
      label: 'POST /checkout',
      start: 0,
      duration: 920,
      children: [
        { value: 'auth', label: 'auth.verify', start: 10, duration: 80 },
        {
          value: 'cart',
          label: 'cart.load',
          start: 100,
          duration: 240,
          children: [
            {
              value: 'cart-db',
              label: 'db.query carts',
              start: 110,
              duration: 120,
            },
            {
              value: 'cart-cache',
              label: 'cache.set',
              start: 240,
              duration: 60,
            },
          ],
        },
        {
          value: 'payment',
          label: 'payment.charge',
          start: 360,
          duration: 480,
          children: [
            {
              value: 'stripe',
              label: 'stripe.charges',
              start: 380,
              duration: 400,
            },
          ],
        },
        { value: 'email', label: 'email.queue', start: 850, duration: 50 },
      ],
    },
  ];
}
