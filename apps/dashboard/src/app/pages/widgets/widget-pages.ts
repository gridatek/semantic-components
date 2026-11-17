import { NgOptimizedImage, PercentPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScLink,
  ScProgress,
  ScProgressCircle,
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
  ScToggle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartArea,
  ScChartBar,
  type ScChartConfig,
  ScChartLine,
  ScChartPie,
  ScChartPlot,
} from '@semantic-components/ui/charts';
import {
  SiDollarSignIcon,
  SiHeartIcon,
  SiMapPinIcon,
  SiShoppingBagIcon,
  SiStarIcon,
  SiTrendingDownIcon,
  SiTrendingUpIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { PRODUCTS } from '../../data/products';
import { PageHeader } from '../../layout/page-header';
import { ChartTooltip } from '../../shared/chart-parts';
import { initials, money } from '../../shared/format';

/** Widget cards (Pro): figures, people, a product, progress — ready to reuse. */
@Component({
  selector: 'app-widget-cards-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
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
    ScToggle,
    SiDollarSignIcon,
    SiHeartIcon,
    SiMapPinIcon,
    SiShoppingBagIcon,
    SiStarIcon,
    SiTrendingDownIcon,
    SiTrendingUpIcon,
    SiUsersIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      title="Widget Cards"
      [trail]="[{ label: 'Widgets' }, { label: 'Cards' }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl scStatCard>
        <dt scStatCardLabel>
          Revenue <svg siDollarSignIcon scStatCardIcon></svg>
        </dt>
        <dd
          scStatCardValue
          [value]="45231.89"
          [format]="{ style: 'currency', currency: 'USD' }"
        ></dd>
        <dd
          scStatCardChange
          [value]="0.201"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Subscriptions <svg siUsersIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="2350"></dd>
        <dd
          scStatCardChange
          [value]="1.801"
          [format]="{ style: 'percent', maximumFractionDigits: 0 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Sales <svg siShoppingBagIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="12234"></dd>
        <dd
          scStatCardChange
          [value]="0.19"
          [format]="{ style: 'percent', maximumFractionDigits: 0 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
      <dl scStatCard>
        <dt scStatCardLabel>
          Refunds <svg siTrendingDownIcon scStatCardIcon></svg>
        </dt>
        <dd scStatCardValue [value]="573"></dd>
        <dd
          scStatCardChange
          good="down"
          [value]="-0.04"
          [format]="{ style: 'percent', maximumFractionDigits: 0 }"
        >
          <svg siTrendingDownIcon></svg>
        </dd>
        <dd scStatCardDescription>from last month</dd>
      </dl>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard class="text-center">
        <div scCardBody class="flex flex-col items-center gap-2">
          <span scAvatar class="size-20">
            <img scAvatarImage [src]="person.avatar" alt="" />
            <span scAvatarFallback class="text-xl">{{
              initialsOf(person.name)
            }}</span>
          </span>
          <h2 class="font-semibold">{{ person.name }}</h2>
          <p class="text-muted-foreground flex items-center gap-1 text-sm">
            <svg siMapPinIcon class="size-3.5"></svg> {{ person.city }},
            {{ person.country }}
          </p>
          <dl class="grid w-full grid-cols-3 gap-2 pt-2">
            <div>
              <dt class="text-muted-foreground text-xs">Posts</dt>
              <dd class="font-semibold">124</dd>
            </div>
            <div>
              <dt class="text-muted-foreground text-xs">Followers</dt>
              <dd class="font-semibold">3.2K</dd>
            </div>
            <div>
              <dt class="text-muted-foreground text-xs">Following</dt>
              <dd class="font-semibold">410</dd>
            </div>
          </dl>
        </div>
        <div scCardFooter class="justify-center gap-2">
          <button scButton size="sm" (click)="following.set(!following())">
            {{ following() ? 'Following' : 'Follow' }}
          </button>
          <a scLink variant="outline" size="sm" routerLink="/apps/chats"
            >Message</a
          >
        </div>
      </div>

      <div scCard class="gap-0 overflow-hidden pt-0">
        <div class="relative aspect-video">
          <img
            [ngSrc]="product.image"
            fill
            sizes="(min-width: 1280px) 30vw, 90vw"
            alt=""
            class="object-cover"
          />
          <span scBadge variant="destructive" class="absolute start-3 top-3"
            >Sale</span
          >
        </div>
        <div scCardHeader class="pt-4">
          <h2 scCardTitle>{{ product.name }}</h2>
          <p scCardDescription class="flex items-center gap-1">
            <svg siStarIcon class="size-3.5 fill-current"></svg>
            {{ product.rating }} · {{ product.reviews }} reviews
          </p>
          <div scCardAction>
            <button
              scToggle
              size="sm"
              [pressed]="liked()"
              (pressedChange)="liked.set($event)"
            >
              <svg siHeartIcon></svg><span class="sr-only">Like</span>
            </button>
          </div>
        </div>
        <div scCardFooter class="justify-between">
          <span class="text-lg font-semibold tabular-nums">{{
            moneyOf(product.price)
          }}</span>
          <a
            scLink
            variant="button"
            size="sm"
            [routerLink]="['/apps/ecommerce/detail', product.id]"
            >View</a
          >
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle>Project Apollo</h2>
          <p scCardDescription>Due May 30</p>
          <div scCardAction>
            <span scBadge variant="secondary">On track</span>
          </div>
        </div>
        <div scCardBody class="flex flex-col gap-4">
          <div scProgress [value]="68">
            <span scProgressLabel>Progress</span>
            <span scProgressValueText>68%</span>
            <div scProgressTrack><div scProgressRange></div></div>
          </div>
          <div class="flex items-center justify-between">
            <div scAvatarGroup>
              @for (p of team; track p.id) {
                <span scAvatar size="sm">
                  <img scAvatarImage [src]="p.avatar" [alt]="p.name" />
                  <span scAvatarFallback>{{ initialsOf(p.name) }}</span>
                </span>
              }
              <div scAvatarGroupCount>+3</div>
            </div>
            <span class="text-muted-foreground text-sm">14 of 21 tasks</span>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class WidgetCardsPage {
  private readonly person = PEOPLE[5];
  private readonly product = PRODUCTS[3];
  private readonly team = PEOPLE.slice(1, 5);
  private readonly following = signal(false);
  private readonly liked = signal(true);
  private readonly initialsOf = initials;
  private readonly moneyOf = money;
}

const WEEK = [
  { day: 'Mon', value: 32 },
  { day: 'Tue', value: 41 },
  { day: 'Wed', value: 36 },
  { day: 'Thu', value: 52 },
  { day: 'Fri', value: 48 },
  { day: 'Sat', value: 61 },
  { day: 'Sun', value: 58 },
];

/** Widget charts (Pro): small charts in cards, a figure beside each. */
@Component({
  selector: 'app-widget-charts-page',
  imports: [
    PercentPipe,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScProgress,
    ScProgressCircle,
    ScProgressValueText,
    ScChart,
    ScChartArea,
    ScChartBar,
    ScChartLine,
    ScChartPie,
    ScChartPlot,
    PageHeader,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      title="Widget Charts"
      [trail]="[{ label: 'Widgets' }, { label: 'Charts' }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div scCard>
        <div scCardHeader>
          <p scCardDescription>Visitors this week</p>
          <h2 scCardTitle class="text-2xl tabular-nums">328</h2>
        </div>
        <div scCardBody>
          <div scChart [config]="config" [data]="week" class="h-20 w-full">
            <svg scChartPlot categoryKey="day" aria-label="Visitors by day">
              <g scChartArea key="value" curve="monotone" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <p scCardDescription>Orders this week</p>
          <h2 scCardTitle class="text-2xl tabular-nums">1,204</h2>
        </div>
        <div scCardBody>
          <div scChart [config]="config" [data]="week" class="h-20 w-full">
            <svg scChartPlot categoryKey="day" aria-label="Orders by day">
              <g scChartBar key="value" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <p scCardDescription>Sign-ups this week</p>
          <h2 scCardTitle class="text-2xl tabular-nums">86</h2>
        </div>
        <div scCardBody>
          <div scChart [config]="config" [data]="week" class="h-20 w-full">
            <svg scChartPlot categoryKey="day" aria-label="Sign-ups by day">
              <g scChartLine key="value" curve="monotone" />
            </svg>
            <app-chart-tooltip />
          </div>
        </div>
      </div>
      <div scCard>
        <div scCardHeader>
          <p scCardDescription>Storage used</p>
          <h2 scCardTitle class="text-2xl tabular-nums">74 GB</h2>
        </div>
        <div scCardBody class="flex justify-center">
          <div
            scProgress
            [value]="74"
            aria-label="Storage used"
            class="size-20"
          >
            <svg scProgressCircle [thickness]="6"></svg>
            <span scProgressValueText class="text-sm font-semibold">{{
              0.74 | percent
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div scCard>
        <div scCardHeader>
          <h2 scCardTitle>Devices</h2>
          <p scCardDescription>Where visits come from</p>
        </div>
        <div scCardBody class="flex items-center gap-6">
          <div
            scChart
            [config]="deviceConfig"
            [data]="devices"
            class="aspect-square w-32"
          >
            <svg scChartPlot categoryKey="device" aria-label="Visits by device">
              <g
                scChartPie
                key="share"
                [innerRadius]="0.65"
                [strokeWidth]="0"
              />
            </svg>
            <app-chart-tooltip hideLabel [format]="percentOf" />
          </div>
          <ul class="flex flex-col gap-2 text-sm">
            @for (d of devices; track d.device) {
              <li class="flex items-center gap-2">
                <span
                  class="size-2 rounded-full"
                  [style.background-color]="deviceConfig[d.device].color"
                ></span>
                {{ deviceConfig[d.device].label }}
                <span class="text-muted-foreground tabular-nums">{{
                  d.share | percent
                }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 scCardTitle>Weekly goals</h2>
          <p scCardDescription>How far each team got</p>
        </div>
        <div scCardBody class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          @for (goal of goals; track goal.team) {
            <div class="flex flex-col items-center gap-2">
              <div
                scProgress
                [value]="goal.value * 100"
                [attr.aria-label]="goal.team"
                class="size-20"
              >
                <svg scProgressCircle [thickness]="6"></svg>
                <span scProgressValueText class="text-sm font-semibold">{{
                  goal.value | percent
                }}</span>
              </div>
              <span class="text-sm font-medium">{{ goal.team }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class WidgetChartsPage {
  private readonly week = WEEK.map((row) => ({ ...row }));
  private readonly config: ScChartConfig = {
    value: { label: 'This week', color: 'var(--chart-3)' },
  };
  private readonly devices = [
    { device: 'desktop', share: 0.58 },
    { device: 'mobile', share: 0.34 },
    { device: 'tablet', share: 0.08 },
  ];
  private readonly deviceConfig: Record<
    string,
    { label: string; color: string }
  > = {
    desktop: { label: 'Desktop', color: 'var(--chart-2)' },
    mobile: { label: 'Mobile', color: 'var(--chart-4)' },
    tablet: { label: 'Tablet', color: 'var(--chart-5)' },
  };
  private readonly goals = [
    { team: 'Sales', value: 0.82 },
    { team: 'Support', value: 0.64 },
    { team: 'Design', value: 0.91 },
    { team: 'Engineering', value: 0.57 },
  ];
  private readonly percentOf = (value: number) => `${Math.round(value * 100)}%`;
}
