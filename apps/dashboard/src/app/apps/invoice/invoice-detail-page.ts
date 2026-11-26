import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyTitle,
  ScLink,
  ScSeparator,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableFooter,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiLayoutDashboardIcon,
  SiPencilIcon,
  SiPrinterIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { count, day, money, percent } from '../../shared/format';
import { label } from '../../shared/labels';
import {
  InvoiceStore,
  invoiceBadge,
  subtotalOf,
  totalOf,
} from './invoice-store';

/** Invoice details (Pro): the invoice as it prints, its actions. */
@Component({
  selector: 'app-invoice-detail-page',
  imports: [
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyTitle,
    ScLink,
    ScSeparator,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableFooter,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiCheckIcon,
    SiLayoutDashboardIcon,
    SiPencilIcon,
    SiPrinterIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="invoice()?.id ?? t.invoice"
      [trail]="[
        { label: t.apps },
        { label: t.invoices, url: '/apps/invoice/list' },
        { label: id() },
      ]"
    >
      @if (invoice(); as invoice) {
        @if (invoice.status !== 'Paid') {
          <button scButton variant="outline" (click)="markPaid()">
            <svg siCheckIcon></svg>
            <ng-container i18n="@@invoice.detail.markAsPaid"
              >Mark as paid</ng-container
            >
          </button>
        }
        <button scButton variant="outline" (click)="print()">
          <svg siPrinterIcon></svg>
          <ng-container i18n="@@invoice.detail.print">Print</ng-container>
        </button>
        <a
          scLink
          variant="button"
          [routerLink]="['/apps/invoice/edit', invoice.id]"
        >
          <svg siPencilIcon></svg>
          <ng-container i18n="@@invoice.detail.edit">Edit</ng-container>
        </a>
      }
    </app-page-header>

    @if (invoice(); as invoice) {
      <div scCard class="mx-auto w-full max-w-4xl">
        <div scCardBody class="flex flex-col gap-8 p-6 md:p-10">
          <div class="flex flex-wrap items-start justify-between gap-6">
            <div class="flex items-center gap-2 font-semibold">
              <span
                class="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg"
              >
                <svg siLayoutDashboardIcon></svg>
              </span>
              <ng-container i18n="@@invoice.detail.dashboardInc"
                >Dashboard Inc.</ng-container
              >
            </div>
            <div class="flex flex-col items-end gap-1 text-end">
              <h2
                i18n="@@invoice.detail.invoice"
                class="text-2xl font-semibold"
              >
                Invoice
              </h2>
              <span class="text-muted-foreground text-sm">{{
                invoice.id
              }}</span>
              <span scBadge [variant]="badgeOf(invoice.status)">{{
                labelOf(invoice.status)
              }}</span>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-3">
            <div class="flex flex-col gap-1 text-sm">
              <h3
                i18n="@@invoice.detail.from"
                class="text-muted-foreground text-xs font-medium uppercase"
              >
                From
              </h3>
              <span i18n="@@invoice.detail.dashboardInc" class="font-medium"
                >Dashboard Inc.</span
              >
              <span i18n="@@invoice.detail.n350FifthAvenueNewYork"
                >350 Fifth Avenue, New York, NY 10118</span
              >
              <span i18n="@@invoice.detail.billingDashboardExample"
                >billing&#64;dashboard.example</span
              >
            </div>
            <div class="flex flex-col gap-1 text-sm">
              <h3
                i18n="@@invoice.detail.billTo"
                class="text-muted-foreground text-xs font-medium uppercase"
              >
                Bill to
              </h3>
              <span class="font-medium">{{ invoice.client }}</span>
              <span>{{ invoice.address }}</span>
              <span>{{ invoice.email }}</span>
            </div>
            <dl
              class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm sm:justify-self-end"
            >
              <dt i18n="@@invoice.detail.issued" class="text-muted-foreground">
                Issued
              </dt>
              <dd>{{ dayOf(invoice.issued) }}</dd>
              <dt i18n="@@invoice.detail.due" class="text-muted-foreground">
                Due
              </dt>
              <dd>{{ dayOf(invoice.due) }}</dd>
            </dl>
          </div>

          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n="@@invoice.detail.description" scTableHeaderCell>
                    Description
                  </th>
                  <th
                    i18n="@@invoice.detail.qty"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Qty
                  </th>
                  <th
                    i18n="@@invoice.detail.price"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Price
                  </th>
                  <th
                    i18n="@@invoice.detail.amount"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (line of invoice.lines; track $index) {
                  <tr scTableRow>
                    <td scTableCell>{{ line.description }}</td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ countOf(line.quantity) }}
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ moneyOf(line.price) }}
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ moneyOf(line.quantity * line.price) }}
                    </td>
                  </tr>
                }
              </tbody>
              <tfoot scTableFooter>
                <tr scTableRow>
                  <td
                    i18n="@@invoice.detail.subtotal"
                    scTableCell
                    colspan="3"
                    class="text-end"
                  >
                    Subtotal
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ moneyOf(subtotal()) }}
                  </td>
                </tr>
                <tr scTableRow>
                  <td
                    i18n="@@invoice.detail.tax"
                    scTableCell
                    colspan="3"
                    class="text-end"
                  >
                    Tax ({{ percentOf(invoice.taxRate / 100) }})
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ moneyOf(total() - subtotal()) }}
                  </td>
                </tr>
                <tr scTableRow>
                  <td
                    i18n="@@invoice.detail.total"
                    scTableCell
                    colspan="3"
                    class="text-end font-semibold"
                  >
                    Total
                  </td>
                  <td scTableCell class="text-end font-semibold tabular-nums">
                    {{ moneyOf(total()) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          @if (invoice.notes) {
            <div scSeparator></div>
            <p class="text-muted-foreground text-sm">{{ invoice.notes }}</p>
          }
        </div>
      </div>
    } @else {
      <div scEmpty>
        <div scEmptyHeader>
          <h2 i18n="@@invoice.detail.noInvoice" scEmptyTitle>
            No invoice {{ id() }}
          </h2>
          <div i18n="@@invoice.detail.itMayHaveBeenDeleted" scEmptyDescription>
            It may have been deleted.
            <a scLink routerLink="/apps/invoice/list">Back to the invoices</a>
          </div>
        </div>
      </div>
    }
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceDetailPage {
  /** In the user's numbering system. */
  private readonly percentOf = percent;

  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    invoice: $localize`:@@invoice.detail.invoice:Invoice`,
    apps: $localize`:@@invoice.detail.apps:Apps`,
    invoices: $localize`:@@invoice.detail.invoices:Invoices`,
  };

  /** The route's `:id`. */
  readonly id = input.required<string>();

  private readonly store = inject(InvoiceStore);
  private readonly toaster = inject(ScToaster);
  private readonly invoice = computed(() => this.store.byId(this.id()) ?? null);
  private readonly subtotal = computed(() => {
    const invoice = this.invoice();
    return invoice ? subtotalOf(invoice) : 0;
  });
  private readonly total = computed(() => {
    const invoice = this.invoice();
    return invoice ? totalOf(invoice) : 0;
  });
  private readonly dayOf = day;
  private readonly moneyOf = money;
  private readonly badgeOf = invoiceBadge;

  private markPaid(): void {
    this.store.setStatus(this.id(), 'Paid');
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@invoice.detail.markedAsPaid:${this.id()} marked as paid`,
    });
  }

  private print(): void {
    globalThis.print?.();
  }
}
