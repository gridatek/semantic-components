import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordionNext,
  ScAccordionNextContent,
  ScAccordionNextHeader,
  ScAccordionNextItem,
  ScAccordionNextPanel,
  ScAccordionNextTrigger,
  ScAccordionNextTriggerIcon,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a card. */
@Component({
  selector: 'app-card-accordion-next-demo',
  imports: [
    ScAccordionNext,
    ScAccordionNextItem,
    ScAccordionNextHeader,
    ScAccordionNextTrigger,
    ScAccordionNextTriggerIcon,
    ScAccordionNextPanel,
    ScAccordionNextContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
    SiChevronDownIcon,
  ],
  template: `
    <div scCard class="w-full max-w-sm">
      <div scCardHeader>
        <div scCardTitle>Subscription &amp; Billing</div>
        <p scCardDescription>
          Common questions about your account, plans, payments and
          cancellations.
        </p>
      </div>
      <div scCardContent>
        <div scAccordionNext [value]="['plans']">
          <div scAccordionNextItem value="plans">
            <h3 scAccordionNextHeader>
              <button scAccordionNextTrigger>
                What subscription plans do you offer?
                <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionNextPanel>
              <ng-template scAccordionNextContent>
                We offer three subscription tiers: Starter ($9/month),
                Professional ($29/month), and Enterprise ($99/month). Each plan
                includes increasing storage limits, API access, priority
                support, and team collaboration features.
              </ng-template>
            </div>
          </div>
          <div scAccordionNextItem value="billing">
            <h3 scAccordionNextHeader>
              <button scAccordionNextTrigger>
                How does billing work?
                <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionNextPanel>
              <ng-template scAccordionNextContent>
                Billing occurs automatically at the start of each billing cycle.
                We accept all major credit cards, PayPal, and ACH transfers for
                enterprise customers. You'll receive an invoice via email after
                each payment.
              </ng-template>
            </div>
          </div>
          <div scAccordionNextItem value="cancel">
            <h3 scAccordionNextHeader>
              <button scAccordionNextTrigger>
                How do I cancel my subscription?
                <svg siChevronDownIcon scAccordionNextTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionNextPanel>
              <ng-template scAccordionNextContent>
                You can cancel your subscription anytime from your account
                settings. There are no cancellation fees or penalties. Your
                access will continue until the end of your current billing
                period.
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardAccordionNextDemo {}
