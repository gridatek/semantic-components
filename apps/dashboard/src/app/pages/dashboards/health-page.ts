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
  { name: $localize`Move`, value: 0.82, detail: $localize`410 of 500 kcal` },
  { name: $localize`Exercise`, value: 0.64, detail: $localize`19 of 30 min` },
  { name: $localize`Stand`, value: 0.92, detail: $localize`11 of 12 hours` },
];

const APPOINTMENTS = [
  {
    personId: 6,
    title: $localize`Annual check-up`,
    when: $localize`Tue, May 5 · 9:30`,
    kind: $localize`In person`,
  },
  {
    personId: 9,
    title: $localize`Physiotherapy`,
    when: $localize`Thu, May 7 · 17:00`,
    kind: $localize`In person`,
  },
  {
    personId: 4,
    title: $localize`Nutrition follow-up`,
    when: $localize`Mon, May 11 · 12:15`,
    kind: $localize`Video`,
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
      i18n-title
      title="Health"
      [trail]="[{ label: t.dashboards }, { label: t.health }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Resting heart rate</ng-container>
          <svg siHeartPulseIcon scStatCardIcon></svg>
        </dt>
        <dd i18n scStatCardValue>58 bpm</dd>
        <dd scStatCardChange good="down" [value]="-2">
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd i18n scStatCardDescription>bpm from last week</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Steps</ng-container>
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
        <dd i18n scStatCardDescription>from yesterday</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Sleep</ng-container>
          <svg siMoonIcon scStatCardIcon></svg>
        </dt>
        <dd i18n scStatCardValue>7h 24m</dd>
        <dd i18n scStatCardDescription>deep sleep 1h 52m</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          <ng-container i18n>Calories</ng-container>
          <svg siFlameIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="2140"></dd>
        <dd i18n scStatCardDescription>of 2,400 kcal</dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n scCardTitle>Heart rate</h2>
          <p i18n scCardDescription>Today — the peak is the evening run</p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="heartConfig"
            [data]="heart"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label
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
          <h2 i18n scCardTitle>Activity</h2>
          <p i18n scCardDescription>Today's goals</p>
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
          <h2 i18n scCardTitle>Appointments</h2>
          <p i18n scCardDescription>Coming up</p>
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
                  <p i18n scItemDescription>
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
          <h2 i18n scCardTitle>Medication</h2>
          <p i18n scCardDescription>
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
    dashboards: $localize`Dashboards`,
    health: $localize`Health`,
  };

  private readonly heart = HEART.map((row) => ({ ...row }));
  private readonly heartConfig: ScChartConfig = {
    bpm: { label: $localize`Heart rate`, color: 'var(--chart-3)' },
  };
  private readonly rings = RINGS;
  private readonly appointments = APPOINTMENTS.map((visit) => ({
    ...visit,
    person: PEOPLE.find((p) => p.id === visit.personId) ?? PEOPLE[0],
  }));
  private readonly meds = signal<readonly Medication[]>([
    {
      id: 1,
      name: $localize`Vitamin D`,
      dose: $localize`1,000 IU, morning`,
      taken: true,
    },
    {
      id: 2,
      name: $localize`Omega-3`,
      dose: $localize`1 capsule, lunch`,
      taken: true,
    },
    {
      id: 3,
      name: $localize`Magnesium`,
      dose: $localize`200 mg, evening`,
      taken: false,
    },
    {
      id: 4,
      name: $localize`Iron`,
      dose: $localize`14 mg, evening`,
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
