import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAccordion,
  ScAccordionContent,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** In a card. */
@Component({
  selector: 'app-card-accordion-demo',
  imports: [
    ScAccordion,
    ScAccordionItem,
    ScAccordionHeader,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScAccordionPanel,
    ScAccordionContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardBody,
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
      <div scCardBody>
        <div scAccordion [value]="['plans']">
          <div scAccordionItem value="plans">
            <h3 scAccordionHeader>
              <button scAccordionTrigger>
                What subscription plans do you offer?
                <svg siChevronDownIcon scAccordionTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionPanel>
              <ng-template scAccordionContent>
                We offer three subscription tiers: Starter ($9/month),
                Professional ($29/month), and Enterprise ($99/month). Each plan
                includes increasing storage limits, API access, priority
                support, and team collaboration features.
              </ng-template>
            </div>
          </div>
          <div scAccordionItem value="billing">
            <h3 scAccordionHeader>
              <button scAccordionTrigger>
                How does billing work?
                <svg siChevronDownIcon scAccordionTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionPanel>
              <ng-template scAccordionContent>
                Billing occurs automatically at the start of each billing cycle.
                We accept all major credit cards, PayPal, and ACH transfers for
                enterprise customers. You'll receive an invoice via email after
                each payment.
              </ng-template>
            </div>
          </div>
          <div scAccordionItem value="cancel">
            <h3 scAccordionHeader>
              <button scAccordionTrigger>
                How do I cancel my subscription?
                <svg siChevronDownIcon scAccordionTriggerIcon></svg>
              </button>
            </h3>
            <div scAccordionPanel>
              <ng-template scAccordionContent>
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
export class CardAccordionDemo {}
