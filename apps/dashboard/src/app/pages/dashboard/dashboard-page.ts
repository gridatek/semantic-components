import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiArrowRightIcon,
  SiBookmarkIcon,
  SiBoxIcon,
  SiBriefcaseBusinessIcon,
  SiCalendarDaysIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiDownloadIcon,
  SiFileIcon,
  SiHandbagIcon,
  SiMoonIcon,
  SiRefreshCcwIcon,
  SiSunIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';
import { LiveDot } from '../../components/live-dot';
import { ASSETS, KPIS } from '../../data/dashboard';
import { compact, count, day, percent, today } from '../../shared/format';
import { ProjectsOrders } from './projects-orders';
import { SalesOverview } from './sales-overview';

type Greeting =
  'Good Morning' | 'Good Afternoon' | 'Good Evening' | 'Good Night';

/** The time of day's greeting. */
function greeting(): Greeting {
  const hour = Temporal.Now.plainTimeISO().hour;
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

/** The Modern dashboard: the home screen. */
@Component({
  selector: 'app-dashboard-page',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScFrame,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiArrowRightIcon,
    SiBookmarkIcon,
    SiBoxIcon,
    SiBriefcaseBusinessIcon,
    SiCalendarDaysIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
    SiFileIcon,
    SiHandbagIcon,
    SiMoonIcon,
    SiRefreshCcwIcon,
    SiSunIcon,
    SiUsersIcon,
    LiveDot,
    ProjectsOrders,
    SalesOverview,
  ],
  template: `
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-col gap-1">
        <h1
          class="flex items-center gap-2 text-2xl font-semibold tracking-tight"
        >
          {{ helloText }}
          @if (hello === 'Good Morning' || hello === 'Good Afternoon') {
            <svg siSunIcon></svg>
          } @else {
            <svg siMoonIcon></svg>
          }
        </h1>
        <p
          i18n="@@dashboard.stayInformedWithTodayS"
          class="text-muted-foreground text-sm"
        >
          Stay informed with today’s analytics
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button scButton variant="outline" size="icon" (click)="refresh()">
          <svg siRefreshCcwIcon></svg>
          <span i18n="@@dashboard.refresh" class="sr-only">Refresh</span>
        </button>
        <div scSelect [(value)]="range" [items]="ranges">
          <div
            i18n-aria-label="@@dashboard.range"
            scSelectTrigger
            aria-label="Range"
            class="w-36"
          >
            <svg siCalendarDaysIcon></svg>
            <span scSelectValue></span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectPortal>
            <div scSelectPopup>
              <div scSelectList>
                <div scSelectGroup>
                  @for (item of ranges; track item.value) {
                    <div scSelectItem [value]="item.value">
                      <span scSelectItemText>{{ item.label }}</span>
                      <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </ng-template>
        </div>
        <button scButton (click)="export()">
          <svg siDownloadIcon></svg>
          <ng-container i18n="@@dashboard.export">Export</ng-container>
        </button>
      </div>
    </div>

    <div scCard class="py-3">
      <div scCardBody class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2 text-sm">
            <app-live-dot />
            <span i18n="@@dashboard.update" class="font-medium">Update</span>
            <span class="text-muted-foreground">· {{ date }}</span>
          </div>
          <p i18n="@@dashboard.salesRevenueIncreased40In">
            Sales revenue increased
            <strong>{{ percentOf(0.4) }}</strong> in {{ countOf(1) }} week
          </p>
        </div>
        <button scButton variant="outline">
          <ng-container i18n="@@dashboard.seeStatistics"
            >See Statistics</ng-container
          >
          <svg siArrowRightIcon class="rtl:-scale-x-100"></svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <app-sales-overview class="lg:col-span-7" />
      <div scCard class="lg:col-span-5">
        <div scCardHeader>
          <h2 scCardTitle id="assets-title" class="flex items-center gap-2">
            <svg siBoxIcon></svg>
            <ng-container i18n="@@dashboard.totalAssets"
              >Total Assets</ng-container
            >
          </h2>
        </div>
        <div scCardBody class="grid flex-1 grid-cols-2 gap-4">
          @for (asset of assets; track asset.title) {
            <div
              scFrame
              size="sm"
              class="flex flex-col justify-between gap-6 p-4"
            >
              <span scFrame size="sm" class="w-fit p-2">
                @switch (asset.icon) {
                  @case ('users') {
                    <svg siUsersIcon></svg>
                  }
                  @case ('file') {
                    <svg siFileIcon></svg>
                  }
                  @case ('briefcase') {
                    <svg siBriefcaseBusinessIcon></svg>
                  }
                  @case ('bookmark') {
                    <svg siBookmarkIcon></svg>
                  }
                }
              </span>
              <div>
                <p class="text-2xl font-semibold tabular-nums">
                  {{ countOf(asset.value) }}
                </p>
                <p class="text-muted-foreground text-sm">{{ asset.title }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      @for (kpi of kpis; track kpi.title) {
        <div scCard>
          <div scCardBody class="flex flex-col items-start gap-4">
            <div class="flex w-full items-start justify-between">
              <div class="flex flex-col gap-1">
                <p class="text-sm">{{ kpi.title }}</p>
                <div class="flex items-center gap-2">
                  <p class="text-2xl font-semibold tabular-nums">
                    {{ compactOf(kpi.value) }}
                  </p>
                  <span
                    scBadge
                    [variant]="kpi.trend === 'up' ? 'secondary' : 'destructive'"
                  >
                    <span class="sr-only">{{
                      kpi.trend === 'up' ? t.up : t.down
                    }}</span>
                    {{ percentOf(kpi.change) }}
                  </span>
                </div>
              </div>
              <span scFrame size="sm" class="p-2">
                @switch (kpi.icon) {
                  @case ('handbag') {
                    <svg siHandbagIcon></svg>
                  }
                  @case ('users') {
                    <svg siUsersIcon></svg>
                  }
                  @case ('box') {
                    <svg siBoxIcon></svg>
                  }
                }
              </span>
            </div>
            <button scButton variant="outline" size="sm">
              <ng-container i18n="@@dashboard.seeStatistics"
                >See Statistics</ng-container
              >
              <svg siArrowRightIcon class="rtl:-scale-x-100"></svg>
            </button>
          </div>
        </div>
      }
    </div>

    <app-projects-orders />
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    up: $localize`:@@dashboard.up:Up`,
    down: $localize`:@@dashboard.down:Down`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly hello = greeting();
  /** The greeting in the reader's words, with the name. */
  private readonly helloText = {
    'Good Morning': $localize`:@@dashboard.goodMorningCameron:Good Morning, Cameron`,
    'Good Afternoon': $localize`:@@dashboard.goodAfternoonCameron:Good Afternoon, Cameron`,
    'Good Evening': $localize`:@@dashboard.goodEveningCameron:Good Evening, Cameron`,
    'Good Night': $localize`:@@dashboard.goodNightCameron:Good Night, Cameron`,
  }[this.hello];
  private readonly date = day(today());
  /** Its numbers, in the user's numbering system. */
  private readonly countOf = count;
  private readonly compactOf = compact;
  private readonly percentOf = percent;
  private readonly assets = ASSETS;
  private readonly kpis = KPIS;
  private readonly ranges = [
    { value: 'Monthly', label: $localize`:@@dashboard.monthly:Monthly` },
    { value: 'Yearly', label: $localize`:@@dashboard.yearly:Yearly` },
  ];
  private readonly range = signal('Monthly');

  private refresh(): void {
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@dashboard.dashboardRefreshed:Dashboard refreshed`,
    });
  }

  private export(): void {
    this.toaster.show({
      variant: 'info',
      title: $localize`:@@dashboard.exportStarted:Export started`,
      description:
        this.range() === 'Yearly'
          ? $localize`:@@dashboard.theYearlyReportWillDownload:The yearly report will download shortly.`
          : $localize`:@@dashboard.theMonthlyReportWillDownload:The monthly report will download shortly.`,
    });
  }
}
