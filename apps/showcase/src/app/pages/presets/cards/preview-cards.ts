import { Component, ViewEncapsulation } from '@angular/core';
import { HomeAccountAccess } from '../../home/cards/account-access';
import { HomeAnalyticsCard } from '../../home/cards/analytics-card';
import { HomeClaimableBalance } from '../../home/cards/claimable-balance';
import { HomeContributionHistory } from '../../home/cards/contribution-history';
import { HomeDividendIncome } from '../../home/cards/dividend-income';
import { HomeEmptyDistributeTrack } from '../../home/cards/empty-distribute-track';
import { HomeNewMilestone } from '../../home/cards/new-milestone';
import { HomeNotificationSettings } from '../../home/cards/notification-settings';
import { HomePayments } from '../../home/cards/payments';
import { HomePayoutThreshold } from '../../home/cards/payout-threshold';
import { HomePowerUsage } from '../../home/cards/power-usage';
import { HomeQrConnect } from '../../home/cards/qr-connect';
import { HomeSavingsTargets } from '../../home/cards/savings-targets';
import { HomeSidebarNav } from '../../home/cards/sidebar-nav';
import { HomeUiElements } from '../../home/cards/ui-elements';
import { PreviewActivateAgentDialog } from './activate-agent-dialog';
import { PreviewAnomalyAlert } from './anomaly-alert';
import { PreviewBarChartCard } from './bar-chart-card';
import { PreviewBookAppointment } from './book-appointment';
import { PreviewCardOverview } from './card-overview';
import { PreviewCodespacesCard } from './codespaces-card';
import { PreviewContributionsActivity } from './contributions-activity';
import { PreviewContributors } from './contributors';
import { PreviewCoverArt } from './cover-art';
import { PreviewEmptyConnectBank } from './empty-connect-bank';
import { PreviewEmptyExploreCatalog } from './empty-explore-catalog';
import { PreviewEnvironmentVariables } from './environment-variables';
import { PreviewFaq } from './faq';
import { PreviewFeedbackForm } from './feedback-form';
import { PreviewFileUpload } from './file-upload';
import { PreviewFrontDoor } from './front-door';
import { PreviewGithubProfile } from './github-profile';
import { PreviewIconPreviewGrid } from './icon-preview-grid';
import { PreviewIndexInvesting } from './index-investing';
import { PreviewInviteTeam } from './invite-team';
import { PreviewInvoice } from './invoice';
import { PreviewKitchenIsland } from './kitchen-island';
import { PreviewLiveWaveform } from './live-waveform';
import { PreviewLoadingCard } from './loading-card';
import { PreviewNoTeamMembers } from './no-team-members';
import { PreviewNotFound } from './not-found';
import { PreviewObservabilityCard } from './observability-card';
import { PreviewPieChartCard } from './pie-chart-card';
import { PreviewPreferences } from './preferences';
import { PreviewReceivingMethod } from './receiving-method';
import { PreviewRecentTransactions } from './recent-transactions';
import { PreviewReleaseCatalog } from './release-catalog';
import { PreviewReportBug } from './report-bug';
import { PreviewRollerShades } from './roller-shades';
import { PreviewSavingsProgress } from './savings-progress';
import { PreviewShippingAddress } from './shipping-address';
import { PreviewShortcuts } from './shortcuts';
import { PreviewSkeletonLoading } from './skeleton-loading';
import { PreviewSleepReport } from './sleep-report';
import { PreviewSocialLinks } from './social-links';
import { PreviewStockPerformance } from './stock-performance';
import { PreviewStyleOverview } from './style-overview';
import { PreviewSyncingState } from './syncing-state';
import { PreviewTransferFunds } from './transfer-funds';
import { PreviewTypographySpecimen } from './typography-specimen';
import { PreviewUpcomingPayments } from './upcoming-payments';
import { PreviewUsageCard } from './usage-card';
import { PreviewVisitors } from './visitors';
import { PreviewWeeklyFitnessSummary } from './weekly-fitness-summary';

/**
 * Every demo of shadcn's Create preview, made with our parts: its two pages
 * one after the other, in their order, as columns that fill as the screen
 * widens (the cards shared with the home page are its own).
 */
