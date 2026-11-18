import { PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScLabel,
  ScProgress,
  ScProgressCircle,
  ScProgressValueText,
  ScStatCard,
  ScStatCardChange,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartLine,
  ScChartPlot,
  ScChartValueAxis,
} from '@semantic-components/ui/charts';
import {
  SiFlameIcon,
  SiFootprintsIcon,
  SiHeartPulseIcon,
  SiMoonIcon,
  SiTrendingDownIcon,
  SiTrendingUpIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { ChartTooltip } from '../../shared/chart-parts';
import { initials } from '../../shared/format';

const HEART = [
  { time: '00:00', bpm: 58 },
  { time: '03:00', bpm: 54 },
  { time: '06:00', bpm: 61 },
  { time: '08:00', bpm: 84 },
  { time: '10:00', bpm: 72 },
  { time: '12:00', bpm: 78 },
  { time: '14:00', bpm: 74 },
  { time: '17:00', bpm: 128 },
  { time: '18:00', bpm: 96 },
  { time: '20:00', bpm: 70 },
  { time: '22:00', bpm: 64 },
];

const RINGS = [
  {
    name: $localize`:@@dashboards.health.move:Move`,
    value: 0.82,
    detail: $localize`:@@dashboards.health.n410Of500Kcal:410 of 500 kcal`,
  },
  {
    name: $localize`:@@dashboards.health.exercise:Exercise`,
    value: 0.64,
    detail: $localize`:@@dashboards.health.n19Of30Min:19 of 30 min`,
  },
  {
    name: $localize`:@@dashboards.health.stand:Stand`,
    value: 0.92,
    detail: $localize`:@@dashboards.health.n11Of12Hours:11 of 12 hours`,
  },
];

const APPOINTMENTS = [
  {
    personId: 6,
    title: $localize`:@@dashboards.health.annualCheckUp:Annual check-up`,
    when: $localize`:@@dashboards.health.tueMay5930:Tue, May 5 · 9:30`,
    kind: $localize`:@@dashboards.health.inPerson:In person`,
  },
  {
    personId: 9,
    title: $localize`:@@dashboards.health.physiotherapy:Physiotherapy`,
    when: $localize`:@@dashboards.health.thuMay71700:Thu, May 7 · 17:00`,
    kind: $localize`:@@dashboards.health.inPerson:In person`,
  },
  {
    personId: 4,
    title: $localize`:@@dashboards.health.nutritionFollowUp:Nutrition follow-up`,
    when: $localize`:@@dashboards.health.monMay111215:Mon, May 11 · 12:15`,
    kind: $localize`:@@dashboards.health.video:Video`,
  },
];

interface Medication {
  readonly id: number;
  readonly name: string;
  readonly dose: string;
  readonly taken: boolean;
}

/** Health (Pro): the day's vitals, activity, appointments and pills. */
@Component({
  selector: 'app-health-page',
  imports: [
    PercentPipe,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    ScLabel,
    ScProgress,
    ScProgressCircle,
    ScProgressValueText,
    ScStatCard,
    ScStatCardChange,
    ScStatCardDescription,
    ScStatCardIcon,
    ScStatCardLabel,
    ScStatCardValue,
    ScChart,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartLine,
    ScChartPlot,
    ScChartValueAxis,
    SiFlameIcon,
    SiFootprintsIcon,
    SiHeartPulseIcon,
    SiMoonIcon,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
    PageHeader,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@dashboards.health.health"
      title="Health"
      [trail]="[{ label: t.dashboards }, { label: t.health }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n="@@dashboards.health.restingHeartRate"
            >Resting heart rate</ng-container
          >
          <svg siHeartPulseIcon scStatCardIcon></svg>
        </dt>
        <dd i18n="@@dashboards.health.n58Bpm" scStatCardValue>58 bpm</dd>
        <dd scStatCardChange good="down" [value]="-2">
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n="@@dashboards.health.bpmFromLastWeek" scStatCardDescription>
          bpm from last week
        </dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n="@@dashboards.health.steps">Steps</ng-container>
          <svg siFootprintsIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="8432"></dd>
        <dd
          scStatCardChange
          [value]="0.14"
          [format]="{ style: 'percent', maximumFractionDigits: 0 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.health.fromYesterday" scStatCardDescription>
          from yesterday
        </dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n="@@dashboards.health.sleep">Sleep</ng-container>
          <svg siMoonIcon scStatCardIcon></svg>
        </dt>
        <dd i18n="@@dashboards.health.n7h24m" scStatCardValue>7h 24m</dd>
        <dd i18n="@@dashboards.health.deepSleep1h52m" scStatCardDescription>
          deep sleep 1h 52m
        </dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n="@@dashboards.health.calories"
            >Calories</ng-container
          >
          <svg siFlameIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="2140"></dd>
        <dd i18n="@@dashboards.health.of2400Kcal" scStatCardDescription>
          of 2,400 kcal
        </dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.health.heartRate" scCardTitle>Heart rate</h2>
          <p i18n="@@dashboards.health.todayThePeakIsThe" scCardDescription>
            Today — the peak is the evening run
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="heartConfig"
            [data]="heart"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label="@@dashboards.health.heartRateToday"
              scChartPlot
              categoryKey="time"
              aria-label="Heart rate today"
            >
              <g scChartGrid />
              <g scChartCategoryAxis />
              <g scChartValueAxis [domain]="[40, 140]" />
              <g scChartCursor />
              <g scChartLine key="bpm" curve="monotone" dots />
            </svg>
            <app-chart-tooltip [format]="bpmOf" />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.health.activity" scCardTitle>Activity</h2>
          <p i18n="@@dashboards.health.todaySGoals" scCardDescription>
            Today's goals
          </p>
        </div>
        <div scCardBody class="grid grid-cols-3 gap-4">
          @for (ring of rings; track ring.name) {
            <div class="flex flex-col items-center gap-2 text-center">
              <div
                scProgress
                [value]="ring.value * 100"
                [attr.aria-label]="ring.name"
                class="size-20"
              >
                <svg scProgressCircle [thickness]="6"></svg>
                <span scProgressValueText class="text-sm font-semibold">{{
                  ring.value | percent
                }}</span>
              </div>
              <span class="text-sm font-medium">{{ ring.name }}</span>
              <span class="text-muted-foreground text-xs">{{
                ring.detail
              }}</span>
            </div>
          }
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.health.appointments" scCardTitle>
            Appointments
          </h2>
          <p i18n="@@dashboards.health.comingUp" scCardDescription>Coming up</p>
        </div>
        <div scCardBody>
          <div scItemGroup class="gap-2">
            @for (visit of appointments; track visit.title) {
              <div scItem variant="outline" size="sm">
                <div scItemMedia>
                  <span scAvatar>
                    <img scAvatarImage [src]="visit.person.avatar" alt="" />
                    <span scAvatarFallback>{{
                      initialsOf(visit.person.name)
                    }}</span>
                  </span>
                </div>
                <div scItemBody>
                  <div scItemTitle>{{ visit.title }}</div>
                  <p i18n="@@dashboards.health.dr" scItemDescription>
                    Dr. {{ visit.person.name }} · {{ visit.when }}
                  </p>
                </div>
                <div scItemActions>
                  <span scBadge variant="outline">{{ visit.kind }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.health.medication" scCardTitle>Medication</h2>
          <p i18n="@@dashboards.health.ofTaken" scCardDescription>
            {{ taken() }} of {{ meds().length }} taken
          </p>
        </div>
        <div scCardBody class="flex flex-col gap-3">
          @for (med of meds(); track med.id) {
            <div scField orientation="horizontal">
              <input
                scCheckbox
                type="checkbox"
                [id]="'med-' + med.id"
                [checked]="med.taken"
                (change)="toggle(med.id)"
              />
              <label scLabel [for]="'med-' + med.id">
                {{ med.name }}
                <span class="text-muted-foreground font-normal">{{
                  med.dose
                }}</span>
              </label>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class HealthPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`:@@dashboards.health.dashboards:Dashboards`,
    health: $localize`:@@dashboards.health.health:Health`,
  };

  private readonly heart = HEART.map((row) => ({ ...row }));
  private readonly heartConfig: ScChartConfig = {
    bpm: {
      label: $localize`:@@dashboards.health.heartRate:Heart rate`,
      color: 'var(--chart-3)',
    },
  };
  private readonly rings = RINGS;
  private readonly appointments = APPOINTMENTS.map((visit) => ({
    ...visit,
    person: PEOPLE.find((p) => p.id === visit.personId) ?? PEOPLE[0],
  }));
  private readonly meds = signal<readonly Medication[]>([
    {
      id: 1,
      name: $localize`:@@dashboards.health.vitaminD:Vitamin D`,
      dose: $localize`:@@dashboards.health.n1000IuMorning:1,000 IU, morning`,
      taken: true,
    },
    {
      id: 2,
      name: $localize`:@@dashboards.health.omega3:Omega-3`,
      dose: $localize`:@@dashboards.health.n1CapsuleLunch:1 capsule, lunch`,
      taken: true,
    },
    {
      id: 3,
      name: $localize`:@@dashboards.health.magnesium:Magnesium`,
      dose: $localize`:@@dashboards.health.n200MgEvening:200 mg, evening`,
      taken: false,
    },
    {
      id: 4,
      name: $localize`:@@dashboards.health.iron:Iron`,
      dose: $localize`:@@dashboards.health.n14MgEvening:14 mg, evening`,
      taken: false,
    },
  ]);
  private readonly taken = computed(
    () => this.meds().filter((med) => med.taken).length,
  );
  private readonly initialsOf = initials;
  private readonly bpmOf = (value: number) => `${value} bpm`;

  private toggle(id: number): void {
    this.meds.update((meds) =>
      meds.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)),
    );
  }
}
