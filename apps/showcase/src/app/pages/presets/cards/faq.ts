import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface ScFaqQuestion {
  q: string;
  a: string;
}

/** Questions by topic: tabs, each an accordion with its first one open. */
@Component({
  selector: 'app-preview-faq',
  imports: [
    ScAccordion,
    ScAccordionPanelContent,
    ScAccordionHeader,
    ScAccordionItem,
    ScAccordionPanel,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScTabs,
    ScTabsPanelContent,
    ScTabsList,
    ScTabsPanel,
    ScTabsTab,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard>
      <div scCardBody>
        <div scTabs value="general">
          <div scTabsList class="w-full">
            @for (topic of topics; track topic.value) {
              <button scTabsTab class="flex-1" [value]="topic.value">
                {{ topic.label }}
              </button>
            }
          </div>
          @for (topic of topics; track topic.value) {
            <div scTabsPanel [value]="topic.value">
              <ng-template scTabsPanelContent>
                <div scAccordion [value]="['0']">
                  @for (item of topic.questions; track $index) {
                    <div scAccordionItem [value]="'' + $index">
                      <h3 scAccordionHeader>
                        <button scAccordionTrigger>
                          {{ item.q }}
                          <svg siChevronDownIcon scAccordionTriggerIcon></svg>
                        </button>
                      </h3>
                      <div scAccordionPanel>
                        <ng-template scAccordionPanelContent>{{
                          item.a
                        }}</ng-template>
                      </div>
                    </div>
                  }
                </div>
              </ng-template>
            </div>
          }
        </div>
      </div>
      <div scCardFooter>
        <button scButton variant="outline" class="w-full">
          Contact Support
        </button>
        <button scButton variant="link" class="w-full">Learn More</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewFaq {
  protected readonly topics: {
    value: string;
    label: string;
    questions: ScFaqQuestion[];
  }[] = [
    {
      value: 'general',
      label: 'General',
      questions: [
        {
          q: 'How secure is my financial data with Ledger?',
          a: 'We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your credentials. All connections use read-only access tokens. We are a SEC registered investment advisor.',
        },
        {
          q: 'How do I connect my bank or investment accounts?',
          a: 'Go to Settings > Linked Accounts and search for your institution. We support over 12,000 banks and brokerages via Plaid and MX.',
        },
        {
          q: 'Can I export my data for tax purposes?',
          a: 'Yes. Navigate to Reports > Tax Export to download a CSV or PDF summary of your transactions, dividends, and capital gains for any tax year.',
        },
      ],
    },
    {
      value: 'billing',
      label: 'Billing',
      questions: [
        {
          q: 'What is the difference between Basic and Pro pricing tiers?',
          a: 'Basic includes budgeting, goal tracking, and up to 3 linked accounts. Pro adds unlimited accounts, dividend tracking, portfolio analysis, and priority support.',
        },
        {
          q: 'How do I cancel my subscription?',
          a: 'Go to Settings > Billing > Manage Plan and click Cancel. Your access continues until the end of your current billing period.',
        },
        {
          q: 'Do you offer a free trial?',
          a: 'Yes. All new accounts start with a 14-day Pro trial. No credit card required.',
        },
      ],
    },
    {
      value: 'goals',
      label: 'Goals',
      questions: [
        {
          q: 'How do I set up a custom financial goal?',
          a: "Click New Goal from the Savings Targets card. Choose a category, set a target amount and date, and we'll calculate the monthly contribution needed.",
        },
        {
          q: 'Can I track multiple goals at once?',
          a: 'Yes. Pro accounts can track unlimited goals. Basic accounts support up to 3 active goals.',
        },
        {
          q: 'How are monthly contributions calculated?',
          a: 'We divide the remaining amount by the number of months until your target date, adjusted for your current savings rate and any auto-transfer schedules.',
        },
      ],
    },
  ];
}
