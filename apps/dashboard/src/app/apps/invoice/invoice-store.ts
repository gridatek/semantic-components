import { Service, signal } from '@angular/core';

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface InvoiceLine {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  readonly id: string;
  readonly client: string;
  readonly email: string;
  readonly address: string;
  readonly issued: string;
  readonly due: string;
  readonly status: InvoiceStatus;
  readonly taxRate: number;
  readonly notes: string;
  readonly lines: readonly InvoiceLine[];
}

export const INVOICE_STATUSES: readonly InvoiceStatus[] = [
  'Paid',
  'Pending',
  'Overdue',
  'Draft',
];

export function subtotalOf(invoice: Pick<Invoice, 'lines'>): number {
  return invoice.lines.reduce((sum, l) => sum + l.quantity * l.price, 0);
}

export function totalOf(invoice: Pick<Invoice, 'lines' | 'taxRate'>): number {
  return subtotalOf(invoice) * (1 + invoice.taxRate / 100);
}

const INVOICES: readonly Invoice[] = [
  {
    id: 'INV-1042',
    client: 'Northwind',
    email: 'billing@northwind.io',
    address: '410 Pine Street, Seattle, WA 98101',
    issued: '2026-04-02',
    due: '2026-05-02',
    status: 'Pending',
    taxRate: 10,
    notes:
      'Thank you for your business. Payment by bank transfer within 30 days.',
    lines: [
      { description: 'Dashboard design, 3 screens', quantity: 3, price: 1200 },
      { description: 'Component library setup', quantity: 1, price: 2400 },
      { description: 'Support, hours', quantity: 12, price: 90 },
    ],
  },
  {
    id: 'INV-1041',
    client: 'Vandelay',
    email: 'accounts@vandelay.ca',
    address: '88 Water Street, Vancouver, BC V6B 1A4',
    issued: '2026-03-28',
    due: '2026-04-27',
    status: 'Paid',
    taxRate: 5,
    notes: 'Paid in full — thank you.',
    lines: [
      { description: 'Team plan, annual', quantity: 1, price: 2880 },
      { description: 'Extra seats', quantity: 10, price: 96 },
    ],
  },
  {
    id: 'INV-1040',
    client: 'Globex',
    email: 'finance@globex.es',
    address: 'Calle de Alcalá 42, 28014 Madrid',
    issued: '2026-03-10',
    due: '2026-04-09',
    status: 'Overdue',
    taxRate: 21,
    notes: 'Second reminder sent on April 15.',
    lines: [
      { description: 'Marketing site redesign', quantity: 1, price: 6400 },
      { description: 'Copywriting, pages', quantity: 8, price: 150 },
    ],
  },
  {
    id: 'INV-1039',
    client: 'Initech',
    email: 'ap@initech.kr',
    address: '23 Teheran-ro, Gangnam-gu, Seoul',
    issued: '2026-03-01',
    due: '2026-03-31',
    status: 'Paid',
    taxRate: 10,
    notes: '',
    lines: [
      { description: 'Data dashboard, monthly', quantity: 3, price: 750 },
    ],
  },
  {
    id: 'INV-1038',
    client: 'Umbrella',
    email: 'billing@umbrella.it',
    address: 'Via del Corso 120, 00186 Roma',
    issued: '2026-02-20',
    due: '2026-03-22',
    status: 'Paid',
    taxRate: 22,
    notes: '',
    lines: [
      { description: 'User research, interviews', quantity: 10, price: 220 },
      { description: 'Research report', quantity: 1, price: 1800 },
    ],
  },
  {
    id: 'INV-1043',
    client: 'Stark',
    email: 'rechnung@stark.de',
    address: 'Friedrichstraße 68, 10117 Berlin',
    issued: '2026-04-27',
    due: '2026-05-27',
    status: 'Draft',
    taxRate: 19,
    notes: '',
    lines: [{ description: 'DevOps audit', quantity: 1, price: 3200 }],
  },
];

/** The invoices, in memory: what list, details, create and edit share. */
@Service()
export class InvoiceStore {
  private readonly items = signal<readonly Invoice[]>(INVOICES);
  readonly invoices = this.items.asReadonly();

  byId(id: string): Invoice | undefined {
    return this.items().find((invoice) => invoice.id === id);
  }

  /** The next number: one more than the highest. */
  nextId(): string {
    const top = Math.max(...this.items().map((i) => +i.id.slice(4)));
    return `INV-${top + 1}`;
  }

  save(invoice: Invoice): void {
    this.items.update((items) =>
      items.some((i) => i.id === invoice.id)
        ? items.map((i) => (i.id === invoice.id ? invoice : i))
        : [invoice, ...items],
    );
  }

  setStatus(id: string, status: InvoiceStatus): void {
    this.items.update((items) =>
      items.map((i) => (i.id === id ? { ...i, status } : i)),
    );
  }

  remove(id: string): void {
    this.items.update((items) => items.filter((i) => i.id !== id));
  }
}

export function invoiceBadge(
  status: InvoiceStatus,
): 'default' | 'secondary' | 'outline' | 'destructive' {
  return status === 'Paid'
    ? 'secondary'
    : status === 'Overdue'
      ? 'destructive'
      : status === 'Draft'
        ? 'outline'
        : 'default';
}
