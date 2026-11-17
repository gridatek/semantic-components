import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
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
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
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
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { ChartTooltip } from '../../shared/chart-parts';
import {
  axisLabel,
  compact,
  compactMoney,
  day,
  initials,
  money,
} from '../../shared/format';
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
  { name: $localize`Chat assistant`, tokens: 18.4, quota: 25 },
  { name: $localize`Summaries`, tokens: 9.1, quota: 15 },
  { name: $localize`Image generation`, tokens: 4.7, quota: 10 },
  { name: $localize`Embeddings`, tokens: 2.2, quota: 5 },
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
    ScStatCard,
    ScStatCardChange,
    ScStatCardDescription,
    ScStatCardIcon,
    ScStatCardLabel,
    ScStatCardValue,
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
      i18n-title
      title="SaaS + AI"
      [trail]="[{ label: t.dashboards }, { label: t.saasAi }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Monthly revenue</ng-container>
          <svg siCreditCardIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="58400"
          [format]="{
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }"
        ></dd>
        <dd
          scStatCardChange
          [value]="0.106"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Paying accounts</ng-container>
          <svg siSparklesIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="3102"></dd>
        <dd
          scStatCardChange
          [value]="0.058"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Churn</ng-container>
          <svg siUserMinusIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="0.021"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          scStatCardChange
          good="down"
          [value]="-0.003"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>AI requests</ng-container>
          <svg siBotIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="1284000"
          [format]="{ notation: 'compact', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          scStatCardChange
          [value]="0.342"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>from last month</dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n scCardTitle>Monthly recurring revenue</h2>
          <p i18n scCardDescription>The last six months</p>
        </div>
        <div scCardBody>
          <div scChart [config]="mrrConfig" [data]="mrr" class="h-72 w-full">
            <svg
              i18n-aria-label
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
            <app-chart-tooltip [format]="moneyOf" />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n scCardTitle>Accounts by plan</h2>
          <p i18n scCardDescription>{{ totalAccounts }} accounts</p>
        </div>
        <div scCardBody>
          <div scChart [config]="planConfig" [data]="plans" class="h-72 w-full">
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>AI usage</h2>
          <p i18n scCardDescription>Million tokens this month, of the quota</p>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          @for (model of models; track model.name) {
            <div scProgress [value]="model.tokens" [max]="model.quota">
              <span scProgressLabel>{{ model.name }}</span>
              <span i18n scProgressValueText
                >{{ model.tokens }}M / {{ model.quota }}M</span
              >
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
          }
        </div>
      </div>

      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n scCardTitle>New accounts</h2>
          <div i18n scCardAction>
            <a scLink routerLink="/apps/customers" class="text-sm">View all</a>
          </div>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n scTableHeaderCell>Account</th>
                  <th i18n scTableHeaderCell>Plan</th>
                  <th scTableHeaderCell class="text-end">MRR</th>
                  <th i18n scTableHeaderCell>Joined</th>
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
                      {{ moneyOf(signup.mrr) }}
                    </td>
                    <td scTableCell>{{ dayOf(signup.date) }}</td>
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
          <ng-container i18n>Ask the assistant</ng-container>
        </h2>
        <p i18n scCardDescription>About your numbers, in plain words</p>
      </div>
      <div scCardBody>
        <form (submit)="ask($event)">
          <div scInputGroup>
            <textarea
              i18n-placeholder
              i18n-aria-label
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
                <span i18n class="sr-only">Ask</span>
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
  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`Dashboards`,
    saasAi: $localize`SaaS + AI`,
  };

  private readonly router = inject(Router);
  private readonly question = signal('');
  private readonly mrr = MRR.map((row) => ({
    ...row,
    month: axisLabel(row.month),
  }));
  private readonly plans = PLANS.map((row) => ({
    ...row,
    plan: label(row.plan),
  }));
  private readonly totalAccounts = compact(
    PLANS.reduce((sum, row) => sum + row.accounts, 0),
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
    accounts: { label: $localize`Accounts`, color: 'var(--chart-3)' },
  };
  private readonly moneyOf = money;
  private readonly dayOf = day;
  private readonly initialsOf = initials;
  private readonly shortMoney = (value: number) => compactMoney(value);

  /** Takes the question to the AI chat. */
  private ask(event: Event): void {
    event.preventDefault();
    const text = this.question().trim();
    void this.router.navigate(['/apps/ai/chat'], {
      queryParams: text ? { q: text } : {},
    });
  }
}