@Component({
  selector: 'app-preview-cards',
  imports: [
    PreviewStyleOverview,
    PreviewTypographySpecimen,
    PreviewCodespacesCard,
    PreviewInvoice,
    PreviewIconPreviewGrid,
    HomeUiElements,
    PreviewObservabilityCard,
    PreviewShippingAddress,
    PreviewEnvironmentVariables,
    PreviewBarChartCard,
    PreviewInviteTeam,
    PreviewActivateAgentDialog,
    PreviewSkeletonLoading,
    PreviewPieChartCard,
    PreviewNoTeamMembers,
    PreviewReportBug,
    PreviewContributors,
    PreviewFeedbackForm,
    PreviewBookAppointment,
    PreviewSleepReport,
    PreviewGithubProfile,
    PreviewWeeklyFitnessSummary,
    PreviewFileUpload,
    HomeAnalyticsCard,
    PreviewUsageCard,
    PreviewShortcuts,
    PreviewAnomalyAlert,
    PreviewLiveWaveform,
    PreviewVisitors,
    PreviewContributionsActivity,
    PreviewNotFound,
    HomeAccountAccess,
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
    PreviewCardOverview,
    PreviewCoverArt,
    PreviewEmptyConnectBank,
    PreviewEmptyExploreCatalog,
    PreviewFaq,
    PreviewFrontDoor,
    PreviewIndexInvesting,
    PreviewKitchenIsland,
    PreviewLoadingCard,
    PreviewPreferences,
    PreviewReceivingMethod,
    PreviewRecentTransactions,
    PreviewReleaseCatalog,
    PreviewRollerShades,
    PreviewSavingsProgress,
    PreviewSocialLinks,
    PreviewStockPerformance,
    PreviewSyncingState,
    PreviewTransferFunds,
    PreviewUpcomingPayments,
  ],
  template: `
    <div
      class="columns-1 gap-6 *:mb-6 *:break-inside-avoid min-[1800px]:columns-4 lg:columns-2 xl:columns-3"
    >
      <app-home-contribution-history />
      <app-home-empty-distribute-track />
      <app-home-qr-connect />
      <app-home-dividend-income />
      <app-preview-index-investing />
      <app-preview-syncing-state />
      <app-home-payout-threshold />
      <app-home-claimable-balance />
      <app-preview-preferences />
      <app-preview-savings-progress />
      <app-preview-kitchen-island />
      <app-home-savings-targets />
      <app-preview-recent-transactions />
      <app-home-sidebar-nav />
      <app-preview-faq />
      <app-home-payments />
      <app-preview-front-door />
      <app-preview-release-catalog />
      <app-home-account-access />
      <app-preview-card-overview />
      <app-preview-transfer-funds />
      <app-preview-cover-art />
      <app-preview-loading-card />
      <app-preview-receiving-method />
      <app-home-power-usage />
      <app-preview-empty-connect-bank />
      <app-preview-upcoming-payments />
      <app-preview-roller-shades />
      <app-preview-stock-performance />
      <app-preview-empty-explore-catalog />
      <app-home-new-milestone />
      <app-preview-social-links />
      <app-home-notification-settings />
      <app-preview-style-overview />
      <app-preview-typography-specimen />
      <app-preview-codespaces-card />
      <app-preview-invoice />
      <app-preview-icon-preview-grid />
      <app-home-ui-elements />
      <app-preview-observability-card />
      <app-preview-shipping-address />
      <app-preview-environment-variables />
      <app-preview-bar-chart-card />
      <app-preview-invite-team />
      <app-preview-activate-agent-dialog />
      <app-preview-skeleton-loading />
      <app-preview-pie-chart-card />
      <app-preview-no-team-members />
      <app-preview-report-bug />
      <app-preview-contributors />
      <app-preview-feedback-form />
      <app-preview-book-appointment />
      <app-preview-sleep-report />
      <app-preview-github-profile />
      <app-preview-weekly-fitness-summary />
      <app-preview-file-upload />
      <app-home-analytics-card />
      <app-preview-usage-card />
      <app-preview-shortcuts />
      <app-preview-anomaly-alert />
      <app-preview-live-waveform />
      <app-preview-visitors />
      <app-preview-contributions-activity />
      <app-preview-not-found />
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCards {}
