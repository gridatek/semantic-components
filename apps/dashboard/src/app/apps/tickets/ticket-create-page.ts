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
  ScSelectLabel,
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
import { today } from '../../shared/format';
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
    ScSelectLabel,
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
      i18n-title
      title="Create Ticket"
      [trail]="[
        { label: t.tickets, url: '/apps/tickets' },
        { label: t.create },
      ]"
    />

    <form class="max-w-2xl" (submit)="create($event)">
      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle id="ticket-title">Ticket Details</h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <label i18n scLabel>Ticket Title</label>
              <input scInput [formField]="ticketForm.title" />
            </div>
            <div scField>
              <label i18n scLabel>Ticket Description</label>
              <textarea
                scTextarea
                rows="4"
                [formField]="ticketForm.description"
              ></textarea>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div scField>
                <div scSelect [formField]="ticketForm.agent" [items]="agents">
                  <div i18n scSelectLabel>Assign To</div>
                  <div scSelectTrigger class="w-full">
                    <span
                      i18n-placeholder
                      scSelectValue
                      placeholder="Choose an agent"
                    ></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
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
                <div
                  scSelect
                  [formField]="ticketForm.status"
                  [items]="statuses"
                >
                  <div i18n scSelectLabel>Status</div>
                  <div scSelectTrigger class="w-full">
                    <span scSelectValue></span>
                    <svg scSelectIcon siChevronDownIcon></svg>
                  </div>
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
          <a i18n scLink variant="outline" routerLink="/apps/tickets">Cancel</a>
          <button i18n scButton type="submit">Create Ticket</button>
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
    tickets: $localize`Tickets`,
    create: $localize`Create`,
  };

  private readonly store = inject(TicketsStore);
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);

  protected readonly agents = AGENTS.map((agent) => ({
    value: agent.name,
    label: agent.name,
  }));
  protected readonly statuses = TICKET_STATUSES.map((status) => ({
    value: status,
    label: status,
  }));

  private readonly model = signal({
    title: '',
    description: '',
    agent: '',
    status: 'Open' as TicketStatus,
  });
  protected readonly ticketForm = form(this.model, (path) => {
    required(path.title);
    required(path.description);
    required(path.agent);
  });

  protected create(event: Event): void {
    event.preventDefault();
    if (this.ticketForm().invalid()) {
      this.toaster.show({
        variant: 'error',
        title: $localize`Some fields are missing`,
        description: $localize`A ticket needs a title, a description and an agent.`,
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
      title: $localize`Ticket ${ticket.id} created`,
    });
    void this.router.navigateByUrl('/apps/tickets');
  }
}
