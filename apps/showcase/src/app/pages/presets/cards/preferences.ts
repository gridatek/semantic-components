import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldSeparator,
  ScLabel,
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
  ScSwitch,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** Account settings: a currency, two switches, reset and save. */
@Component({
  selector: 'app-preview-preferences',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldSeparator,
    ScLabel,
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
    ScSwitch,
    SiCheckIcon,
    SiChevronDownIcon,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Preferences</h2>
        <p scCardDescription>Manage your account settings and notifications.</p>
        <div scCardAction>
          <button scButton variant="ghost" size="icon-sm" class="bg-muted">
            <svg siXIcon></svg>
            <span class="sr-only">Dismiss preferences</span>
          </button>
        </div>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <div
              scSelect
              class="w-full"
              [items]="currencies"
              [formField]="prefs.currency"
            >
              <label scSelectLabel>Default Currency</label>
              <div scSelectTrigger class="w-full">
                <span scSelectValue></span>
                <svg scSelectIcon siChevronDownIcon></svg>
              </div>
              <ng-template scSelectPortal>
                <div scSelectPopup>
                  <div scSelectList>
                    <div scSelectGroup>
                      @for (item of currencies; track item.value) {
                        <div scSelectItem [value]="item.value">
                          <span scSelectItemText>{{ item.label }}</span>
                          <span scSelectItemIndicator>
                            <svg siCheckIcon></svg>
                          </span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
          <div scFieldSeparator class="-my-4"></div>
          <div scField orientation="horizontal">
            <div scFieldContentWrapper>
              <label scLabel>Public Statistics</label>
              <p scFieldDescription>
                Allow others to see your total stream count and listening
                activity
              </p>
            </div>
            <input scSwitch [formField]="prefs.statistics" />
          </div>
          <div scFieldSeparator class="-my-4"></div>
          <div scField orientation="horizontal">
            <div scFieldContentWrapper>
              <label scLabel>Email Notifications</label>
              <p scFieldDescription>
                Monthly royalty reports and distribution updates
              </p>
            </div>
            <input scSwitch [formField]="prefs.email" />
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton variant="outline">Reset</button>
        <button scButton class="ms-auto">Save Preferences</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewPreferences {
  protected readonly currencies = [
    { label: 'USD — United States Dollar', value: 'usd' },
    { label: 'EUR — Euro', value: 'eur' },
    { label: 'GBP — British Pound', value: 'gbp' },
    { label: 'JPY — Japanese Yen', value: 'jpy' },
  ];
  protected readonly prefs = form(
    signal({ currency: 'usd', statistics: true, email: true }),
  );
}
