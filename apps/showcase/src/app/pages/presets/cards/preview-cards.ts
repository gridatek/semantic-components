import { Component, ViewEncapsulation } from '@angular/core';
import { HomeEmptyDistributeTrack } from '../../home/cards/empty-distribute-track';
import { HomeNewMilestone } from '../../home/cards/new-milestone';
import { PreviewAccountAccess } from './account-access';
import { PreviewActivateAgentDialog } from './activate-agent-dialog';
import { PreviewAnalyticsCard } from './analytics-card';
import { PreviewAnomalyAlert } from './anomaly-alert';
import { PreviewBarChartCard } from './bar-chart-card';
import { PreviewBookAppointment } from './book-appointment';
import { PreviewCardOverview } from './card-overview';
import { PreviewClaimableBalance } from './claimable-balance';
import { PreviewCodespacesCard } from './codespaces-card';
import { PreviewContributionHistory } from './contribution-history';
import { PreviewContributionsActivity } from './contributions-activity';
import { PreviewContributors } from './contributors';
import { PreviewCoverArt } from './cover-art';
import { PreviewDividendIncome } from './dividend-income';
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
import { PreviewNotificationSettings } from './notification-settings';
import { PreviewObservabilityCard } from './observability-card';
import { PreviewPayments } from './payments';
import { PreviewPayoutThreshold } from './payout-threshold';
import { PreviewPieChartCard } from './pie-chart-card';
import { PreviewPowerUsage } from './power-usage';
import { PreviewPreferences } from './preferences';
import { PreviewQrConnect } from './qr-connect';
import { PreviewReceivingMethod } from './receiving-method';
import { PreviewRecentTransactions } from './recent-transactions';
import { PreviewReleaseCatalog } from './release-catalog';
import { PreviewReportBug } from './report-bug';
import { PreviewRollerShades } from './roller-shades';
import { PreviewSavingsProgress } from './savings-progress';
import { PreviewSavingsTargets } from './savings-targets';
import { PreviewShippingAddress } from './shipping-address';
import { PreviewShortcuts } from './shortcuts';
import { PreviewSidebarNav } from './sidebar-nav';
import { PreviewSkeletonLoading } from './skeleton-loading';
import { PreviewSleepReport } from './sleep-report';
import { PreviewSocialLinks } from './social-links';
import { PreviewStockPerformance } from './stock-performance';
import { PreviewStyleOverview } from './style-overview';
import { PreviewSyncingState } from './syncing-state';
import { PreviewTransferFunds } from './transfer-funds';
import { PreviewTypographySpecimen } from './typography-specimen';
import { PreviewUiElements } from './ui-elements';
import { PreviewUpcomingPayments } from './upcoming-payments';
import { PreviewUsageCard } from './usage-card';
import { PreviewVisitors } from './visitors';
import { PreviewWeeklyFitnessSummary } from './weekly-fitness-summary';

/**
 * Every demo of shadcn's Create preview, made with our parts, in shadcn's
 * order (registry blocks preview-02, then preview), in three columns at most:
 * one, two or three as the frame fits, every card at a column's width.
 */
@Component({
  selector: 'app-preview-cards',
  imports: [
    PreviewStyleOverview,
    PreviewTypographySpecimen,
    PreviewCodespacesCard,
    PreviewInvoice,
    PreviewIconPreviewGrid,
    PreviewUiElements,
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
    PreviewAnalyticsCard,
    PreviewUsageCard,
    PreviewShortcuts,
    PreviewAnomalyAlert,
    PreviewLiveWaveform,
    PreviewVisitors,
    PreviewContributionsActivity,
    PreviewNotFound,
    PreviewAccountAccess,
    PreviewClaimableBalance,
    PreviewContributionHistory,
    PreviewDividendIncome,
    HomeEmptyDistributeTrack,
    HomeNewMilestone,
    PreviewNotificationSettings,
    PreviewPayments,
    PreviewPayoutThreshold,
    PreviewPowerUsage,
    PreviewQrConnect,
    PreviewSavingsTargets,
    PreviewSidebarNav,
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
    <!-- Three columns at most, as many as the frame (not the window) fits:
      each card whole, in the order shadcn's Create shows them. -->
    <div
      class="columns-1 gap-6 *:mb-6 *:break-inside-avoid @3xl:columns-2 @6xl:columns-3"
    >
      <app-preview-contribution-history />
      <app-home-empty-distribute-track />
      <app-preview-qr-connect />
      <app-preview-dividend-income />
      <app-preview-index-investing />
      <app-preview-syncing-state />
      <app-preview-payout-threshold />
      <app-preview-claimable-balance />
      <app-preview-preferences />
      <app-preview-savings-progress />
      <app-preview-kitchen-island />
      <app-preview-savings-targets />
      <app-preview-recent-transactions />
      <app-preview-sidebar-nav />
      <app-preview-faq />
      <app-preview-payments />
      <app-preview-front-door />
      <app-preview-release-catalog />
      <app-preview-account-access />
      <app-preview-card-overview />
      <app-preview-transfer-funds />
      <app-preview-cover-art />
      <app-preview-loading-card />
      <app-preview-receiving-method />
      <app-preview-power-usage />
      <app-preview-empty-connect-bank />
      <app-preview-upcoming-payments />
      <app-preview-roller-shades />
      <app-preview-stock-performance />
      <app-preview-empty-explore-catalog />
      <app-home-new-milestone />
      <app-preview-social-links />
      <app-preview-notification-settings />
      <app-preview-style-overview />
      <app-preview-typography-specimen />
      <app-preview-codespaces-card />
      <app-preview-invoice />
      <app-preview-icon-preview-grid />
      <app-preview-ui-elements />
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
      <app-preview-analytics-card />
      <app-preview-usage-card />
      <app-preview-shortcuts />
      <app-preview-anomaly-alert />
      <app-preview-live-waveform />
      <app-preview-visitors />
      <app-preview-contributions-activity />
      <app-preview-not-found />
    </div>
  `,
  host: { class: '@container block' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCards {}
