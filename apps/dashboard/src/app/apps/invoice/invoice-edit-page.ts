import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import {
  FormField,
  applyEach,
  email,
  form,
  min,
  required,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScSeparator,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiPlusIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';
import { count, money } from '../../shared/format';
import { label } from '../../shared/labels';
import {
  INVOICE_STATUSES,
  type Invoice,
  type InvoiceLine,
  type InvoiceStatus,
  InvoiceStore,
  subtotalOf,
  totalOf,
} from './invoice-store';

interface Draft {
  client: string;
  email: string;
  address: string;
  issued: string;
  due: string;
  status: InvoiceStatus;
  taxRate: number;
  notes: string;
  lines: InvoiceLine[];
}

/** Invoice create and edit (Pro): one form, its lines added and removed. */
@Component({
  selector: 'app-invoice-edit-page',
  imports: [
    FormField,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScSeparator,
    ScTextarea,
    SiChevronDownIcon,
    SiPlusIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      [title]="id() ? t.edit + id() : t.newInvoice"
      [trail]="[
        { label: t.apps },
        { label: t.invoices, url: '/apps/invoice/list' },
        { label: id() ? t.edit2 : t.create },
      ]"
    />

    <form class="flex flex-col gap-4" (submit)="save($event)">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@invoice.edit.client" scCardTitle>Client</h2>
        </div>
        <div scCardBody>
          <div scFieldGroup class="grid gap-4 md:grid-cols-2">
            <div scField>
              <label i18n="@@invoice.edit.client" scLabel>Client</label>
              <input scInput [formField]="invoiceForm.client" />
            </div>
            <div scField>
              <label i18n="@@invoice.edit.email" scLabel>Email</label>
              <input scInput type="email" [formField]="invoiceForm.email" />
            </div>
            <div scField class="md:col-span-2">
              <label i18n="@@invoice.edit.address" scLabel>Address</label>
              <input scInput [formField]="invoiceForm.address" />
            </div>
            <div scField>
              <label i18n="@@invoice.edit.issued" scLabel>Issued</label>
              <input scInput type="date" [formField]="invoiceForm.issued" />
            </div>
            <div scField>
              <label i18n="@@invoice.edit.due" scLabel>Due</label>
              <input scInput type="date" [formField]="invoiceForm.due" />
            </div>
            <div scField>
              <label i18n="@@invoice.edit.status" scLabel>Status</label>
              <div scNativeSelectContainer class="w-full">
                <select scNativeSelect [formField]="invoiceForm.status">
                  @for (status of statuses; track status) {
                    <option scNativeSelectOption [value]="status">
                      {{ labelOf(status) }}
                    </option>
                  }
                </select>
                <svg siChevronDownIcon scNativeSelectIcon></svg>
              </div>
            </div>
            <div scField>
              <label i18n="@@invoice.edit.taxRate" scLabel>Tax rate (%)</label>
              <input scInput type="number" [formField]="invoiceForm.taxRate" />
            </div>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@invoice.edit.items" scCardTitle>Items</h2>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          @for (line of invoiceForm.lines; track $index; let i = $index) {
            <fieldset
              class="grid items-end gap-3 sm:grid-cols-[1fr_6rem_8rem_8rem_auto]"
            >
              <legend i18n="@@invoice.edit.item" class="sr-only">
                Item {{ countOf(i + 1) }}
              </legend>
              <div scField>
                <label i18n="@@invoice.edit.description" scLabel
                  >Description</label
                >
                <input scInput [formField]="line.description" />
              </div>
              <div scField>
                <label i18n="@@invoice.edit.qty" scLabel>Qty</label>
                <input scInput type="number" [formField]="line.quantity" />
              </div>
              <div scField>
                <label i18n="@@invoice.edit.price" scLabel>Price</label>
                <input scInput type="number" [formField]="line.price" />
              </div>
              <div
                class="flex h-9 items-center justify-end text-sm tabular-nums"
              >
                {{
                  moneyOf(draft().lines[i].quantity * draft().lines[i].price)
                }}
              </div>
              <button
                scButton
                type="button"
                variant="ghost"
                size="icon"
                [disabled]="draft().lines.length === 1"
                (click)="removeLine(i)"
              >
                <svg siTrash2Icon></svg>
                <span i18n="@@invoice.edit.removeItem" class="sr-only"
                  >Remove item {{ countOf(i + 1) }}</span
                >
              </button>
            </fieldset>
          }
          <button
            scButton
            type="button"
            variant="outline"
            class="self-start"
            (click)="addLine()"
          >
            <svg siPlusIcon></svg>
            <ng-container i18n="@@invoice.edit.addItem">Add item</ng-container>
          </button>
          <div scSeparator></div>
          <dl class="ms-auto grid w-full max-w-xs grid-cols-2 gap-y-1 text-sm">
            <dt i18n="@@invoice.edit.subtotal" class="text-muted-foreground">
              Subtotal
            </dt>
            <dd class="text-end tabular-nums">{{ moneyOf(subtotal()) }}</dd>
            <dt i18n="@@invoice.edit.tax" class="text-muted-foreground">Tax</dt>
            <dd class="text-end tabular-nums">
              {{ moneyOf(total() - subtotal()) }}
            </dd>
            <dt i18n="@@invoice.edit.total" class="font-semibold">Total</dt>
            <dd class="text-end font-semibold tabular-nums">
              {{ moneyOf(total()) }}
            </dd>
          </dl>
        </div>
      </div>

      <div scCard>
        <div scCardBody>
          <div scField>
            <label i18n="@@invoice.edit.notes" scLabel>Notes</label>
            <textarea
              scTextarea
              rows="3"
              [formField]="invoiceForm.notes"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <a
          i18n="@@invoice.edit.cancel"
          scLink
          variant="outline"
          routerLink="/apps/invoice/list"
          >Cancel</a
        >
        <button i18n="@@invoice.edit.saveInvoice" scButton type="submit">
          Save Invoice
        </button>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceEditPage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    edit: $localize`:@@invoice.edit.edit:Edit `,
    newInvoice: $localize`:@@invoice.edit.newInvoice:New Invoice`,
    apps: $localize`:@@invoice.edit.apps:Apps`,
    invoices: $localize`:@@invoice.edit.invoices:Invoices`,
    edit2: $localize`:@@invoice.edit.edit:Edit`,
    create: $localize`:@@invoice.edit.create:Create`,
  };

  /** The route's `:id` when editing; none when creating. */
  readonly id = input<string>();

  private readonly store = inject(InvoiceStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);
  private readonly statuses = INVOICE_STATUSES;

  private readonly draft = linkedSignal<Draft>(() => {
    const id = this.id();
    const invoice = id ? this.store.byId(id) : undefined;
    if (invoice) {
      const { lines, ...rest } = invoice;
      return { ...rest, lines: lines.map((l) => ({ ...l })) };
    }
    const today = Temporal.Now.plainDateISO();
    return {
      client: '',
      email: '',
      address: '',
      issued: today.toString(),
      due: today.add({ days: 30 }).toString(),
      status: 'Draft',
      taxRate: 10,
      notes: '',
      lines: [{ description: '', quantity: 1, price: 0 }],
    };
  });
  private readonly invoiceForm = form(this.draft, (path) => {
    required(path.client);
    required(path.email);
    email(path.email);
    required(path.issued);
    required(path.due);
    min(path.taxRate, 0);
    applyEach(path.lines, (line) => {
      required(line.description);
      min(line.quantity, 1);
      min(line.price, 0);
    });
  });
  private readonly subtotal = computed(() => subtotalOf(this.draft()));
  private readonly total = computed(() => totalOf(this.draft()));
  private readonly moneyOf = money;

  private addLine(): void {
    this.draft.update((d) => ({
      ...d,
      lines: [...d.lines, { description: '', quantity: 1, price: 0 }],
    }));
  }

  private removeLine(index: number): void {
    this.draft.update((d) => ({
      ...d,
      lines: d.lines.filter((_, i) => i !== index),
    }));
  }

  private save(event: Event): void {
    event.preventDefault();
    if (this.invoiceForm().invalid()) return;
    const id = this.id() ?? this.store.nextId();
    const invoice: Invoice = { ...this.draft(), id };
    this.store.save(invoice);
    this.toaster.show({ variant: 'success', title: `${id} saved` });
    void this.router.navigate(['/apps/invoice/detail', id]);
  }
}
