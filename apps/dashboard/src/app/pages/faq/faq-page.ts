import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAccordion,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionPanelContent,
  ScAccordionTrigger,
  ScAccordionTriggerIcon,
  ScCard,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLink,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiMailIcon,
  SiMessageCircleIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

const TOPICS: readonly {
  title: string;
  questions: readonly { id: string; q: string; a: string }[];
}[] = [
  {
    title: $localize`:@@faq.gettingStarted:Getting started`,
    questions: [
      {
        id: 'install',
        q: $localize`:@@faq.howDoIInstallThe:How do I install the dashboard?`,
        a: $localize`:@@faq.cloneTheRepositoryInstallThe:Clone the repository, install the packages and run the dev server. Every screen is ready with sample data; swap the in-memory stores for your API when you are ready.`,
      },
      {
        id: 'style',
        q: $localize`:@@faq.canIChangeTheLook:Can I change the look?`,
        a: $localize`:@@faq.yesTheLookComesFrom:Yes. The look comes from the style and the theme: pick another style, or change the colour tokens, and every screen follows. The pages write layout classes only.`,
      },
      {
        id: 'dark',
        q: $localize`:@@faq.isThereADarkMode:Is there a dark mode?`,
        a: $localize`:@@faq.lightDarkAndSystemFrom:Light, dark and system, from the sun icon in the header. The choice is saved.`,
      },
    ],
  },
  {
    title: $localize`:@@faq.billing:Billing`,
    questions: [
      {
        id: 'plans',
        q: $localize`:@@faq.whichPlanShouldIPick:Which plan should I pick?`,
        a: $localize`:@@faq.starterFitsOnePersonPro:Starter fits one person. Pro adds the apps and priority support. Team adds seats, roles and permissions, and audit logs.`,
      },
      {
        id: 'refund',
        q: $localize`:@@faq.canIGetARefund:Can I get a refund?`,
        a: $localize`:@@faq.within30DaysOfA:Within 30 days of a purchase, for any reason. Write to support with your invoice number.`,
      },
      {
        id: 'invoice',
        q: $localize`:@@faq.whereAreMyInvoices:Where are my invoices?`,
        a: $localize`:@@faq.inAccountSettingsUnderBilling:In Account Settings, under Billing; each can be downloaded as a PDF.`,
      },
    ],
  },
  {
    title: $localize`:@@faq.accountsAndSecurity:Accounts and security`,
    questions: [
      {
        id: '2fa',
        q: $localize`:@@faq.howDoITurnOn:How do I turn on two-step sign-in?`,
        a: $localize`:@@faq.accountSettingsSecurityTwoStep:Account Settings → Security → Two-step verification. You will scan a code with an authenticator app.`,
      },
      {
        id: 'roles',
        q: $localize`:@@faq.canILimitWhatTeammates:Can I limit what teammates see?`,
        a: $localize`:@@faq.yesOnTheTeamPlan:Yes — on the Team plan, Roles & Permissions sets what each role can view, edit or delete.`,
      },
    ],
  },
];

/** FAQ (Pro): questions by topic, searchable, and where to ask more. */
@Component({
  selector: 'app-faq-page',
  imports: [
    RouterLink,
    ScAccordion,
    ScAccordionHeader,
    ScAccordionItem,
    ScAccordionPanel,
    ScAccordionPanelContent,
    ScAccordionTrigger,
    ScAccordionTriggerIcon,
    ScCard,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLink,
    SiChevronDownIcon,
    SiMailIcon,
    SiMessageCircleIcon,
    SiSearchIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="FAQ"
      [trail]="[{ label: t.pages }, { label: 'FAQ' }]"
    />

    <div class="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div class="flex flex-col items-center gap-3 py-4 text-center">
        <h2
          i18n="@@faq.frequentlyAskedQuestions"
          class="text-2xl font-semibold"
        >
          Frequently asked questions
        </h2>
        <p i18n="@@faq.canTFindAnAnswer" class="text-muted-foreground">
          Can’t find an answer? Write to us — we reply within a day.
        </p>
        <div scInputGroup class="w-full max-w-md">
          <input
            i18n-aria-label="@@faq.searchTheQuestions"
            i18n-placeholder="@@faq.searchTheQuestions"
            scInput
            type="search"
            placeholder="Search the questions"
            aria-label="Search the questions"
            [value]="query()"
            (input)="query.set($any($event.target).value)"
          />
          <div scInputGroupAddon><svg siSearchIcon></svg></div>
        </div>
      </div>

      @for (topic of topics(); track topic.title) {
        <section class="flex flex-col gap-2">
          <h2 class="text-lg font-semibold">{{ topic.title }}</h2>
          <div scAccordion>
            @for (item of topic.questions; track item.id) {
              <div scAccordionItem [value]="item.id">
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
        </section>
      } @empty {
        <p
          i18n="@@faq.noQuestionMatches"
          class="text-muted-foreground text-center"
        >
          No question matches “{{ query() }}”.
        </p>
      }

      <div class="grid gap-4 sm:grid-cols-2">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle class="flex items-center gap-2">
              <svg siMailIcon></svg>
              <ng-container i18n="@@faq.email">Email</ng-container>
            </h2>
            <p i18n="@@faq.supportDashboardExample" scCardDescription>
              support&#64;dashboard.example
            </p>
          </div>
        </div>
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle class="flex items-center gap-2">
              <svg siMessageCircleIcon></svg>
              <ng-container i18n="@@faq.chat">Chat</ng-container>
            </h2>
            <p i18n="@@faq.openAChatWeekdays9" scCardDescription>
              <a scLink routerLink="/apps/chats">Open a chat</a> — weekdays, 9
              to 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FaqPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    pages: $localize`:@@faq.pages:Pages`,
  };

  private readonly query = signal('');
  private readonly topics = computed(() => {
    const q = this.query().trim().toLowerCase();
    return TOPICS.map((topic) => ({
      ...topic,
      questions: topic.questions.filter(
        (item) =>
          !q ||
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q),
      ),
    })).filter((topic) => topic.questions.length);
  });
}
