import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScItem,
  ScLink,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiPlusIcon,
  SiSearchIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { TICKET_STATUSES, type TicketStatus } from '../../data/tickets';
import { PageHeader } from '../../layout/page-header';
import { day } from '../../shared/format';
import { label } from '../../shared/labels';
import { TicketsStore } from '../../shared/stores';

type Filter = 'All' | TicketStatus;

/** Tickets: counts by status (they filter), a search, the list (shadcndashboard's Tickets app). */
@Component({
  selector: 'app-tickets-page',
  imports: [
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScItem,
    ScLink,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiPlusIcon,
    SiSearchIcon,
    SiTrash2Icon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Tickets"
      [trail]="[{ label: t.tickets }]"
    >
      <a scLink variant="button" routerLink="/apps/tickets/create">
        <svg siPlusIcon></svg>
        <ng-container i18n>Create Ticket</ng-container>
      </a>
    </app-page-header>

    <ul
      i18n-aria-label
      class="grid grid-cols-2 gap-4 lg:grid-cols-4"
      aria-label="Filter by status"
    >
      @for (filter of filters(); track filter.value) {
        <li>
          <button
            scItem
            variant="outline"
            class="bg-card w-full flex-col items-start gap-1"
            [attr.aria-pressed]="active() === filter.value"
            [class.border-primary]="active() === filter.value"
            (click)="active.set(filter.value)"
          >
            <span class="text-2xl font-semibold tabular-nums">{{
              filter.count
            }}</span>
            <span class="text-muted-foreground text-sm">{{
              filter.label
            }}</span>
          </button>
        </li>
      }
    </ul>

    <div scCard>
      <div scCardBody class="flex flex-col gap-4">
        <div scInputGroup class="max-w-sm">
          <input
            i18n-aria-label
            i18n-placeholder
            scInput
            type="search"
            placeholder="Search tickets"
            aria-label="Search tickets"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
          <div scInputGroupAddon><svg siSearchIcon></svg></div>
        </div>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th i18n scTableHeaderCell>Id</th>
                <th i18n scTableHeaderCell>Ticket</th>
                <th i18n scTableHeaderCell>Assigned To</th>
                <th i18n scTableHeaderCell>Status</th>
                <th i18n scTableHeaderCell>Date</th>
                <th i18n scTableHeaderCell class="text-end">Action</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (ticket of shown(); track ticket.id) {
                <tr scTableRow>
                  <td scTableCell>{{ ticket.id }}</td>
                  <td scTableCell class="max-w-md">
                    <div class="flex flex-col gap-0.5">
                      <span class="font-medium">{{ ticket.title }}</span>
                      <span
                        class="text-muted-foreground line-clamp-1 text-xs whitespace-normal"
                      >
                        {{ ticket.description }}
                      </span>
                    </div>
                  </td>
                  <td scTableCell>
                    <div class="flex items-center gap-2">
                      <span scAvatar class="size-7">
                        <img scAvatarImage [src]="ticket.avatar" alt="" />
                        <span scAvatarFallback>{{ ticket.agent[0] }}</span>
                      </span>
                      {{ ticket.agent }}
                    </div>
                  </td>
                  <td scTableCell>
                    <span
                      scBadge
                      [variant]="
                        ticket.status === 'Open'
                          ? 'default'
                          : ticket.status === 'Pending'
                            ? 'secondary'
                            : 'outline'
                      "
                      >{{ labelOf(ticket.status) }}</span
                    >
                  </td>
                  <td scTableCell>{{ dayOf(ticket.date) }}</td>
                  <td scTableCell class="text-end">
                    <button
                      scButton
                      variant="ghost"
                      size="icon-sm"
                      (click)="remove(ticket.id)"
                    >
                      <svg siTrash2Icon></svg>
                      <span i18n class="sr-only"
                        >Delete ticket {{ ticket.id }}</span
                      >
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow>
                  <td
                    i18n
                    scTableCell
                    colspan="6"
                    class="text-muted-foreground h-24 text-center"
                  >
                    No tickets.
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
export class TicketsPage {
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    tickets: $localize`Tickets`,
  };

  private readonly store = inject(TicketsStore);
  private readonly toaster = inject(ScToaster);

  private readonly active = signal<Filter>('All');
  private readonly query = signal('');

  private readonly filters = computed(() => {
    const tickets = this.store.tickets();
    return [
      {
        value: 'All' as Filter,
        label: $localize`Total Tickets`,
        count: tickets.length,
      },
      ...TICKET_STATUSES.map((status) => ({
        value: status as Filter,
        label: $localize`${status} Tickets`,
        count: tickets.filter((ticket) => ticket.status === status).length,
      })),
    ];
  });

  private readonly shown = computed(() => {
    const query = this.query().trim().toLowerCase();
    const active = this.active();
    return this.store
      .tickets()
      .filter((ticket) => active === 'All' || ticket.status === active)
      .filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.agent.toLowerCase().includes(query),
      );
  });

  private readonly dayOf = day;

  private remove(id: number): void {
    this.store.remove(id);
    this.toaster.show({
      variant: 'success',
      title: $localize`Ticket ${id} deleted`,
    });
  }
}
