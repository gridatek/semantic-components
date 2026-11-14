import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScCheckboxGroup,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Alerts to choose, and a Select all that is mixed when only some are. */
@Component({
  selector: 'app-preview-notification-settings',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScCheckboxGroup,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScLabel,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Notifications</h2>
        <p scCardDescription>Choose what you want to be notified about.</p>
      </div>
      <div scCardBody>
        <div
          scCheckboxGroup
          scFieldGroup
          aria-label="Notifications"
          [allValues]="allIds"
          [(value)]="checked"
        >
          <div scField orientation="horizontal">
            <input scCheckbox parent />
            <div scFieldContentWrapper>
              <label scLabel>Select all</label>
            </div>
          </div>
          @for (n of notifications; track n.id) {
            <div scField orientation="horizontal">
              <input scCheckbox [value]="n.id" />
              <div scFieldContentWrapper>
                <label scLabel>{{ n.label }}</label>
                <p scFieldDescription>{{ n.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">Save Preferences</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewNotificationSettings {
  protected readonly notifications = [
    {
      id: 'transactions',
      label: 'Transaction alerts',
      description: 'Deposits, withdrawals, and transfers.',
    },
    {
      id: 'security',
      label: 'Security alerts',
      description: 'Login attempts and account changes.',
    },
    {
      id: 'goals',
      label: 'Goal milestones',
      description: 'Updates at 25%, 50%, 75%, and 100%.',
    },
    {
      id: 'market',
      label: 'Market updates',
      description: 'Daily portfolio summary and price alerts.',
    },
  ];
  protected readonly allIds = this.notifications.map((n) => n.id);
  protected readonly checked = signal<string[]>(['transactions', 'security']);
}
