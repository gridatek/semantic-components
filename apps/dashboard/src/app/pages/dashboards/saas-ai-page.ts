import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScLink,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTextarea,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';
import {
  SiArrowUpIcon,
  SiBotIcon,
  SiCreditCardIcon,
  SiSparklesIcon,
  SiTrendingDownIcon,
  SiTrendingUpIcon,
  SiUserMinusIcon,
} from '@semantic-icons/lucide-icons';
import {
  AppStatCard,
  AppStatCardChange,
  AppStatCardDescription,
  AppStatCardIcon,
  AppStatCardLabel,
  AppStatCardValue,
} from '../../components/stat-card';
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { ChartTooltip } from '../../shared/chart-parts';
import { initials, injectFormats } from '../../shared/formats';
import { label } from '../../shared/labels';

const MRR = [
  { month: 'Nov', mrr: 38200 },
  { month: 'Dec', mrr: 41500 },
  { month: 'Jan', mrr: 44900 },
  { month: 'Feb', mrr: 47300 },
  { month: 'Mar', mrr: 52800 },
  { month: 'Apr', mrr: 58400 },
];

const PLANS = [
  { plan: 'Free', accounts: 4210 },
  { plan: 'Starter', accounts: 1830 },
  { plan: 'Pro', accounts: 920 },
  { plan: 'Team', accounts: 310 },
  { plan: 'Enterprise', accounts: 42 },
];

const MODELS = [
  {
    name: $localize`:@@dashboards.saasAi.chatAssistant:Chat assistant`,
    tokens: 18.4,
    quota: 25,
  },
  {
    name: $localize`:@@dashboards.saasAi.summaries:Summaries`,
    tokens: 9.1,
    quota: 15,
  },
  {
    name: $localize`:@@dashboards.saasAi.imageGeneration:Image generation`,
    tokens: 4.7,
    quota: 10,
  },
  {
    name: $localize`:@@dashboards.saasAi.embeddings:Embeddings`,
    tokens: 2.2,
    quota: 5,
  },
];

const SIGNUPS = [
  { personId: 2, plan: 'Team', mrr: 240, date: '2026-04-28' },
  { personId: 6, plan: 'Pro', mrr: 49, date: '2026-04-27' },
  { personId: 8, plan: 'Enterprise', mrr: 1200, date: '2026-04-25' },
  { personId: 4, plan: 'Starter', mrr: 19, date: '2026-04-24' },
  { personId: 10, plan: 'Pro', mrr: 49, date: '2026-04-22' },
];

