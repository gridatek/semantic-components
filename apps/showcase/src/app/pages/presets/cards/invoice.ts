import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';

const ITEMS = [
  { item: 'Design System License', qty: 1, unitPrice: 499 },
  { item: 'Priority Support', qty: 12, unitPrice: 99 },
  { item: 'Custom Components', qty: 3, unitPrice: 250 },
];

/** An invoice: its lines in a table, the totals under them. */
@Component({
  selector: 'app-preview-invoice',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Invoice #INV-2847</h2>
        <p scCardDescription>Due March 30, 2026</p>
        <div scCardAction>
          <span scBadge variant="secondary">Pending</span>
        </div>
      </div>
      <div scCardContent>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Invoice items"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Item</th>
                <th scTableHeaderCell class="text-end">Qty</th>
                <th scTableHeaderCell class="text-end">Rate</th>
                <th scTableHeaderCell class="text-end">Amount</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of items; track row.item) {
                <tr scTableRow>
                  <td scTableCell>{{ row.item }}</td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ row.qty }}
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ money(row.unitPrice) }}
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ money(row.qty * row.unitPrice) }}
                  </td>
                </tr>
              }
              <tr scTableRow>
                <td scTableCell colspan="3" class="text-end">Subtotal</td>
                <td scTableCell class="text-end tabular-nums">
                  {{ money(subtotal) }}
                </td>
              </tr>
              <tr scTableRow>
                <td scTableCell colspan="3" class="text-end">Tax</td>
                <td scTableCell class="text-end tabular-nums">$0.00</td>
              </tr>
              <tr scTableRow>
                <td scTableCell colspan="3" class="text-end">Total Due</td>
                <td scTableCell class="text-end tabular-nums">
                  {{ money(subtotal) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div scCardFooter>
        <button scButton variant="outline" size="sm">Download PDF</button>
        <button scButton size="sm" class="ms-auto">Pay Now</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewInvoice {
  protected readonly items = ITEMS;
  protected readonly subtotal = ITEMS.reduce(
    (sum, row) => sum + row.qty * row.unitPrice,
    0,
  );
  private readonly format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

  protected money(value: number): string {
    return this.format.format(value);
  }
}
