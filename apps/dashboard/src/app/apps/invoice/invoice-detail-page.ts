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
import { day, money } from '../../shared/format';
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
      [title]="invoice()?.id ?? 'Invoice'"
      [trail]="[
        { label: 'Apps' },
        { label: 'Invoices', url: '/apps/invoice/list' },
        { label: id() },
      ]"
    >
      @if (invoice(); as invoice) {
        @if (invoice.status !== 'Paid') {
          <button scButton variant="outline" (click)="markPaid()">
            <svg siCheckIcon></svg>
            Mark as paid
          </button>
        }
        <button scButton variant="outline" (click)="print()">
          <svg siPrinterIcon></svg>
          Print
        </button>
        <a
          scLink
          variant="button"
          [routerLink]="['/apps/invoice/edit', invoice.id]"
        >
          <svg siPencilIcon></svg>
          Edit
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
              Dashboard Inc.
            </div>
            <div class="flex flex-col items-end gap-1 text-end">
              <h2 class="text-2xl font-semibold">Invoice</h2>
              <span class="text-muted-foreground text-sm">{{
                invoice.id
              }}</span>
              <span scBadge [variant]="badgeOf(invoice.status)">{{
                invoice.status
              }}</span>
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-3">
            <div class="flex flex-col gap-1 text-sm">
              <h3 class="text-muted-foreground text-xs font-medium uppercase">
                From
              </h3>
              <span class="font-medium">Dashboard Inc.</span>
              <span>350 Fifth Avenue, New York, NY 10118</span>
              <span>billing&#64;dashboard.example</span>
            </div>
            <div class="flex flex-col gap-1 text-sm">
              <h3 class="text-muted-foreground text-xs font-medium uppercase">
                Bill to
              </h3>
              <span class="font-medium">{{ invoice.client }}</span>
              <span>{{ invoice.address }}</span>
              <span>{{ invoice.email }}</span>
            </div>
            <dl
              class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm sm:justify-self-end"
            >
              <dt class="text-muted-foreground">Issued</dt>
              <dd>{{ dayOf(invoice.issued) }}</dd>
              <dt class="text-muted-foreground">Due</dt>
              <dd>{{ dayOf(invoice.due) }}</dd>
            </dl>
          </div>

          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th scTableHeaderCell>Description</th>
                  <th scTableHeaderCell class="text-end">Qty</th>
                  <th scTableHeaderCell class="text-end">Price</th>
                  <th scTableHeaderCell class="text-end">Amount</th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (line of invoice.lines; track $index) {
                  <tr scTableRow>
                    <td scTableCell>{{ line.description }}</td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ line.quantity }}
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
                  <td scTableCell colspan="3" class="text-end">Subtotal</td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ moneyOf(subtotal()) }}
                  </td>
                </tr>
                <tr scTableRow>
                  <td scTableCell colspan="3" class="text-end">
                    Tax ({{ invoice.taxRate }}%)
                  </td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ moneyOf(total() - subtotal()) }}
                  </td>
                </tr>
                <tr scTableRow>
                  <td scTableCell colspan="3" class="text-end font-semibold">
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
          <h2 scEmptyTitle>No invoice {{ id() }}</h2>
          <div scEmptyDescription>
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
      title: `${this.id()} marked as paid`,
    });
  }

  private print(): void {
    globalThis.print?.();
  }
}