/** SaaS + AI (Pro): recurring revenue, plans, AI usage, new accounts. */
@Component({
  selector: 'app-saas-ai-page',
  imports: [
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScTextarea,
    ScLink,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
    AppStatCard,
    AppStatCardChange,
    AppStatCardDescription,
    AppStatCardIcon,
    AppStatCardLabel,
    AppStatCardValue,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScChart,
    ScChartArea,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartPlot,
    ScChartValueAxis,
    SiArrowUpIcon,
    SiBotIcon,
    SiCreditCardIcon,
    SiSparklesIcon,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
    SiUserMinusIcon,
    PageHeader,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@dashboards.saasAi.saasAi"
      title="SaaS + AI"
      [trail]="[{ label: t.dashboards }, { label: t.saasAi }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.saasAi.monthlyRevenue"
            >Monthly revenue</ng-container
          >
          <svg siCreditCardIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="58400"
          [format]="{
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }"
        ></dd>
        <dd
          appStatCardChange
          [value]="0.106"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.saasAi.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.saasAi.payingAccounts"
            >Paying accounts</ng-container
          >
          <svg siSparklesIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="3102"></dd>
        <dd
          appStatCardChange
          [value]="0.058"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.saasAi.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.saasAi.churn">Churn</ng-container>
          <svg siUserMinusIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="0.021"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          appStatCardChange
          good="down"
          [value]="-0.003"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n="@@dashboards.saasAi.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.saasAi.aiRequests"
            >AI requests</ng-container
          >
          <svg siBotIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="1284000"
          [format]="{ notation: 'compact', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          appStatCardChange
          [value]="0.342"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.saasAi.fromLastMonth" appStatCardDescription>
          from last month
        </dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.saasAi.monthlyRecurringRevenue" scCardTitle>
            Monthly recurring revenue
          </h2>
          <p i18n="@@dashboards.saasAi.theLastSixMonths" scCardDescription>
            The last six months
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="mrrConfig" [data]="mrr" class="h-72 w-full">
            <svg
              i18n-aria-label="@@dashboards.saasAi.mrrByMonth"
              scChartPlot
              categoryKey="month"
              aria-label="MRR by month"
            >
              <g scChartGrid />
              <g scChartCategoryAxis />
              <g scChartValueAxis [tickFormatter]="shortMoney" />
              <g scChartCursor />
              <g scChartArea key="mrr" curve="monotone" />
            </svg>
            <app-chart-tooltip [format]="f.money" />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.saasAi.accountsByPlan" scCardTitle>
            Accounts by plan
          </h2>
          <p i18n="@@dashboards.saasAi.accounts2" scCardDescription>
            {{ totalAccounts() }} accounts
          </p>
        </div>
        <div scCardBody>
          <div scChart [config]="planConfig" [data]="plans" class="h-72 w-full">
            <svg
              i18n-aria-label="@@dashboards.saasAi.accountsByPlan"
              scChartPlot
              categoryKey="plan"
              layout="vertical"
              aria-label="Accounts by plan"
            >
              <g scChartCategoryAxis />
              <g scChartBar key="accounts" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.saasAi.aiUsage" scCardTitle>AI usage</h2>
          <p
            i18n="@@dashboards.saasAi.millionTokensThisMonthOf"
            scCardDescription
          >
            Million tokens this month, of the quota
          </p>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          @for (model of models; track model.name) {
            <div scProgress [value]="model.tokens" [max]="model.quota">
              <span scProgressLabel>{{ model.name }}</span>
              <span i18n="@@dashboards.saasAi.mM" scProgressValueText
                >{{ f.compact(model.tokens * 1e6) }} /
                {{ f.compact(model.quota * 1e6) }}</span
              >
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
          }
        </div>
      </div>

      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.saasAi.newAccounts" scCardTitle>
            New accounts
          </h2>
          <div i18n="@@dashboards.saasAi.viewAll" scCardAction>
            <a scLink routerLink="/apps/customers" class="text-sm">View all</a>
          </div>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n="@@dashboards.saasAi.account" scTableHeaderCell>
                    Account
                  </th>
                  <th i18n="@@dashboards.saasAi.plan" scTableHeaderCell>
                    Plan
                  </th>
                  <th scTableHeaderCell class="text-end">MRR</th>
                  <th i18n="@@dashboards.saasAi.joined" scTableHeaderCell>
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (signup of signups; track signup.person.id) {
                  <tr scTableRow>
                    <td scTableCell>
                      <div class="flex items-center gap-2">
                        <span scAvatar class="size-7">
                          <img
                            scAvatarImage
                            [src]="signup.person.avatar"
                            alt=""
                          />
                          <span scAvatarFallback>{{
                            initialsOf(signup.person.name)
                          }}</span>
                        </span>
                        <span class="flex flex-col">
                          <span class="font-medium">{{
                            signup.person.company
                          }}</span>
                          <span class="text-muted-foreground text-xs">{{
                            signup.person.email
                          }}</span>
                        </span>
                      </div>
                    </td>
                    <td scTableCell>
                      <span scBadge variant="secondary">{{
                        labelOf(signup.plan)
                      }}</span>
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ f.money(signup.mrr) }}
                    </td>
                    <td scTableCell>{{ f.day(signup.date) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle class="flex items-center gap-2">
          <svg siSparklesIcon></svg>
          <ng-container i18n="@@dashboards.saasAi.askTheAssistant"
            >Ask the assistant</ng-container
          >
        </h2>
        <p i18n="@@dashboards.saasAi.aboutYourNumbersInPlain" scCardDescription>
          About your numbers, in plain words
        </p>
      </div>
      <div scCardBody>
        <form (submit)="ask($event)">
          <div scInputGroup>
            <textarea
              i18n-placeholder="@@dashboards.saasAi.whyDidChurnGoDown"
              i18n-aria-label="@@dashboards.saasAi.yourQuestion"
              scTextarea
              rows="2"
              aria-label="Your question"
              placeholder="Why did churn go down in April?"
              [value]="question()"
              (input)="question.set($any($event.target).value)"
            ></textarea>
            <div scInputGroupAddon side="bottom">
              <button
                scInputGroupButton
                type="submit"
                variant="default"
                size="icon-xs"
                class="ms-auto"
              >
                <svg siArrowUpIcon></svg>
                <span i18n="@@dashboards.saasAi.ask" class="sr-only">Ask</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SaasAiPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** In the user's numbering system. */

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`:@@dashboards.saasAi.dashboards:Dashboards`,
    saasAi: $localize`:@@dashboards.saasAi.saasAi:SaaS + AI`,
  };

  private readonly router = inject(Router);
  private readonly question = signal('');
  private readonly mrr = MRR.map((row) => ({
    ...row,
    month: this.f.axisLabel(row.month),
  }));
  private readonly plans = PLANS.map((row) => ({
    ...row,
    plan: label(row.plan),
  }));
  private readonly totalAccounts = computed(() =>
    this.f.compact(PLANS.reduce((sum, row) => sum + row.accounts, 0)),
  );
  private readonly models = MODELS;
  private readonly signups = SIGNUPS.map((signup) => ({
    ...signup,
    person: PEOPLE.find((p) => p.id === signup.personId) ?? PEOPLE[0],
  }));
  private readonly mrrConfig: ScChartConfig = {
    mrr: { label: 'MRR', color: 'var(--chart-3)' },
  };
  private readonly planConfig: ScChartConfig = {
    accounts: {
      label: $localize`:@@dashboards.saasAi.accounts:Accounts`,
      color: 'var(--chart-3)',
    },
  };
  private readonly initialsOf = initials;
  private readonly shortMoney = (value: number) => this.f.compactMoney(value);

  /** Takes the question to the AI chat. */
  private ask(event: Event): void {
    event.preventDefault();
    const text = this.question().trim();
    void this.router.navigate(['/apps/ai/chat'], {
      queryParams: text ? { q: text } : {},
    });
  }
}
