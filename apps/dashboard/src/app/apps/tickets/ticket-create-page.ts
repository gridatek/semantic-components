import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { AGENTS, TICKET_STATUSES, type TicketStatus } from '../../data/tickets';
import { PageHeader } from '../../layout/page-header';
import { today } from '../../shared/formats';
import { TicketsStore } from '../../shared/stores';

/** Create Ticket: what, for whom, its status; back to the list once created. */
@Component({
  selector: 'app-ticket-create-page',
  imports: [
    FormField,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@tickets.ticketCreate.createTicket"
      title="Create Ticket"
      [trail]="[
        { label: t.tickets, url: '/apps/tickets' },
        { label: t.create },
      ]"
    />

    <form class="max-w-2xl" (submit)="create($event)">
      <div scCard>
        <div scCardHeader>
          <h2
            i18n="@@tickets.ticketCreate.ticketDetails"
            scCardTitle
            id="ticket-title"
          >
            Ticket Details
          </h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <label i18n="@@tickets.ticketCreate.ticketTitle" scLabel
                >Ticket Title</label
              >
              <input scInput [formField]="ticketForm.title" />
            </div>
            <div scField>
              <label i18n="@@tickets.ticketCreate.ticketDescription" scLabel
                >Ticket Description</label
              >
              <textarea
                scTextarea
                rows="4"
                [formField]="ticketForm.description"
              ></textarea>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div scField>
                <label i18n="@@tickets.ticketCreate.assignTo" scLabel>
                  Assign To
                </label>
                <div scSelect [formField]="ticketForm.agent" [items]="agents">
                  <button scSelectTrigger class="w-full">
                    <span
                      i18n-placeholder="@@tickets.ticketCreate.chooseAnAgent"
                      scSelectValue
                      placeholder="Choose an agent"
                    ></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </button>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        <div scSelectGroup>
                          @for (item of agents; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scField>
                <label i18n="@@tickets.ticketCreate.status" scLabel>
                  Status
                </label>
                <div
                  scSelect
                  [formField]="ticketForm.status"
                  [items]="statuses"
                >
                  <button scSelectTrigger class="w-full">
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </button>
                  <ng-template scSelectPortal>
                    <div scSelectPopup>
                      <div scSelectList>
                        <div scSelectGroup>
                          @for (item of statuses; track item.value) {
                            <div scSelectItem [value]="item.value">
                              <span scSelectItemText>{{ item.label }}</span>
                              <span scSelectItemIndicator
                                ><svg siCheckIcon></svg
                              ></span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </ng-template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div scCardFooter class="justify-end gap-2">
          <a
            i18n="@@tickets.ticketCreate.cancel"
            scLink
            variant="outline"
            routerLink="/apps/tickets"
            >Cancel</a
          >
          <button
            i18n="@@tickets.ticketCreate.createTicket"
            scButton
            type="submit"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TicketCreatePage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    tickets: $localize`:@@tickets.ticketCreate.tickets:Tickets`,
    create: $localize`:@@tickets.ticketCreate.create:Create`,
  };

  private readonly store = inject(TicketsStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);

  private readonly agents = AGENTS.map((agent) => ({
    value: agent.name,
    label: agent.name,
  }));
  private readonly statuses = TICKET_STATUSES.map((status) => ({
    value: status,
    label: status,
  }));

  private readonly model = signal({
    title: '',
    description: '',
    agent: '',
    status: 'Open' as TicketStatus,
  });
  private readonly ticketForm = form(this.model, (path) => {
    required(path.title);
    required(path.description);
    required(path.agent);
  });

  private create(event: Event): void {
    event.preventDefault();
    if (this.ticketForm().invalid()) {
      this.toaster.show({
        variant: 'error',
        title: $localize`:@@tickets.ticketCreate.someFieldsAreMissing:Some fields are missing`,
        description: $localize`:@@tickets.ticketCreate.aTicketNeedsATitle:A ticket needs a title, a description and an agent.`,
      });
      return;
    }
    const value = this.model();
    const agent = AGENTS.find((item) => item.name === value.agent) ?? AGENTS[0];
    const ticket = this.store.add({
      title: value.title,
      description: value.description,
      status: value.status,
      agent: agent.name,
      avatar: agent.avatar,
      date: today(),
    });
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@tickets.ticketCreate.ticketCreated:Ticket ${ticket.id} created`,
    });
    void this.router.navigateByUrl('/apps/tickets');
  }
}
