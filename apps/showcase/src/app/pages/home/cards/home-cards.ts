import { Component, ViewEncapsulation } from '@angular/core';
import { MessageScrollerUsageDemo } from '../../docs/message-scroller/demos/message-scroller-usage-demo';
import { HomeAccountAccess } from './account-access';
import { HomeAnalyticsCard } from './analytics-card';
import { HomeClaimableBalance } from './claimable-balance';
import { HomeContributionHistory } from './contribution-history';
import { HomeDividendIncome } from './dividend-income';
import { HomeEmptyDistributeTrack } from './empty-distribute-track';
import { HomeNewMilestone } from './new-milestone';
import { HomeNotificationSettings } from './notification-settings';
import { HomePayments } from './payments';
import { HomePayoutThreshold } from './payout-threshold';
import { HomePowerUsage } from './power-usage';
import { HomeQrConnect } from './qr-connect';
import { HomeSavingsTargets } from './savings-targets';
import { HomeSidebarNav } from './sidebar-nav';
import { HomeUiElements } from './ui-elements';

/**
 * The home page's cards, as shadcn's: columns that appear as the screen
 * widens (one on a phone, five from 1900px), on a muted band that fades out
 * at the top and the bottom.
 */
@Component({
  selector: 'app-home-cards',
  imports: [
    MessageScrollerUsageDemo,
    HomeAccountAccess,
    HomeAnalyticsCard,
    HomeClaimableBalance,
    HomeContributionHistory,
    HomeDividendIncome,
    HomeEmptyDistributeTrack,
    HomeNewMilestone,
    HomeNotificationSettings,
    HomePayments,
    HomePayoutThreshold,
    HomePowerUsage,
    HomeQrConnect,
    HomeSavingsTargets,
    HomeSidebarNav,
    HomeUiElements,
  ],
  template: `
    <div
      class="bg-muted dark:bg-background relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden p-4 pb-0! [--gap:--spacing(6)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]! sm:p-12 sm:[--gap:--spacing(8)] lg:p-6 lg:[--gap:--spacing(6)]"
    >
      <div
        class="relative z-10 mx-auto grid w-full gap-(--gap) min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px]"
      >
        <div class="flex flex-col items-start gap-(--gap)">
          <app-home-ui-elements />
          <app-home-sidebar-nav />
          <app-home-savings-targets />
        </div>
        <div class="hidden flex-col gap-(--gap) lg:flex">
          <app-home-contribution-history />
          <app-home-claimable-balance />
          <app-home-dividend-income />
        </div>
        <div class="hidden flex-col gap-(--gap) min-[1400px]:flex">
          <app-home-new-milestone />
          <app-home-payout-threshold />
          <app-home-account-access />
        </div>
        <div class="hidden flex-col gap-(--gap) md:flex">
          <app-home-qr-connect />
          <app-message-scroller-usage-demo />
          <app-home-payments />
        </div>
        <div class="hidden flex-col gap-(--gap) min-[1900px]:flex">
          <app-home-empty-distribute-track />
          <app-home-analytics-card />
          <app-home-notification-settings />
          <app-home-power-usage />
        </div>
      </div>
      <div
        class="from-background via-muted pointer-events-none absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b to-transparent dark:hidden"
      ></div>
      <div
        class="from-background via-muted/80 dark:via-background/80 pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t to-transparent lg:h-80 xl:h-64"
      ></div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeCards {}
