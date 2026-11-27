import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLink,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiEyeIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiSearchIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import {
  AppStatCard,
  AppStatCardLabel,
  AppStatCardValue,
} from '../../components/stat-card';
import { PageHeader } from '../../layout/page-header';
import { injectFormats } from '../../shared/formats';
import { label } from '../../shared/labels';
import {
  INVOICE_STATUSES,
  type Invoice,
  InvoiceStore,
  invoiceBadge,
  totalOf,
} from './invoice-store';

/** Invoice list (Pro): totals by status, search, the invoices. */
@Component({
  selector: 'app-invoice-list-page',
  imports: [
    RouterLink,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLink,
    AppStatCard,
    AppStatCardLabel,
    AppStatCardValue,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScToggleGroup,
    ScToggleGroupItem,
    SiEyeIcon,
    SiPencilIcon,
    SiPlusIcon,
    SiSearchIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@invoice.list.invoices"
      title="Invoices"
      [trail]="[{ label: t.apps }, { label: t.invoices }]"
    >
      <a scLink variant="button" routerLink="/apps/invoice/create">
        <svg siPlusIcon></svg>
        <ng-container i18n="@@invoice.list.newInvoice"
          >New Invoice</ng-container
        >
      </a>
    </app-page-header>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      @for (box of totals(); track box.label) {
        <dl appStatCard>
          <dt appStatCardLabel>{{ box.label }}</dt>
          <dd
            appStatCardValue
            [value]="box.amount"
            [format]="{ style: 'currency', currency: 'USD' }"
          ></dd>
        </dl>
      }
    </div>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <div scInputGroup class="max-w-xs">
            <input
              i18n-aria-label="@@invoice.list.searchInvoices"
              i18n-placeholder="@@invoice.list.searchInvoices"
              scInput
              type="search"
              placeholder="Search invoices"
              aria-label="Search invoices"
              [value]="query()"
              (input)="query.set($any($event.target).value)"
            />
            <div scInputGroupAddon><svg siSearchIcon></svg></div>
          </div>
          <div
            i18n-aria-label="@@invoice.list.status"
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Status"
            [value]="[status()]"
            (valueChange)="status.set($event[0] ?? 'All')"
          >
            <button i18n="@@invoice.list.all" scToggleGroupItem value="All">
              All
            </button>
            @for (s of statuses; track s) {
              <button scToggleGroupItem [value]="s">{{ labelOf(s) }}</button>
            }
          </div>
        </div>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th i18n="@@invoice.list.invoice" scTableHeaderCell>Invoice</th>
                <th i18n="@@invoice.list.client" scTableHeaderCell>Client</th>
                <th i18n="@@invoice.list.issued" scTableHeaderCell>Issued</th>
                <th i18n="@@invoice.list.due" scTableHeaderCell>Due</th>
                <th
                  i18n="@@invoice.list.total"
                  scTableHeaderCell
                  class="text-end"
                >
                  Total
                </th>
                <th i18n="@@invoice.list.status" scTableHeaderCell>Status</th>
                <th i18n="@@invoice.list.actions" scTableHeaderCell>
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (invoice of shown(); track invoice.id) {
                <tr scTableRow>
                  <td scTableCell>
                    <a
                      scLink
                      [routerLink]="['/apps/invoice/detail', invoice.id]"
                      >{{ invoice.id }}</a
                    >
                  </td>
                  <td scTableCell>
                    <div class="flex flex-col">
                      <span class="font-medium">{{ invoice.client }}</span>
                      <span class="text-muted-foreground text-xs">{{
                        invoice.email
                      }}</span>
                    </div>
                  </td>
                  <td scTableCell>{{ f.day(invoice.issued) }}</td>
                  <td scTableCell>{{ f.day(invoice.due) }}</td>
                  <td scTableCell class="text-end tabular-nums">
                    {{ f.money(total(invoice)) }}
                  </td>
                  <td scTableCell>
                    <span scBadge [variant]="badgeOf(invoice.status)">{{
                      labelOf(invoice.status)
                    }}</span>
                  </td>
                  <td scTableCell>
                    <div class="flex justify-end gap-1">
                      <a
                        scLink
                        variant="ghost"
                        size="icon-sm"
                        [routerLink]="['/apps/invoice/detail', invoice.id]"
                      >
                        <svg siEyeIcon></svg>
                        <span i18n="@@invoice.list.view" class="sr-only"
                          >View {{ invoice.id }}</span
                        >
                      </a>
                      <a
                        scLink
                        variant="ghost"
                        size="icon-sm"
                        [routerLink]="['/apps/invoice/edit', invoice.id]"
                      >
                        <svg siPencilIcon></svg>
                        <span i18n="@@invoice.list.edit" class="sr-only"
                          >Edit {{ invoice.id }}</span
                        >
                      </a>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-sm"
                        (click)="remove(invoice)"
                      >
                        <svg siTrash2Icon></svg>
                        <span i18n="@@invoice.list.delete" class="sr-only"
                          >Delete {{ invoice.id }}</span
                        >
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n="@@invoice.list.noInvoicesMatch"
                    scTableCell
                    colspan="7"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No invoices match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceListPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@invoice.list.apps:Apps`,
    invoices: $localize`:@@invoice.list.invoices:Invoices`,
  };

  private readonly store = inject(InvoiceStore);
  private readonly toaster = inject(ScToaster);
  private readonly statuses = INVOICE_STATUSES;
  private readonly query = signal('');
  private readonly status = signal<string>('All');
  private readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    const status = this.status();
    return this.store
      .invoices()
      .filter((i) => status === 'All' || i.status === status)
      .filter(
        (i) =>
          !q ||
          i.id.toLowerCase().includes(q) ||
          i.client.toLowerCase().includes(q),
      )
      .sort((a, b) => b.issued.localeCompare(a.issued));
  });
  private readonly totals = computed(() => {
    const sum = (status?: string) =>
      this.store
        .invoices()
        .filter((i) => !status || i.status === status)
        .reduce((total, i) => total + totalOf(i), 0);
    return [
      {
        label: $localize`:@@invoice.list.totalInvoiced:Total invoiced`,
        amount: sum(),
      },
      { label: $localize`:@@invoice.list.paid:Paid`, amount: sum('Paid') },
      {
        label: $localize`:@@invoice.list.pending:Pending`,
        amount: sum('Pending'),
      },
      {
        label: $localize`:@@invoice.list.overdue:Overdue`,
        amount: sum('Overdue'),
      },
    ];
  });
  private readonly total = totalOf;
  private readonly badgeOf = invoiceBadge;

  private remove(invoice: Invoice): void {
    this.store.remove(invoice.id);
    this.toaster.show({ title: `${invoice.id} deleted` });
  }
}
