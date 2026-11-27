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
      each card whole, in the order shadcn's Create shows them. Each card a
      deferred block: rendered at once (on immediate), and under SSR
      hydrated as it comes into view — all at once, the page's 281
      components took WebKit 57 s on CI, unusable meanwhile. -->
    <div
      class="columns-1 gap-6 *:mb-6 *:break-inside-avoid @3xl:columns-2 @6xl:columns-3"
    >
      @defer (on immediate; hydrate on viewport) {
        <app-preview-contribution-history />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-home-empty-distribute-track />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-qr-connect />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-dividend-income />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-index-investing />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-syncing-state />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-payout-threshold />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-claimable-balance />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-preferences />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-savings-progress />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-kitchen-island />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-savings-targets />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-recent-transactions />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-sidebar-nav />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-faq />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-payments />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-front-door />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-release-catalog />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-account-access />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-card-overview />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-transfer-funds />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-cover-art />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-loading-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-receiving-method />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-power-usage />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-empty-connect-bank />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-upcoming-payments />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-roller-shades />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-stock-performance />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-empty-explore-catalog />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-home-new-milestone />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-social-links />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-notification-settings />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-style-overview />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-typography-specimen />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-codespaces-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-invoice />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-icon-preview-grid />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-ui-elements />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-observability-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-shipping-address />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-environment-variables />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-bar-chart-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-invite-team />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-activate-agent-dialog />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-skeleton-loading />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-pie-chart-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-no-team-members />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-report-bug />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-contributors />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-feedback-form />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-book-appointment />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-sleep-report />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-github-profile />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-weekly-fitness-summary />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-file-upload />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-analytics-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-usage-card />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-shortcuts />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-anomaly-alert />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-live-waveform />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-visitors />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-contributions-activity />
      }
      @defer (on immediate; hydrate on viewport) {
        <app-preview-not-found />
      }
    </div>
  `,
  host: { class: '@container block' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCards {}
