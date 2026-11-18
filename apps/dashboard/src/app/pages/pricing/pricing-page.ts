import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScSwitch,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import { SiCheckIcon, SiMinusIcon } from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

const PLANS = [
  {
    name: $localize`:@@pricing.starter:Starter`,
    monthly: 19,
    text: $localize`:@@pricing.forOnePersonAndA:For one person and a first dashboard.`,
    features: [
      $localize`:@@pricing.n1User:1 user`,
      $localize`:@@pricing.allDashboards:All dashboards`,
      $localize`:@@pricing.chartsAndTables:Charts and tables`,
      $localize`:@@pricing.emailSupport:Email support`,
    ],
    popular: false,
  },
  {
    name: $localize`:@@pricing.pro:Pro`,
    monthly: 49,
    text: $localize`:@@pricing.forAGrowingProductAnd:For a growing product and its apps.`,
    features: [
      $localize`:@@pricing.n5Users:5 users`,
      $localize`:@@pricing.everythingInStarter:Everything in Starter`,
      $localize`:@@pricing.allApps:All apps`,
      $localize`:@@pricing.prioritySupport:Priority support`,
    ],
    popular: true,
  },
  {
    name: $localize`:@@pricing.team:Team`,
    monthly: 99,
    text: $localize`:@@pricing.forTeamsThatNeedRoles:For teams that need roles and records.`,
    features: [
      $localize`:@@pricing.unlimitedUsers:Unlimited users`,
      $localize`:@@pricing.everythingInPro:Everything in Pro`,
      $localize`:@@pricing.rolesPermissions:Roles & permissions`,
      $localize`:@@pricing.auditLog:Audit log`,
    ],
    popular: false,
  },
];

const COMPARE: readonly {
  feature: string;
  plans: readonly (boolean | string)[];
}[] = [
  {
    feature: $localize`:@@pricing.users:Users`,
    plans: ['1', '5', $localize`:@@pricing.unlimited:Unlimited`],
  },
  {
    feature: $localize`:@@pricing.dashboards:Dashboards`,
    plans: [true, true, true],
  },
  {
    feature: $localize`:@@pricing.appsMailChatCalendar:Apps (mail, chat, calendar…)`,
    plans: [false, true, true],
  },
  {
    feature: $localize`:@@pricing.rolesPermissions:Roles & permissions`,
    plans: [false, false, true],
  },
  {
    feature: $localize`:@@pricing.auditLog:Audit log`,
    plans: [false, false, true],
  },
  {
    feature: $localize`:@@pricing.support:Support`,
    plans: [
      $localize`:@@pricing.email:Email`,
      $localize`:@@pricing.priority:Priority`,
      $localize`:@@pricing.dedicated:Dedicated`,
    ],
  },
];

/** Pricing (Pro): plans, monthly or yearly, and how they compare. */
@Component({
  selector: 'app-pricing-page',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScSwitch,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiCheckIcon,
    SiMinusIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@pricing.pricing"
      title="Pricing"
      [trail]="[{ label: t.pages }, { label: t.pricing }]"
    />

    <div class="flex flex-col items-center gap-3 py-4 text-center">
      <h2
        i18n="@@pricing.plansForEverySize"
        class="text-3xl font-semibold tracking-tight"
      >
        Plans for every size
      </h2>
      <p i18n="@@pricing.startFreeFor14Days" class="text-muted-foreground">
        Start free for 14 days. No card needed.
      </p>
      <div class="flex items-center gap-3">
        <span i18n="@@pricing.monthly" class="text-sm font-medium"
          >Monthly</span
        >
        <input
          i18n-aria-label="@@pricing.payYearly"
          scSwitch
          id="yearly"
          type="checkbox"
          [checked]="yearly()"
          (change)="yearly.set(!yearly())"
          aria-label="Pay yearly"
        />
        <span i18n="@@pricing.yearly" class="text-sm font-medium">Yearly</span>
        <span i18n="@@pricing.n2MonthsFree" scBadge variant="secondary"
          >2 months free</span
        >
      </div>
    </div>

    <div class="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3">
      @for (plan of plans; track plan.name) {
        <div
          scCard
          [class.ring-2]="plan.popular"
          [class.ring-primary]="plan.popular"
        >
          <div scCardHeader>
            <h3 scCardTitle class="flex items-center gap-2">
              {{ plan.name }}
              @if (plan.popular) {
                <span i18n="@@pricing.mostPopular" scBadge>Most popular</span>
              }
            </h3>
            <p scCardDescription>{{ plan.text }}</p>
          </div>
          <div scCardBody class="flex flex-1 flex-col gap-6">
            <p>
              <span class="text-4xl font-semibold tabular-nums"
                >\${{ price(plan.monthly) }}</span
              >
              <span class="text-muted-foreground">
                {{ yearly() ? t.perYear : t.perMonth }}</span
              >
            </p>
            <ul class="flex flex-col gap-2 text-sm">
              @for (feature of plan.features; track feature) {
                <li class="flex items-center gap-2">
                  <svg siCheckIcon class="size-4"></svg>{{ feature }}
                </li>
              }
            </ul>
          </div>
          <div scCardFooter>
            <button
              i18n="@@pricing.choose"
              scButton
              class="w-full"
              [variant]="plan.popular ? 'default' : 'outline'"
              (click)="choose(plan.name)"
            >
              Choose {{ plan.name }}
            </button>
          </div>
        </div>
      }
    </div>

    <div scCard class="mx-auto w-full max-w-5xl">
      <div scCardHeader>
        <h2 i18n="@@pricing.comparePlans" scCardTitle>Compare plans</h2>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th i18n="@@pricing.feature" scTableHeaderCell>Feature</th>
                @for (plan of plans; track plan.name) {
                  <th scTableHeaderCell class="text-center">{{ plan.name }}</th>
                }
              </tr>
            </thead>
            <tbody scTableBody>
              @for (row of compare; track row.feature) {
                <tr scTableRow>
                  <th scTableCell scope="row" class="text-start font-medium">
                    {{ row.feature }}
                  </th>
                  @for (value of row.plans; track $index) {
                    <td scTableCell class="text-center">
                      @if (value === true) {
                        <svg siCheckIcon class="mx-auto size-4"></svg
                        ><span i18n="@@pricing.included" class="sr-only"
                          >Included</span
                        >
                      } @else if (value === false) {
                        <svg
                          siMinusIcon
                          class="text-muted-foreground mx-auto size-4"
                        ></svg
                        ><span i18n="@@pricing.notIncluded" class="sr-only"
                          >Not included</span
                        >
                      } @else {
                        {{ value }}
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-6' },
  encapsulation: ViewEncapsulation.None,
})
export class PricingPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    perYear: $localize`:@@pricing.year:/ year`,
    perMonth: $localize`:@@pricing.month:/ month`,
    pages: $localize`:@@pricing.pages:Pages`,
    pricing: $localize`:@@pricing.pricing:Pricing`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly plans = PLANS;
  private readonly compare = COMPARE;
  private readonly yearly = signal(false);

  /** A year is ten months. */
  private price(monthly: number): number {
    return this.yearly() ? monthly * 10 : monthly;
  }

  private choose(plan: string): void {
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@pricing.planChosen:${plan} plan chosen`,
      description: this.yearly()
        ? $localize`:@@pricing.billedYearlyAfterTheTrial:Billed yearly after the trial.`
        : $localize`:@@pricing.billedMonthlyAfterTheTrial:Billed monthly after the trial.`,
    });
  }
}
