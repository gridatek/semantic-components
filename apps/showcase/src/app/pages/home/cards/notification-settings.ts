import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldBody,
  ScFieldDescription,
  ScFieldGroup,
  ScLabel,
} from '@semantic-components/ui';

/** Checkboxes, each with its description. */
@Component({
  selector: 'app-home-notification-settings',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldBody,
    ScFieldDescription,
    ScFieldGroup,
    ScLabel,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Notifications</h2>
        <p scCardDescription>
          Choose which email and push alerts you want to receive.
        </p>
      </div>
      <div scCardContent>
        <div scFieldGroup>
          @for (n of notifications; track n.id) {
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="settings[n.id]" />
              <div scFieldBody>
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
export class HomeNotificationSettings {
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
  ] as const;
  protected readonly settings = form(
    signal({ transactions: true, security: true, goals: false, market: false }),
  );
}
