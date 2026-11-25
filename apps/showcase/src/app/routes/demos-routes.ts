import { Route } from '@angular/router';

export const demosRoutes: Route[] = [
  {
    path: 'demos/ai-elements',
    children: [
      {
        path: 'tool-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/tool/demos/tool-usage-demo').then(
            (m) => m.ToolUsageDemo,
          ),
      },
      {
        path: 'states-tool-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/tool/demos/states-tool-demo').then(
            (m) => m.StatesToolDemo,
          ),
      },
      {
        path: 'sheet-tool-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/tool/demos/sheet-tool-demo').then(
            (m) => m.SheetToolDemo,
          ),
      },
      {
        path: 'rtl-tool-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/tool/demos/rtl-tool-demo').then(
            (m) => m.RtlToolDemo,
          ),
      },
      {
        path: 'test-results-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/test-results/demos/test-results-usage-demo').then(
            (m) => m.TestResultsUsageDemo,
          ),
      },
      {
        path: 'suites-test-results-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/test-results/demos/suites-test-results-demo').then(
            (m) => m.SuitesTestResultsDemo,
          ),
      },
      {
        path: 'rtl-test-results-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/test-results/demos/rtl-test-results-demo').then(
            (m) => m.RtlTestResultsDemo,
          ),
      },
      {
        path: 'terminal-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/terminal/demos/terminal-usage-demo').then(
            (m) => m.TerminalUsageDemo,
          ),
      },
      {
        path: 'exit-code-terminal-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/terminal/demos/exit-code-terminal-demo').then(
            (m) => m.ExitCodeTerminalDemo,
          ),
      },
      {
        path: 'rtl-terminal-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/terminal/demos/rtl-terminal-demo').then(
            (m) => m.RtlTerminalDemo,
          ),
      },
      {
        path: 'task-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/task/demos/task-usage-demo').then(
            (m) => m.TaskUsageDemo,
          ),
      },
      {
        path: 'steps-task-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/task/demos/steps-task-demo').then(
            (m) => m.StepsTaskDemo,
          ),
      },
      {
        path: 'rtl-task-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/task/demos/rtl-task-demo').then(
            (m) => m.RtlTaskDemo,
          ),
      },
      {
        path: 'suggestion-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/suggestion/demos/suggestion-usage-demo').then(
            (m) => m.SuggestionUsageDemo,
          ),
      },
      {
        path: 'rtl-suggestion-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/suggestion/demos/rtl-suggestion-demo').then(
            (m) => m.RtlSuggestionDemo,
          ),
      },
      {
        path: 'subagent-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/subagent/demos/subagent-usage-demo').then(
            (m) => m.SubagentUsageDemo,
          ),
      },
      {
        path: 'running-subagent-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/subagent/demos/running-subagent-demo').then(
            (m) => m.RunningSubagentDemo,
          ),
      },
      {
        path: 'details-subagent-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/subagent/demos/details-subagent-demo').then(
            (m) => m.DetailsSubagentDemo,
          ),
      },
      {
        path: 'rtl-subagent-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/subagent/demos/rtl-subagent-demo').then(
            (m) => m.RtlSubagentDemo,
          ),
      },
      {
        path: 'stack-trace-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/stack-trace/demos/stack-trace-usage-demo').then(
            (m) => m.StackTraceUsageDemo,
          ),
      },
      {
        path: 'muted-frames-stack-trace-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/stack-trace/demos/muted-frames-stack-trace-demo').then(
            (m) => m.MutedFramesStackTraceDemo,
          ),
      },
      {
        path: 'rtl-stack-trace-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/stack-trace/demos/rtl-stack-trace-demo').then(
            (m) => m.RtlStackTraceDemo,
          ),
      },
      {
        path: 'sources-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/sources/demos/sources-usage-demo').then(
            (m) => m.SourcesUsageDemo,
          ),
      },
      {
        path: 'rtl-sources-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/sources/demos/rtl-sources-demo').then(
            (m) => m.RtlSourcesDemo,
          ),
      },
      {
        path: 'queue-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/queue/demos/queue-usage-demo').then(
            (m) => m.QueueUsageDemo,
          ),
      },
      {
        path: 'descriptions-queue-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/queue/demos/descriptions-queue-demo').then(
            (m) => m.DescriptionsQueueDemo,
          ),
      },
      {
        path: 'rtl-queue-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/queue/demos/rtl-queue-demo').then(
            (m) => m.RtlQueueDemo,
          ),
      },
      {
        path: 'prompt-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/prompt-input/demos/prompt-input-usage-demo').then(
            (m) => m.PromptInputUsageDemo,
          ),
      },
      {
        path: 'rtl-prompt-input-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/prompt-input/demos/rtl-prompt-input-demo').then(
            (m) => m.RtlPromptInputDemo,
          ),
      },
      {
        path: 'plan-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/plan/demos/plan-usage-demo').then(
            (m) => m.PlanUsageDemo,
          ),
      },
      {
        path: 'details-plan-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/plan/demos/details-plan-demo').then(
            (m) => m.DetailsPlanDemo,
          ),
      },
      {
        path: 'rtl-plan-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/plan/demos/rtl-plan-demo').then(
            (m) => m.RtlPlanDemo,
          ),
      },
      {
        path: 'model-selector-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/model-selector/demos/model-selector-usage-demo').then(
            (m) => m.ModelSelectorUsageDemo,
          ),
      },
      {
        path: 'rtl-model-selector-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/model-selector/demos/rtl-model-selector-demo').then(
            (m) => m.RtlModelSelectorDemo,
          ),
      },
      {
        path: 'message-pattern-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/message/demos/message-pattern-usage-demo').then(
            (m) => m.MessagePatternUsageDemo,
          ),
      },
      {
        path: 'rtl-message-pattern-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/message/demos/rtl-message-pattern-demo').then(
            (m) => m.RtlMessagePatternDemo,
          ),
      },
      {
        path: 'inline-citation-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/inline-citation/demos/inline-citation-usage-demo').then(
            (m) => m.InlineCitationUsageDemo,
          ),
      },
      {
        path: 'rtl-inline-citation-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/inline-citation/demos/rtl-inline-citation-demo').then(
            (m) => m.RtlInlineCitationDemo,
          ),
      },
      {
        path: 'file-tree-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/file-tree/demos/file-tree-usage-demo').then(
            (m) => m.FileTreeUsageDemo,
          ),
      },
      {
        path: 'rtl-file-tree-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/file-tree/demos/rtl-file-tree-demo').then(
            (m) => m.RtlFileTreeDemo,
          ),
      },
      {
        path: 'context-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/context/demos/context-usage-demo').then(
            (m) => m.ContextUsageDemo,
          ),
      },
      {
        path: 'rtl-context-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/context/demos/rtl-context-demo').then(
            (m) => m.RtlContextDemo,
          ),
      },
      {
        path: 'confirmation-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/confirmation/demos/confirmation-usage-demo').then(
            (m) => m.ConfirmationUsageDemo,
          ),
      },
      {
        path: 'rtl-confirmation-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/confirmation/demos/rtl-confirmation-demo').then(
            (m) => m.RtlConfirmationDemo,
          ),
      },
      {
        path: 'checkpoint-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/checkpoint/demos/checkpoint-usage-demo').then(
            (m) => m.CheckpointUsageDemo,
          ),
      },
      {
        path: 'rtl-checkpoint-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/checkpoint/demos/rtl-checkpoint-demo').then(
            (m) => m.RtlCheckpointDemo,
          ),
      },
      {
        path: 'chat-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chat/demos/chat-usage-demo').then(
            (m) => m.ChatUsageDemo,
          ),
      },
      {
        path: 'rtl-chat-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chat/demos/rtl-chat-demo').then(
            (m) => m.RtlChatDemo,
          ),
      },
      {
        path: 'chain-of-thought-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chain-of-thought/demos/chain-of-thought-usage-demo').then(
            (m) => m.ChainOfThoughtUsageDemo,
          ),
      },
      {
        path: 'steps-chain-of-thought-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chain-of-thought/demos/steps-chain-of-thought-demo').then(
            (m) => m.StepsChainOfThoughtDemo,
          ),
      },
      {
        path: 'search-results-chain-of-thought-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chain-of-thought/demos/search-results-chain-of-thought-demo').then(
            (m) => m.SearchResultsChainOfThoughtDemo,
          ),
      },
      {
        path: 'rtl-chain-of-thought-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chain-of-thought/demos/rtl-chain-of-thought-demo').then(
            (m) => m.RtlChainOfThoughtDemo,
          ),
      },
      {
        path: 'reasoning-usage-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/demos/reasoning-usage-demo').then(
            (m) => m.ReasoningUsageDemo,
          ),
      },
      {
        path: 'duration-reasoning-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/demos/duration-reasoning-demo').then(
            (m) => m.DurationReasoningDemo,
          ),
      },
      {
        path: 'parts-reasoning-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/demos/parts-reasoning-demo').then(
            (m) => m.PartsReasoningDemo,
          ),
      },
      {
        path: 'rtl-reasoning-demo',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/demos/rtl-reasoning-demo').then(
            (m) => m.RtlReasoningDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/accordion',
    children: [
      {
        path: 'accordion-usage-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/accordion-usage-demo').then(
            (m) => m.AccordionUsageDemo,
          ),
      },
      {
        path: 'basic-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/basic-accordion-demo').then(
            (m) => m.BasicAccordionDemo,
          ),
      },
      {
        path: 'multiple-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/multiple-accordion-demo').then(
            (m) => m.MultipleAccordionDemo,
          ),
      },
      {
        path: 'disabled-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/disabled-accordion-demo').then(
            (m) => m.DisabledAccordionDemo,
          ),
      },
      {
        path: 'borders-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/borders-accordion-demo').then(
            (m) => m.BordersAccordionDemo,
          ),
      },
      {
        path: 'card-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/card-accordion-demo').then(
            (m) => m.CardAccordionDemo,
          ),
      },
      {
        path: 'rtl-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/rtl-accordion-demo').then(
            (m) => m.RtlAccordionDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/alert',
    children: [
      {
        path: 'alert-usage-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/alert-usage-demo').then(
            (m) => m.AlertUsageDemo,
          ),
      },
      {
        path: 'basic-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/basic-alert-demo').then(
            (m) => m.BasicAlertDemo,
          ),
      },
      {
        path: 'destructive-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/destructive-alert-demo').then(
            (m) => m.DestructiveAlertDemo,
          ),
      },
      {
        path: 'status-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/status-alert-demo').then(
            (m) => m.StatusAlertDemo,
          ),
      },
      {
        path: 'action-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/action-alert-demo').then(
            (m) => m.ActionAlertDemo,
          ),
      },
      {
        path: 'colors-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/colors-alert-demo').then(
            (m) => m.ColorsAlertDemo,
          ),
      },
      {
        path: 'announced-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/announced-alert-demo').then(
            (m) => m.AnnouncedAlertDemo,
          ),
      },
      {
        path: 'rtl-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/rtl-alert-demo').then(
            (m) => m.RtlAlertDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/alert-dialog',
    children: [
      {
        path: 'alert-dialog-usage-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/alert-dialog-usage-demo').then(
            (m) => m.AlertDialogUsageDemo,
          ),
      },
      {
        path: 'basic-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/basic-alert-dialog-demo').then(
            (m) => m.BasicAlertDialogDemo,
          ),
      },
      {
        path: 'small-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/small-alert-dialog-demo').then(
            (m) => m.SmallAlertDialogDemo,
          ),
      },
      {
        path: 'media-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/media-alert-dialog-demo').then(
            (m) => m.MediaAlertDialogDemo,
          ),
      },
      {
        path: 'small-media-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/small-media-alert-dialog-demo').then(
            (m) => m.SmallMediaAlertDialogDemo,
          ),
      },
      {
        path: 'destructive-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/destructive-alert-dialog-demo').then(
            (m) => m.DestructiveAlertDialogDemo,
          ),
      },
      {
        path: 'rtl-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/rtl-alert-dialog-demo').then(
            (m) => m.RtlAlertDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/number-ticker',
    children: [
      {
        path: 'number-ticker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/number-ticker-usage-demo').then(
            (m) => m.NumberTickerUsageDemo,
          ),
      },
      {
        path: 'chart-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/chart-number-ticker-demo').then(
            (m) => m.ChartNumberTickerDemo,
          ),
      },
      {
        path: 'rtl-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/rtl-number-ticker-demo').then(
            (m) => m.RtlNumberTickerDemo,
          ),
      },
      {
        path: 'roll-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/roll-number-ticker-demo').then(
            (m) => m.RollNumberTickerDemo,
          ),
      },
      {
        path: 'formats-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/formats-number-ticker-demo').then(
            (m) => m.FormatsNumberTickerDemo,
          ),
      },
      {
        path: 'visible-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/visible-number-ticker-demo').then(
            (m) => m.VisibleNumberTickerDemo,
          ),
      },
      {
        path: 'card-number-ticker-demo',
        loadComponent: () =>
          import('../pages/docs/number-ticker/demos/card-number-ticker-demo').then(
            (m) => m.CardNumberTickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/aspect-ratio',
    children: [
      {
        path: 'aspect-ratio-usage-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/aspect-ratio-usage-demo').then(
            (m) => m.AspectRatioUsageDemo,
          ),
      },
      {
        path: 'square-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/square-aspect-ratio-demo').then(
            (m) => m.SquareAspectRatioDemo,
          ),
      },
      {
        path: 'portrait-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/portrait-aspect-ratio-demo').then(
            (m) => m.PortraitAspectRatioDemo,
          ),
      },
      {
        path: 'video-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/video-aspect-ratio-demo').then(
            (m) => m.VideoAspectRatioDemo,
          ),
      },
      {
        path: 'responsive-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/responsive-aspect-ratio-demo').then(
            (m) => m.ResponsiveAspectRatioDemo,
          ),
      },
      {
        path: 'rtl-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/rtl-aspect-ratio-demo').then(
            (m) => m.RtlAspectRatioDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/avatar',
    children: [
      {
        path: 'avatar-usage-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/avatar-usage-demo').then(
            (m) => m.AvatarUsageDemo,
          ),
      },
      {
        path: 'basic-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/basic-avatar-demo').then(
            (m) => m.BasicAvatarDemo,
          ),
      },
      {
        path: 'fallback-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/fallback-avatar-demo').then(
            (m) => m.FallbackAvatarDemo,
          ),
      },
      {
        path: 'badge-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/badge-avatar-demo').then(
            (m) => m.BadgeAvatarDemo,
          ),
      },
      {
        path: 'badge-icon-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/badge-icon-avatar-demo').then(
            (m) => m.BadgeIconAvatarDemo,
          ),
      },
      {
        path: 'group-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/group-avatar-demo').then(
            (m) => m.GroupAvatarDemo,
          ),
      },
      {
        path: 'group-count-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/group-count-avatar-demo').then(
            (m) => m.GroupCountAvatarDemo,
          ),
      },
      {
        path: 'group-icon-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/group-icon-avatar-demo').then(
            (m) => m.GroupIconAvatarDemo,
          ),
      },
      {
        path: 'sizes-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/sizes-avatar-demo').then(
            (m) => m.SizesAvatarDemo,
          ),
      },
      {
        path: 'dropdown-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/dropdown-avatar-demo').then(
            (m) => m.DropdownAvatarDemo,
          ),
      },
      {
        path: 'rtl-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/rtl-avatar-demo').then(
            (m) => m.RtlAvatarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/badge',
    children: [
      {
        path: 'badge-usage-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/badge-usage-demo').then(
            (m) => m.BadgeUsageDemo,
          ),
      },
      {
        path: 'variants-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/variants-badge-demo').then(
            (m) => m.VariantsBadgeDemo,
          ),
      },
      {
        path: 'icon-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/icon-badge-demo').then(
            (m) => m.IconBadgeDemo,
          ),
      },
      {
        path: 'spinner-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/spinner-badge-demo').then(
            (m) => m.SpinnerBadgeDemo,
          ),
      },
      {
        path: 'link-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/link-badge-demo').then(
            (m) => m.LinkBadgeDemo,
          ),
      },
      {
        path: 'colors-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/colors-badge-demo').then(
            (m) => m.ColorsBadgeDemo,
          ),
      },
      {
        path: 'rtl-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/rtl-badge-demo').then(
            (m) => m.RtlBadgeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/barcode-scanner',
    children: [
      {
        path: 'barcode-scanner-usage-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/barcode-scanner-usage-demo').then(
            (m) => m.BarcodeScannerUsageDemo,
          ),
      },
      {
        path: 'once-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/once-barcode-scanner-demo').then(
            (m) => m.OnceBarcodeScannerDemo,
          ),
      },
      {
        path: 'formats-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/formats-barcode-scanner-demo').then(
            (m) => m.FormatsBarcodeScannerDemo,
          ),
      },
      {
        path: 'picture-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/picture-barcode-scanner-demo').then(
            (m) => m.PictureBarcodeScannerDemo,
          ),
      },
      {
        path: 'rtl-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/rtl-barcode-scanner-demo').then(
            (m) => m.RtlBarcodeScannerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/breadcrumb',
    children: [
      {
        path: 'breadcrumb-usage-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/breadcrumb-usage-demo').then(
            (m) => m.BreadcrumbUsageDemo,
          ),
      },
      {
        path: 'basic-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/basic-breadcrumb-demo').then(
            (m) => m.BasicBreadcrumbDemo,
          ),
      },
      {
        path: 'separator-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/separator-breadcrumb-demo').then(
            (m) => m.SeparatorBreadcrumbDemo,
          ),
      },
      {
        path: 'dropdown-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/dropdown-breadcrumb-demo').then(
            (m) => m.DropdownBreadcrumbDemo,
          ),
      },
      {
        path: 'ellipsis-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/ellipsis-breadcrumb-demo').then(
            (m) => m.EllipsisBreadcrumbDemo,
          ),
      },
      {
        path: 'ellipsis-menu-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/ellipsis-menu-breadcrumb-demo').then(
            (m) => m.EllipsisMenuBreadcrumbDemo,
          ),
      },
      {
        path: 'link-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/link-breadcrumb-demo').then(
            (m) => m.LinkBreadcrumbDemo,
          ),
      },
      {
        path: 'rtl-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/rtl-breadcrumb-demo').then(
            (m) => m.RtlBreadcrumbDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/button',
    children: [
      {
        path: 'button-usage-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/button-usage-demo').then(
            (m) => m.ButtonUsageDemo,
          ),
      },
      {
        path: 'size-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/size-button-demo').then(
            (m) => m.SizeButtonDemo,
          ),
      },
      {
        path: 'default-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/default-button-demo').then(
            (m) => m.DefaultButtonDemo,
          ),
      },
      {
        path: 'outline-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/outline-button-demo').then(
            (m) => m.OutlineButtonDemo,
          ),
      },
      {
        path: 'secondary-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/secondary-button-demo').then(
            (m) => m.SecondaryButtonDemo,
          ),
      },
      {
        path: 'ghost-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/ghost-button-demo').then(
            (m) => m.GhostButtonDemo,
          ),
      },
      {
        path: 'destructive-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/destructive-button-demo').then(
            (m) => m.DestructiveButtonDemo,
          ),
      },
      {
        path: 'link-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/link-button-demo').then(
            (m) => m.LinkButtonDemo,
          ),
      },
      {
        path: 'icon-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/icon-button-demo').then(
            (m) => m.IconButtonDemo,
          ),
      },
      {
        path: 'with-icon-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/with-icon-button-demo').then(
            (m) => m.WithIconButtonDemo,
          ),
      },
      {
        path: 'rounded-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/rounded-button-demo').then(
            (m) => m.RoundedButtonDemo,
          ),
      },
      {
        path: 'spinner-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/spinner-button-demo').then(
            (m) => m.SpinnerButtonDemo,
          ),
      },
      {
        path: 'group-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/group-button-demo').then(
            (m) => m.GroupButtonDemo,
          ),
      },
      {
        path: 'vertical-group-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/vertical-group-button-demo').then(
            (m) => m.VerticalGroupButtonDemo,
          ),
      },
      {
        path: 'group-size-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/group-size-button-demo').then(
            (m) => m.GroupSizeButtonDemo,
          ),
      },
      {
        path: 'group-separator-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/group-separator-button-demo').then(
            (m) => m.GroupSeparatorButtonDemo,
          ),
      },
      {
        path: 'split-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/split-button-demo').then(
            (m) => m.SplitButtonDemo,
          ),
      },
      {
        path: 'group-menu-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/group-menu-button-demo').then(
            (m) => m.GroupMenuButtonDemo,
          ),
      },
      {
        path: 'group-popover-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/group-popover-button-demo').then(
            (m) => m.GroupPopoverButtonDemo,
          ),
      },
      {
        path: 'as-link-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/as-link-button-demo').then(
            (m) => m.AsLinkButtonDemo,
          ),
      },
      {
        path: 'disabled-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/disabled-button-demo').then(
            (m) => m.DisabledButtonDemo,
          ),
      },
      {
        path: 'submit-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/submit-button-demo').then(
            (m) => m.SubmitButtonDemo,
          ),
      },
      {
        path: 'rtl-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/rtl-button-demo').then(
            (m) => m.RtlButtonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/calendar',
    children: [
      {
        path: 'single-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/single-calendar-demo').then(
            (m) => m.SingleCalendarDemo,
          ),
      },
      {
        path: 'range-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/range-calendar-demo').then(
            (m) => m.RangeCalendarDemo,
          ),
      },
      {
        path: 'multiple-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/multiple-calendar-demo').then(
            (m) => m.MultipleCalendarDemo,
          ),
      },
      {
        path: 'constraints-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/constraints-calendar-demo').then(
            (m) => m.ConstraintsCalendarDemo,
          ),
      },
      {
        path: 'form-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/form-calendar-demo').then(
            (m) => m.FormCalendarDemo,
          ),
      },
      {
        path: 'custom-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/custom-calendar-demo').then(
            (m) => m.CustomCalendarDemo,
          ),
      },
      {
        path: 'locale-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/locale-calendar-demo').then(
            (m) => m.LocaleCalendarDemo,
          ),
      },
      {
        path: 'outside-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/outside-calendar-demo').then(
            (m) => m.OutsideCalendarDemo,
          ),
      },
      {
        path: 'calendar-usage-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/calendar-usage-demo').then(
            (m) => m.CalendarUsageDemo,
          ),
      },
      {
        path: 'basic-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/basic-calendar-demo').then(
            (m) => m.BasicCalendarDemo,
          ),
      },
      {
        path: 'booked-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/booked-calendar-demo').then(
            (m) => m.BookedCalendarDemo,
          ),
      },
      {
        path: 'months-years-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/months-years-calendar-demo').then(
            (m) => m.MonthsYearsCalendarDemo,
          ),
      },
      {
        path: 'custom-days-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/custom-days-calendar-demo').then(
            (m) => m.CustomDaysCalendarDemo,
          ),
      },
      {
        path: 'presets-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/presets-calendar-demo').then(
            (m) => m.PresetsCalendarDemo,
          ),
      },
      {
        path: 'time-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/time-calendar-demo').then(
            (m) => m.TimeCalendarDemo,
          ),
      },
      {
        path: 'week-numbers-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/week-numbers-calendar-demo').then(
            (m) => m.WeekNumbersCalendarDemo,
          ),
      },
      {
        path: 'rtl-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/rtl-calendar-demo').then(
            (m) => m.RtlCalendarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/card',
    children: [
      {
        path: 'card-usage-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/card-usage-demo').then(
            (m) => m.CardUsageDemo,
          ),
      },
      {
        path: 'size-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/size-card-demo').then(
            (m) => m.SizeCardDemo,
          ),
      },
      {
        path: 'spacing-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/spacing-card-demo').then(
            (m) => m.SpacingCardDemo,
          ),
      },
      {
        path: 'edge-to-edge-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/edge-to-edge-card-demo').then(
            (m) => m.EdgeToEdgeCardDemo,
          ),
      },
      {
        path: 'image-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/image-card-demo').then(
            (m) => m.ImageCardDemo,
          ),
      },
      {
        path: 'rtl-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/rtl-card-demo').then(
            (m) => m.RtlCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/carousel',
    children: [
      {
        path: 'align-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/align-carousel-demo').then(
            (m) => m.AlignCarouselDemo,
          ),
      },
      {
        path: 'pages-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/pages-carousel-demo').then(
            (m) => m.PagesCarouselDemo,
          ),
      },
      {
        path: 'thumbnails-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/thumbnails-carousel-demo').then(
            (m) => m.ThumbnailsCarouselDemo,
          ),
      },
      {
        path: 'drag-free-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/drag-free-carousel-demo').then(
            (m) => m.DragFreeCarouselDemo,
          ),
      },
      {
        path: 'progress-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/progress-carousel-demo').then(
            (m) => m.ProgressCarouselDemo,
          ),
      },
      {
        path: 'controlled-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/controlled-carousel-demo').then(
            (m) => m.ControlledCarouselDemo,
          ),
      },
      {
        path: 'carousel-usage-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/carousel-usage-demo').then(
            (m) => m.CarouselUsageDemo,
          ),
      },
      {
        path: 'sizes-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/sizes-carousel-demo').then(
            (m) => m.SizesCarouselDemo,
          ),
      },
      {
        path: 'spacing-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/spacing-carousel-demo').then(
            (m) => m.SpacingCarouselDemo,
          ),
      },
      {
        path: 'orientation-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/orientation-carousel-demo').then(
            (m) => m.OrientationCarouselDemo,
          ),
      },
      {
        path: 'api-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/api-carousel-demo').then(
            (m) => m.ApiCarouselDemo,
          ),
      },
      {
        path: 'indicators-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/indicators-carousel-demo').then(
            (m) => m.IndicatorsCarouselDemo,
          ),
      },
      {
        path: 'plugin-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/plugin-carousel-demo').then(
            (m) => m.PluginCarouselDemo,
          ),
      },
      {
        path: 'multiple-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/multiple-carousel-demo').then(
            (m) => m.MultipleCarouselDemo,
          ),
      },
      {
        path: 'images-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/images-carousel-demo').then(
            (m) => m.ImagesCarouselDemo,
          ),
      },
      {
        path: 'rtl-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/rtl-carousel-demo').then(
            (m) => m.RtlCarouselDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/area-chart',
    children: [
      {
        path: 'area-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/area-chart-usage-demo').then(
            (m) => m.AreaChartUsageDemo,
          ),
      },
      {
        path: 'area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/area-chart-demo').then(
            (m) => m.AreaChartDemo,
          ),
      },
      {
        path: 'stacked-area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/stacked-area-chart-demo').then(
            (m) => m.StackedAreaChartDemo,
          ),
      },
      {
        path: 'expanded-area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/expanded-area-chart-demo').then(
            (m) => m.ExpandedAreaChartDemo,
          ),
      },
      {
        path: 'interactive-area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/interactive-area-chart-demo').then(
            (m) => m.InteractiveAreaChartDemo,
          ),
      },
      {
        path: 'rtl-area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/area-chart/demos/rtl-area-chart-demo').then(
            (m) => m.RtlAreaChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/bar-chart',
    children: [
      {
        path: 'bar-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/bar-chart-usage-demo').then(
            (m) => m.BarChartUsageDemo,
          ),
      },
      {
        path: 'bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/bar-chart-demo').then(
            (m) => m.BarChartDemo,
          ),
      },
      {
        path: 'multiple-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/multiple-bar-chart-demo').then(
            (m) => m.MultipleBarChartDemo,
          ),
      },
      {
        path: 'stacked-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/stacked-bar-chart-demo').then(
            (m) => m.StackedBarChartDemo,
          ),
      },
      {
        path: 'negative-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/negative-bar-chart-demo').then(
            (m) => m.NegativeBarChartDemo,
          ),
      },
      {
        path: 'horizontal-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/horizontal-bar-chart-demo').then(
            (m) => m.HorizontalBarChartDemo,
          ),
      },
      {
        path: 'label-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/label-bar-chart-demo').then(
            (m) => m.LabelBarChartDemo,
          ),
      },
      {
        path: 'custom-label-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/custom-label-bar-chart-demo').then(
            (m) => m.CustomLabelBarChartDemo,
          ),
      },
      {
        path: 'rtl-bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/bar-chart/demos/rtl-bar-chart-demo').then(
            (m) => m.RtlBarChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/lightbox',
    children: [
      {
        path: 'lightbox-usage-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/lightbox-usage-demo').then(
            (m) => m.LightboxUsageDemo,
          ),
      },
      {
        path: 'article-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/article-lightbox-demo').then(
            (m) => m.ArticleLightboxDemo,
          ),
      },
      {
        path: 'rtl-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/rtl-lightbox-demo').then(
            (m) => m.RtlLightboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/line-chart',
    children: [
      {
        path: 'line-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/line-chart-usage-demo').then(
            (m) => m.LineChartUsageDemo,
          ),
      },
      {
        path: 'line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/line-chart-demo').then(
            (m) => m.LineChartDemo,
          ),
      },
      {
        path: 'multiple-line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/multiple-line-chart-demo').then(
            (m) => m.MultipleLineChartDemo,
          ),
      },
      {
        path: 'step-line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/step-line-chart-demo').then(
            (m) => m.StepLineChartDemo,
          ),
      },
      {
        path: 'label-line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/label-line-chart-demo').then(
            (m) => m.LabelLineChartDemo,
          ),
      },
      {
        path: 'rtl-line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/line-chart/demos/rtl-line-chart-demo').then(
            (m) => m.RtlLineChartDemo,
          ),
      },
    ],
  },

  {
    path: 'demos/chart',
    children: [
      {
        path: 'chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/chart-usage-demo').then(
            (m) => m.ChartUsageDemo,
          ),
      },
      {
        path: 'tooltip-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/tooltip-chart-demo').then(
            (m) => m.TooltipChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/checkbox',
    children: [
      {
        path: 'checkbox-usage-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/checkbox-usage-demo').then(
            (m) => m.CheckboxUsageDemo,
          ),
      },
      {
        path: 'description-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/description-checkbox-demo').then(
            (m) => m.DescriptionCheckboxDemo,
          ),
      },
      {
        path: 'group-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/group-checkbox-demo').then(
            (m) => m.GroupCheckboxDemo,
          ),
      },
      {
        path: 'disabled-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/disabled-checkbox-demo').then(
            (m) => m.DisabledCheckboxDemo,
          ),
      },
      {
        path: 'invalid-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/invalid-checkbox-demo').then(
            (m) => m.InvalidCheckboxDemo,
          ),
      },
      {
        path: 'table-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/table-checkbox-demo').then(
            (m) => m.TableCheckboxDemo,
          ),
      },
      {
        path: 'indeterminate-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/indeterminate-checkbox-demo').then(
            (m) => m.IndeterminateCheckboxDemo,
          ),
      },
      {
        path: 'signal-forms-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/signal-forms-checkbox-demo').then(
            (m) => m.SignalFormsCheckboxDemo,
          ),
      },
      {
        path: 'form-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/form-checkbox-demo').then(
            (m) => m.FormCheckboxDemo,
          ),
      },
      {
        path: 'custom-theme-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/custom-theme-checkbox-demo').then(
            (m) => m.CustomThemeCheckboxDemo,
          ),
      },
      {
        path: 'custom-mark-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/custom-mark-checkbox-demo').then(
            (m) => m.CustomMarkCheckboxDemo,
          ),
      },
      {
        path: 'rtl-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/rtl-checkbox-demo').then(
            (m) => m.RtlCheckboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/code-block',
    children: [
      {
        path: 'code-block-usage-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/code-block-usage-demo').then(
            (m) => m.CodeBlockUsageDemo,
          ),
      },
      {
        path: 'basic-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/basic-code-block-demo').then(
            (m) => m.BasicCodeBlockDemo,
          ),
      },
      {
        path: 'header-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/header-code-block-demo').then(
            (m) => m.HeaderCodeBlockDemo,
          ),
      },
      {
        path: 'actions-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/actions-code-block-demo').then(
            (m) => m.ActionsCodeBlockDemo,
          ),
      },
      {
        path: 'floating-actions-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/floating-actions-code-block-demo').then(
            (m) => m.FloatingActionsCodeBlockDemo,
          ),
      },
      {
        path: 'line-numbers-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/line-numbers-code-block-demo').then(
            (m) => m.LineNumbersCodeBlockDemo,
          ),
      },
      {
        path: 'start-line-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/start-line-code-block-demo').then(
            (m) => m.StartLineCodeBlockDemo,
          ),
      },
      {
        path: 'wrap-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/wrap-code-block-demo').then(
            (m) => m.WrapCodeBlockDemo,
          ),
      },
      {
        path: 'highlighted-lines-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/highlighted-lines-code-block-demo').then(
            (m) => m.HighlightedLinesCodeBlockDemo,
          ),
      },
      {
        path: 'diff-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/diff-code-block-demo').then(
            (m) => m.DiffCodeBlockDemo,
          ),
      },
      {
        path: 'height-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/height-code-block-demo').then(
            (m) => m.HeightCodeBlockDemo,
          ),
      },
      {
        path: 'show-more-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/show-more-code-block-demo').then(
            (m) => m.ShowMoreCodeBlockDemo,
          ),
      },
      {
        path: 'size-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/size-code-block-demo').then(
            (m) => m.SizeCodeBlockDemo,
          ),
      },
      {
        path: 'destructive-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/destructive-code-block-demo').then(
            (m) => m.DestructiveCodeBlockDemo,
          ),
      },
      {
        path: 'tabs-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/tabs-code-block-demo').then(
            (m) => m.TabsCodeBlockDemo,
          ),
      },
      {
        path: 'languages-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/languages-code-block-demo').then(
            (m) => m.LanguagesCodeBlockDemo,
          ),
      },
      {
        path: 'terminal-output-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/terminal-output-code-block-demo').then(
            (m) => m.TerminalOutputCodeBlockDemo,
          ),
      },
      {
        path: 'rtl-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/rtl-code-block-demo').then(
            (m) => m.RtlCodeBlockDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/combobox',
    children: [
      {
        path: 'combobox-usage-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/combobox-usage-demo').then(
            (m) => m.ComboboxUsageDemo,
          ),
      },
      {
        path: 'multiple-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/multiple-combobox-demo').then(
            (m) => m.MultipleComboboxDemo,
          ),
      },
      {
        path: 'clear-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/clear-combobox-demo').then(
            (m) => m.ClearComboboxDemo,
          ),
      },
      {
        path: 'groups-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/groups-combobox-demo').then(
            (m) => m.GroupsComboboxDemo,
          ),
      },
      {
        path: 'custom-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/custom-combobox-demo').then(
            (m) => m.CustomComboboxDemo,
          ),
      },
      {
        path: 'invalid-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/invalid-combobox-demo').then(
            (m) => m.InvalidComboboxDemo,
          ),
      },
      {
        path: 'disabled-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/disabled-combobox-demo').then(
            (m) => m.DisabledComboboxDemo,
          ),
      },
      {
        path: 'auto-highlight-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/auto-highlight-combobox-demo').then(
            (m) => m.AutoHighlightComboboxDemo,
          ),
      },
      {
        path: 'popup-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/popup-combobox-demo').then(
            (m) => m.PopupComboboxDemo,
          ),
      },
      {
        path: 'input-group-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/input-group-combobox-demo').then(
            (m) => m.InputGroupComboboxDemo,
          ),
      },
      {
        path: 'form-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/form-combobox-demo').then(
            (m) => m.FormComboboxDemo,
          ),
      },
      {
        path: 'async-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/async-combobox-demo').then(
            (m) => m.AsyncComboboxDemo,
          ),
      },
      {
        path: 'rtl-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/rtl-combobox-demo').then(
            (m) => m.RtlComboboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/command',
    children: [
      {
        path: 'command-usage-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/command-usage-demo').then(
            (m) => m.CommandUsageDemo,
          ),
      },
      {
        path: 'basic-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/basic-command-demo').then(
            (m) => m.BasicCommandDemo,
          ),
      },
      {
        path: 'shortcuts-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/shortcuts-command-demo').then(
            (m) => m.ShortcutsCommandDemo,
          ),
      },
      {
        path: 'groups-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/groups-command-demo').then(
            (m) => m.GroupsCommandDemo,
          ),
      },
      {
        path: 'scrollable-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/scrollable-command-demo').then(
            (m) => m.ScrollableCommandDemo,
          ),
      },
      {
        path: 'dialog-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/dialog-command-demo').then(
            (m) => m.DialogCommandDemo,
          ),
      },
      {
        path: 'keywords-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/keywords-command-demo').then(
            (m) => m.KeywordsCommandDemo,
          ),
      },
      {
        path: 'async-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/async-command-demo').then(
            (m) => m.AsyncCommandDemo,
          ),
      },
      {
        path: 'pages-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/pages-command-demo').then(
            (m) => m.PagesCommandDemo,
          ),
      },
      {
        path: 'links-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/links-command-demo').then(
            (m) => m.LinksCommandDemo,
          ),
      },
      {
        path: 'rtl-command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/rtl-command-demo').then(
            (m) => m.RtlCommandDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/confetti',
    children: [
      {
        path: 'confetti-usage-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/confetti-usage-demo').then(
            (m) => m.ConfettiUsageDemo,
          ),
      },
      {
        path: 'element-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/element-confetti-demo').then(
            (m) => m.ElementConfettiDemo,
          ),
      },
      {
        path: 'sides-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/sides-confetti-demo').then(
            (m) => m.SidesConfettiDemo,
          ),
      },
      {
        path: 'fireworks-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/fireworks-confetti-demo').then(
            (m) => m.FireworksConfettiDemo,
          ),
      },
      {
        path: 'custom-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/custom-confetti-demo').then(
            (m) => m.CustomConfettiDemo,
          ),
      },
      {
        path: 'form-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/form-confetti-demo').then(
            (m) => m.FormConfettiDemo,
          ),
      },
      {
        path: 'event-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/event-confetti-demo').then(
            (m) => m.EventConfettiDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/context-menu',
    children: [
      {
        path: 'context-menu-usage-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/context-menu-usage-demo').then(
            (m) => m.ContextMenuUsageDemo,
          ),
      },
      {
        path: 'basic-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/basic-context-menu-demo').then(
            (m) => m.BasicContextMenuDemo,
          ),
      },
      {
        path: 'submenu-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/submenu-context-menu-demo').then(
            (m) => m.SubmenuContextMenuDemo,
          ),
      },
      {
        path: 'shortcuts-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/shortcuts-context-menu-demo').then(
            (m) => m.ShortcutsContextMenuDemo,
          ),
      },
      {
        path: 'groups-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/groups-context-menu-demo').then(
            (m) => m.GroupsContextMenuDemo,
          ),
      },
      {
        path: 'icons-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/icons-context-menu-demo').then(
            (m) => m.IconsContextMenuDemo,
          ),
      },
      {
        path: 'checkboxes-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/checkboxes-context-menu-demo').then(
            (m) => m.CheckboxesContextMenuDemo,
          ),
      },
      {
        path: 'radio-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/radio-context-menu-demo').then(
            (m) => m.RadioContextMenuDemo,
          ),
      },
      {
        path: 'destructive-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/destructive-context-menu-demo').then(
            (m) => m.DestructiveContextMenuDemo,
          ),
      },
      {
        path: 'sides-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/sides-context-menu-demo').then(
            (m) => m.SidesContextMenuDemo,
          ),
      },
      {
        path: 'rtl-context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/rtl-context-menu-demo').then(
            (m) => m.RtlContextMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/control-group',
    children: [
      {
        path: 'control-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/control-group-usage-demo').then(
            (m) => m.ControlGroupUsageDemo,
          ),
      },
      {
        path: 'nested-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/nested-control-group-demo').then(
            (m) => m.NestedControlGroupDemo,
          ),
      },
      {
        path: 'input-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/input-control-group-demo').then(
            (m) => m.InputControlGroupDemo,
          ),
      },
      {
        path: 'text-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/text-control-group-demo').then(
            (m) => m.TextControlGroupDemo,
          ),
      },
      {
        path: 'input-group-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/input-group-control-group-demo').then(
            (m) => m.InputGroupControlGroupDemo,
          ),
      },
      {
        path: 'select-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/select-control-group-demo').then(
            (m) => m.SelectControlGroupDemo,
          ),
      },
      {
        path: 'rtl-control-group-demo',
        loadComponent: () =>
          import('../pages/docs/control-group/demos/rtl-control-group-demo').then(
            (m) => m.RtlControlGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/data-table',
    children: [
      {
        path: 'data-table-usage-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/data-table-usage-demo').then(
            (m) => m.DataTableUsageDemo,
          ),
      },
      {
        path: 'featured-data-table-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/featured-data-table-demo').then(
            (m) => m.FeaturedDataTableDemo,
          ),
      },
      {
        path: 'payments-data-table-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/payments-data-table-demo').then(
            (m) => m.PaymentsDataTableDemo,
          ),
      },
      {
        path: 'pinned-data-table-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/pinned-data-table-demo').then(
            (m) => m.PinnedDataTableDemo,
          ),
      },
      {
        path: 'rtl-data-table-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/rtl-data-table-demo').then(
            (m) => m.RtlDataTableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-input',
    children: [
      {
        path: 'date-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/date-input-usage-demo').then(
            (m) => m.DateInputUsageDemo,
          ),
      },
      {
        path: 'limits-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/limits-date-input-demo').then(
            (m) => m.LimitsDateInputDemo,
          ),
      },
      {
        path: 'unavailable-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/unavailable-date-input-demo').then(
            (m) => m.UnavailableDateInputDemo,
          ),
      },
      {
        path: 'locale-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/locale-date-input-demo').then(
            (m) => m.LocaleDateInputDemo,
          ),
      },
      {
        path: 'disabled-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/disabled-date-input-demo').then(
            (m) => m.DisabledDateInputDemo,
          ),
      },
      {
        path: 'read-only-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/read-only-date-input-demo').then(
            (m) => m.ReadOnlyDateInputDemo,
          ),
      },
      {
        path: 'form-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/form-date-input-demo').then(
            (m) => m.FormDateInputDemo,
          ),
      },
      {
        path: 'controlled-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/controlled-date-input-demo').then(
            (m) => m.ControlledDateInputDemo,
          ),
      },
      {
        path: 'rtl-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/rtl-date-input-demo').then(
            (m) => m.RtlDateInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-time-input',
    children: [
      {
        path: 'date-time-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/date-time-input-usage-demo').then(
            (m) => m.DateTimeInputUsageDemo,
          ),
      },
      {
        path: 'hour-cycle-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/hour-cycle-date-time-input-demo').then(
            (m) => m.HourCycleDateTimeInputDemo,
          ),
      },
      {
        path: 'limits-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/limits-date-time-input-demo').then(
            (m) => m.LimitsDateTimeInputDemo,
          ),
      },
      {
        path: 'locale-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/locale-date-time-input-demo').then(
            (m) => m.LocaleDateTimeInputDemo,
          ),
      },
      {
        path: 'disabled-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/disabled-date-time-input-demo').then(
            (m) => m.DisabledDateTimeInputDemo,
          ),
      },
      {
        path: 'read-only-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/read-only-date-time-input-demo').then(
            (m) => m.ReadOnlyDateTimeInputDemo,
          ),
      },
      {
        path: 'form-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/form-date-time-input-demo').then(
            (m) => m.FormDateTimeInputDemo,
          ),
      },
      {
        path: 'controlled-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/controlled-date-time-input-demo').then(
            (m) => m.ControlledDateTimeInputDemo,
          ),
      },
      {
        path: 'rtl-date-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-input/demos/rtl-date-time-input-demo').then(
            (m) => m.RtlDateTimeInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-time-picker',
    children: [
      {
        path: 'confirm-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/confirm-date-time-picker-demo').then(
            (m) => m.ConfirmDateTimePickerDemo,
          ),
      },
      {
        path: 'date-time-picker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/date-time-picker-usage-demo').then(
            (m) => m.DateTimePickerUsageDemo,
          ),
      },
      {
        path: 'steps-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/steps-date-time-picker-demo').then(
            (m) => m.StepsDateTimePickerDemo,
          ),
      },
      {
        path: 'limits-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/limits-date-time-picker-demo').then(
            (m) => m.LimitsDateTimePickerDemo,
          ),
      },
      {
        path: 'locale-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/locale-date-time-picker-demo').then(
            (m) => m.LocaleDateTimePickerDemo,
          ),
      },
      {
        path: 'form-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/form-date-time-picker-demo').then(
            (m) => m.FormDateTimePickerDemo,
          ),
      },
      {
        path: 'rtl-date-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-time-picker/demos/rtl-date-time-picker-demo').then(
            (m) => m.RtlDateTimePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-picker',
    children: [
      {
        path: 'stays-open-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/stays-open-date-picker-demo').then(
            (m) => m.StaysOpenDatePickerDemo,
          ),
      },
      {
        path: 'date-picker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/date-picker-usage-demo').then(
            (m) => m.DatePickerUsageDemo,
          ),
      },
      {
        path: 'rtl-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/rtl-date-picker-demo').then(
            (m) => m.RtlDatePickerDemo,
          ),
      },
      {
        path: 'typed-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/typed-date-picker-demo').then(
            (m) => m.TypedDatePickerDemo,
          ),
      },
      {
        path: 'birth-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/birth-date-picker-demo').then(
            (m) => m.BirthDatePickerDemo,
          ),
      },
      {
        path: 'multiple-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/multiple-date-picker-demo').then(
            (m) => m.MultipleDatePickerDemo,
          ),
      },
      {
        path: 'constraints-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/constraints-date-picker-demo').then(
            (m) => m.ConstraintsDatePickerDemo,
          ),
      },
      {
        path: 'form-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/form-date-picker-demo').then(
            (m) => m.FormDatePickerDemo,
          ),
      },
      {
        path: 'locale-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/locale-date-picker-demo').then(
            (m) => m.LocaleDatePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-range-input',
    children: [
      {
        path: 'date-range-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/date-range-input-usage-demo').then(
            (m) => m.DateRangeInputUsageDemo,
          ),
      },
      {
        path: 'limits-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/limits-date-range-input-demo').then(
            (m) => m.LimitsDateRangeInputDemo,
          ),
      },
      {
        path: 'locale-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/locale-date-range-input-demo').then(
            (m) => m.LocaleDateRangeInputDemo,
          ),
      },
      {
        path: 'disabled-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/disabled-date-range-input-demo').then(
            (m) => m.DisabledDateRangeInputDemo,
          ),
      },
      {
        path: 'form-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/form-date-range-input-demo').then(
            (m) => m.FormDateRangeInputDemo,
          ),
      },
      {
        path: 'controlled-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/controlled-date-range-input-demo').then(
            (m) => m.ControlledDateRangeInputDemo,
          ),
      },
      {
        path: 'rtl-date-range-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-input/demos/rtl-date-range-input-demo').then(
            (m) => m.RtlDateRangeInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-range-picker',
    children: [
      {
        path: 'basic-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/basic-date-range-picker-demo').then(
            (m) => m.BasicDateRangePickerDemo,
          ),
      },
      {
        path: 'confirm-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/confirm-date-range-picker-demo').then(
            (m) => m.ConfirmDateRangePickerDemo,
          ),
      },
      {
        path: 'constraints-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/constraints-date-range-picker-demo').then(
            (m) => m.ConstraintsDateRangePickerDemo,
          ),
      },
      {
        path: 'duration-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/duration-date-range-picker-demo').then(
            (m) => m.DurationDateRangePickerDemo,
          ),
      },
      {
        path: 'form-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/form-date-range-picker-demo').then(
            (m) => m.FormDateRangePickerDemo,
          ),
      },
      {
        path: 'presets-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/presets-date-range-picker-demo').then(
            (m) => m.PresetsDateRangePickerDemo,
          ),
      },
      {
        path: 'rtl-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/rtl-date-range-picker-demo').then(
            (m) => m.RtlDateRangePickerDemo,
          ),
      },
      {
        path: 'typed-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/typed-date-range-picker-demo').then(
            (m) => m.TypedDateRangePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/dialog',
    children: [
      {
        path: 'dialog-usage-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/dialog-usage-demo').then(
            (m) => m.DialogUsageDemo,
          ),
      },
      {
        path: 'close-button-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/close-button-dialog-demo').then(
            (m) => m.CloseButtonDialogDemo,
          ),
      },
      {
        path: 'no-close-button-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/no-close-button-dialog-demo').then(
            (m) => m.NoCloseButtonDialogDemo,
          ),
      },
      {
        path: 'sticky-footer-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/sticky-footer-dialog-demo').then(
            (m) => m.StickyFooterDialogDemo,
          ),
      },
      {
        path: 'scrollable-content-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/scrollable-content-dialog-demo').then(
            (m) => m.ScrollableContentDialogDemo,
          ),
      },
      {
        path: 'rtl-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/rtl-dialog-demo').then(
            (m) => m.RtlDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/native-dialog',
    children: [
      {
        path: 'native-dialog-usage-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/native-dialog-usage-demo').then(
            (m) => m.NativeDialogUsageDemo,
          ),
      },
      {
        path: 'close-button-native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/close-button-native-dialog-demo').then(
            (m) => m.CloseButtonNativeDialogDemo,
          ),
      },
      {
        path: 'no-close-button-native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/no-close-button-native-dialog-demo').then(
            (m) => m.NoCloseButtonNativeDialogDemo,
          ),
      },
      {
        path: 'sticky-footer-native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/sticky-footer-native-dialog-demo').then(
            (m) => m.StickyFooterNativeDialogDemo,
          ),
      },
      {
        path: 'scrollable-content-native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/scrollable-content-native-dialog-demo').then(
            (m) => m.ScrollableContentNativeDialogDemo,
          ),
      },
      {
        path: 'rtl-native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/rtl-native-dialog-demo').then(
            (m) => m.RtlNativeDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/drawer',
    children: [
      {
        path: 'drawer-usage-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/drawer-usage-demo').then(
            (m) => m.DrawerUsageDemo,
          ),
      },
      {
        path: 'sides-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/sides-drawer-demo').then(
            (m) => m.SidesDrawerDemo,
          ),
      },
      {
        path: 'swipe-handle-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/swipe-handle-drawer-demo').then(
            (m) => m.SwipeHandleDrawerDemo,
          ),
      },
      {
        path: 'snap-points-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/snap-points-drawer-demo').then(
            (m) => m.SnapPointsDrawerDemo,
          ),
      },
      {
        path: 'nested-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/nested-drawer-demo').then(
            (m) => m.NestedDrawerDemo,
          ),
      },
      {
        path: 'non-modal-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/non-modal-drawer-demo').then(
            (m) => m.NonModalDrawerDemo,
          ),
      },
      {
        path: 'responsive-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/responsive-drawer-demo').then(
            (m) => m.ResponsiveDrawerDemo,
          ),
      },
      {
        path: 'rtl-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/rtl-drawer-demo').then(
            (m) => m.RtlDrawerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/emoji-picker',
    children: [
      {
        path: 'basic-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/basic-emoji-picker-demo').then(
            (m) => m.BasicEmojiPickerDemo,
          ),
      },
      {
        path: 'categories-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/categories-emoji-picker-demo').then(
            (m) => m.CategoriesEmojiPickerDemo,
          ),
      },
      {
        path: 'locale-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/locale-emoji-picker-demo').then(
            (m) => m.LocaleEmojiPickerDemo,
          ),
      },
      {
        path: 'compact-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/compact-emoji-picker-demo').then(
            (m) => m.CompactEmojiPickerDemo,
          ),
      },
      {
        path: 'input-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/input-emoji-picker-demo').then(
            (m) => m.InputEmojiPickerDemo,
          ),
      },
      {
        path: 'trigger-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/trigger-emoji-picker-demo').then(
            (m) => m.TriggerEmojiPickerDemo,
          ),
      },
      {
        path: 'rtl-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/rtl-emoji-picker-demo').then(
            (m) => m.RtlEmojiPickerDemo,
          ),
      },
      {
        path: 'reactions-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/reactions-emoji-picker-demo').then(
            (m) => m.ReactionsEmojiPickerDemo,
          ),
      },
      {
        path: 'custom-data-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/custom-data-emoji-picker-demo').then(
            (m) => m.CustomDataEmojiPickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/editor',
    children: [
      {
        path: 'editor-usage-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/editor-usage-demo').then(
            (m) => m.EditorUsageDemo,
          ),
      },
      {
        path: 'prefilled-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/prefilled-editor-demo').then(
            (m) => m.PrefilledEditorDemo,
          ),
      },
      {
        path: 'rtl-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/rtl-editor-demo').then(
            (m) => m.RtlEditorDemo,
          ),
      },
      {
        path: 'no-count-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/no-count-editor-demo').then(
            (m) => m.NoCountEditorDemo,
          ),
      },
      {
        path: 'readonly-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/readonly-editor-demo').then(
            (m) => m.ReadonlyEditorDemo,
          ),
      },
      {
        path: 'full-featured-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/full-featured-editor-demo').then(
            (m) => m.FullFeaturedEditorDemo,
          ),
      },
      {
        path: 'signal-forms-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/signal-forms-editor-demo').then(
            (m) => m.SignalFormsEditorDemo,
          ),
      },
      {
        path: 'view-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/view-editor-demo').then(
            (m) => m.ViewEditorDemo,
          ),
      },
      {
        path: 'formats-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/formats-editor-demo').then(
            (m) => m.FormatsEditorDemo,
          ),
      },
      {
        path: 'tables-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/tables-editor-demo').then(
            (m) => m.TablesEditorDemo,
          ),
      },
      {
        path: 'images-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/images-editor-demo').then(
            (m) => m.ImagesEditorDemo,
          ),
      },
      {
        path: 'search-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/search-editor-demo').then(
            (m) => m.SearchEditorDemo,
          ),
      },
      {
        path: 'bubble-menu-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/bubble-menu-editor-demo').then(
            (m) => m.BubbleMenuEditorDemo,
          ),
      },
      {
        path: 'layout-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/layout-editor-demo').then(
            (m) => m.LayoutEditorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/empty',
    children: [
      {
        path: 'empty-usage-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/empty-usage-demo').then(
            (m) => m.EmptyUsageDemo,
          ),
      },
      {
        path: 'outline-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/outline-empty-demo').then(
            (m) => m.OutlineEmptyDemo,
          ),
      },
      {
        path: 'background-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/background-empty-demo').then(
            (m) => m.BackgroundEmptyDemo,
          ),
      },
      {
        path: 'avatar-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/avatar-empty-demo').then(
            (m) => m.AvatarEmptyDemo,
          ),
      },
      {
        path: 'avatar-group-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/avatar-group-empty-demo').then(
            (m) => m.AvatarGroupEmptyDemo,
          ),
      },
      {
        path: 'input-group-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/input-group-empty-demo').then(
            (m) => m.InputGroupEmptyDemo,
          ),
      },
      {
        path: 'card-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/card-empty-demo').then(
            (m) => m.CardEmptyDemo,
          ),
      },
      {
        path: 'rtl-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/rtl-empty-demo').then(
            (m) => m.RtlEmptyDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/field',
    children: [
      {
        path: 'field-usage-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/field-usage-demo').then(
            (m) => m.FieldUsageDemo,
          ),
      },
      {
        path: 'input-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/input-field-demo').then(
            (m) => m.InputFieldDemo,
          ),
      },
      {
        path: 'textarea-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/textarea-field-demo').then(
            (m) => m.TextareaFieldDemo,
          ),
      },
      {
        path: 'select-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/select-field-demo').then(
            (m) => m.SelectFieldDemo,
          ),
      },
      {
        path: 'slider-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/slider-field-demo').then(
            (m) => m.SliderFieldDemo,
          ),
      },
      {
        path: 'fieldset-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/fieldset-field-demo').then(
            (m) => m.FieldsetFieldDemo,
          ),
      },
      {
        path: 'checkbox-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/checkbox-field-demo').then(
            (m) => m.CheckboxFieldDemo,
          ),
      },
      {
        path: 'radio-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/radio-field-demo').then(
            (m) => m.RadioFieldDemo,
          ),
      },
      {
        path: 'switch-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/switch-field-demo').then(
            (m) => m.SwitchFieldDemo,
          ),
      },
      {
        path: 'choice-card-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/choice-card-field-demo').then(
            (m) => m.ChoiceCardFieldDemo,
          ),
      },
      {
        path: 'group-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/group-field-demo').then(
            (m) => m.GroupFieldDemo,
          ),
      },
      {
        path: 'responsive-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/responsive-field-demo').then(
            (m) => m.ResponsiveFieldDemo,
          ),
      },
      {
        path: 'rtl-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/rtl-field-demo').then(
            (m) => m.RtlFieldDemo,
          ),
      },
      {
        path: 'error-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/error-field-demo').then(
            (m) => m.ErrorFieldDemo,
          ),
      },
      {
        path: 'separator-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/separator-field-demo').then(
            (m) => m.SeparatorFieldDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/file-input',
    children: [
      {
        path: 'file-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/file-input-usage-demo').then(
            (m) => m.FileInputUsageDemo,
          ),
      },
      {
        path: 'upload-button-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/upload-button-file-input-demo').then(
            (m) => m.UploadButtonFileInputDemo,
          ),
      },
      {
        path: 'accepted-types-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/accepted-types-file-input-demo').then(
            (m) => m.AcceptedTypesFileInputDemo,
          ),
      },
      {
        path: 'limits-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/limits-file-input-demo').then(
            (m) => m.LimitsFileInputDemo,
          ),
      },
      {
        path: 'one-file-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/one-file-file-input-demo').then(
            (m) => m.OneFileFileInputDemo,
          ),
      },
      {
        path: 'validation-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/validation-file-input-demo').then(
            (m) => m.ValidationFileInputDemo,
          ),
      },
      {
        path: 'previews-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/previews-file-input-demo').then(
            (m) => m.PreviewsFileInputDemo,
          ),
      },
      {
        path: 'uploading-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/uploading-file-input-demo').then(
            (m) => m.UploadingFileInputDemo,
          ),
      },
      {
        path: 'attachments-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/attachments-file-input-demo').then(
            (m) => m.AttachmentsFileInputDemo,
          ),
      },
      {
        path: 'page-drop-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/page-drop-file-input-demo').then(
            (m) => m.PageDropFileInputDemo,
          ),
      },
      {
        path: 'folders-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/folders-file-input-demo').then(
            (m) => m.FoldersFileInputDemo,
          ),
      },
      {
        path: 'camera-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/camera-file-input-demo').then(
            (m) => m.CameraFileInputDemo,
          ),
      },
      {
        path: 'form-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/form-file-input-demo').then(
            (m) => m.FormFileInputDemo,
          ),
      },
      {
        path: 'rtl-file-input-demo',
        loadComponent: () =>
          import('../pages/docs/file-input/demos/rtl-file-input-demo').then(
            (m) => m.RtlFileInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/compare',
    children: [
      {
        path: 'compare-usage-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/compare-usage-demo').then(
            (m) => m.CompareUsageDemo,
          ),
      },
      {
        path: 'content-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/content-compare-demo').then(
            (m) => m.ContentCompareDemo,
          ),
      },
      {
        path: 'vertical-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/vertical-compare-demo').then(
            (m) => m.VerticalCompareDemo,
          ),
      },
      {
        path: 'hover-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/hover-compare-demo').then(
            (m) => m.HoverCompareDemo,
          ),
      },
      {
        path: 'handle-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/handle-compare-demo').then(
            (m) => m.HandleCompareDemo,
          ),
      },
      {
        path: 'rtl-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/rtl-compare-demo').then(
            (m) => m.RtlCompareDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/image-cropper',
    children: [
      {
        path: 'image-cropper-usage-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/image-cropper-usage-demo').then(
            (m) => m.ImageCropperUsageDemo,
          ),
      },
      {
        path: 'aspect-ratio-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/aspect-ratio-image-cropper-demo').then(
            (m) => m.AspectRatioImageCropperDemo,
          ),
      },
      {
        path: 'circle-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/circle-image-cropper-demo').then(
            (m) => m.CircleImageCropperDemo,
          ),
      },
      {
        path: 'frame-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/frame-image-cropper-demo').then(
            (m) => m.FrameImageCropperDemo,
          ),
      },
      {
        path: 'grid-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/grid-image-cropper-demo').then(
            (m) => m.GridImageCropperDemo,
          ),
      },
      {
        path: 'controlled-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/controlled-image-cropper-demo').then(
            (m) => m.ControlledImageCropperDemo,
          ),
      },
      {
        path: 'disabled-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/disabled-image-cropper-demo').then(
            (m) => m.DisabledImageCropperDemo,
          ),
      },
      {
        path: 'rtl-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/rtl-image-cropper-demo').then(
            (m) => m.RtlImageCropperDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/infinite-scroll',
    children: [
      {
        path: 'feed-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/feed-infinite-scroll-demo').then(
            (m) => m.FeedInfiniteScrollDemo,
          ),
      },
      {
        path: 'button-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/button-infinite-scroll-demo').then(
            (m) => m.ButtonInfiniteScrollDemo,
          ),
      },
      {
        path: 'error-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/error-infinite-scroll-demo').then(
            (m) => m.ErrorInfiniteScrollDemo,
          ),
      },
      {
        path: 'chat-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/chat-infinite-scroll-demo').then(
            (m) => m.ChatInfiniteScrollDemo,
          ),
      },
      {
        path: 'grid-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/grid-infinite-scroll-demo').then(
            (m) => m.GridInfiniteScrollDemo,
          ),
      },
      {
        path: 'rtl-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/rtl-infinite-scroll-demo').then(
            (m) => m.RtlInfiniteScrollDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/item',
    children: [
      {
        path: 'item-usage-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/item-usage-demo').then(
            (m) => m.ItemUsageDemo,
          ),
      },
      {
        path: 'variant-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/variant-item-demo').then(
            (m) => m.VariantItemDemo,
          ),
      },
      {
        path: 'size-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/size-item-demo').then(
            (m) => m.SizeItemDemo,
          ),
      },
      {
        path: 'icon-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/icon-item-demo').then(
            (m) => m.IconItemDemo,
          ),
      },
      {
        path: 'avatar-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/avatar-item-demo').then(
            (m) => m.AvatarItemDemo,
          ),
      },
      {
        path: 'image-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/image-item-demo').then(
            (m) => m.ImageItemDemo,
          ),
      },
      {
        path: 'group-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/group-item-demo').then(
            (m) => m.GroupItemDemo,
          ),
      },
      {
        path: 'header-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/header-item-demo').then(
            (m) => m.HeaderItemDemo,
          ),
      },
      {
        path: 'link-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/link-item-demo').then(
            (m) => m.LinkItemDemo,
          ),
      },
      {
        path: 'dropdown-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/dropdown-item-demo').then(
            (m) => m.DropdownItemDemo,
          ),
      },
      {
        path: 'rtl-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/rtl-item-demo').then(
            (m) => m.RtlItemDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input',
    children: [
      {
        path: 'input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/input-usage-demo').then(
            (m) => m.InputUsageDemo,
          ),
      },
      {
        path: 'basic-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/basic-input-demo').then(
            (m) => m.BasicInputDemo,
          ),
      },
      {
        path: 'field-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/field-input-demo').then(
            (m) => m.FieldInputDemo,
          ),
      },
      {
        path: 'field-group-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/field-group-input-demo').then(
            (m) => m.FieldGroupInputDemo,
          ),
      },
      {
        path: 'disabled-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/disabled-input-demo').then(
            (m) => m.DisabledInputDemo,
          ),
      },
      {
        path: 'invalid-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/invalid-input-demo').then(
            (m) => m.InvalidInputDemo,
          ),
      },
      {
        path: 'file-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/file-input-demo').then(
            (m) => m.FileInputDemo,
          ),
      },
      {
        path: 'inline-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/inline-input-demo').then(
            (m) => m.InlineInputDemo,
          ),
      },
      {
        path: 'grid-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/grid-input-demo').then(
            (m) => m.GridInputDemo,
          ),
      },
      {
        path: 'required-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/required-input-demo').then(
            (m) => m.RequiredInputDemo,
          ),
      },
      {
        path: 'badge-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/badge-input-demo').then(
            (m) => m.BadgeInputDemo,
          ),
      },
      {
        path: 'input-group-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/input-group-input-demo').then(
            (m) => m.InputGroupInputDemo,
          ),
      },
      {
        path: 'control-group-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/control-group-input-demo').then(
            (m) => m.ControlGroupInputDemo,
          ),
      },
      {
        path: 'form-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/form-input-demo').then(
            (m) => m.FormInputDemo,
          ),
      },
      {
        path: 'rtl-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/rtl-input-demo').then(
            (m) => m.RtlInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input-button',
    children: [
      {
        path: 'input-button-usage-demo',
        loadComponent: () =>
          import('../pages/docs/input-button/demos/input-button-usage-demo').then(
            (m) => m.InputButtonUsageDemo,
          ),
      },
      {
        path: 'full-width-input-button-demo',
        loadComponent: () =>
          import('../pages/docs/input-button/demos/full-width-input-button-demo').then(
            (m) => m.FullWidthInputButtonDemo,
          ),
      },
      {
        path: 'icon-input-button-demo',
        loadComponent: () =>
          import('../pages/docs/input-button/demos/icon-input-button-demo').then(
            (m) => m.IconInputButtonDemo,
          ),
      },
      {
        path: 'rtl-input-button-demo',
        loadComponent: () =>
          import('../pages/docs/input-button/demos/rtl-input-button-demo').then(
            (m) => m.RtlInputButtonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input-group',
    children: [
      {
        path: 'input-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/input-group-usage-demo').then(
            (m) => m.InputGroupUsageDemo,
          ),
      },
      {
        path: 'inline-start-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/inline-start-input-group-demo').then(
            (m) => m.InlineStartInputGroupDemo,
          ),
      },
      {
        path: 'inline-end-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/inline-end-input-group-demo').then(
            (m) => m.InlineEndInputGroupDemo,
          ),
      },
      {
        path: 'block-start-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/block-start-input-group-demo').then(
            (m) => m.BlockStartInputGroupDemo,
          ),
      },
      {
        path: 'block-end-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/block-end-input-group-demo').then(
            (m) => m.BlockEndInputGroupDemo,
          ),
      },
      {
        path: 'icon-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/icon-input-group-demo').then(
            (m) => m.IconInputGroupDemo,
          ),
      },
      {
        path: 'text-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/text-input-group-demo').then(
            (m) => m.TextInputGroupDemo,
          ),
      },
      {
        path: 'button-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/button-input-group-demo').then(
            (m) => m.ButtonInputGroupDemo,
          ),
      },
      {
        path: 'kbd-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/kbd-input-group-demo').then(
            (m) => m.KbdInputGroupDemo,
          ),
      },
      {
        path: 'dropdown-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/dropdown-input-group-demo').then(
            (m) => m.DropdownInputGroupDemo,
          ),
      },
      {
        path: 'spinner-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/spinner-input-group-demo').then(
            (m) => m.SpinnerInputGroupDemo,
          ),
      },
      {
        path: 'textarea-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/textarea-input-group-demo').then(
            (m) => m.TextareaInputGroupDemo,
          ),
      },
      {
        path: 'disabled-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/disabled-input-group-demo').then(
            (m) => m.DisabledInputGroupDemo,
          ),
      },
      {
        path: 'custom-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/custom-input-group-demo').then(
            (m) => m.CustomInputGroupDemo,
          ),
      },
      {
        path: 'rtl-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/rtl-input-group-demo').then(
            (m) => m.RtlInputGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/kanban-board',
    children: [
      {
        path: 'basic-kanban-board-demo',
        loadComponent: () =>
          import('../pages/docs/kanban-board/demos/basic-kanban-board-demo').then(
            (m) => m.BasicKanbanBoardDemo,
          ),
      },
      {
        path: 'rich-kanban-board-demo',
        loadComponent: () =>
          import('../pages/docs/kanban-board/demos/rich-kanban-board-demo').then(
            (m) => m.RichKanbanBoardDemo,
          ),
      },
      {
        path: 'flat-kanban-board-demo',
        loadComponent: () =>
          import('../pages/docs/kanban-board/demos/flat-kanban-board-demo').then(
            (m) => m.FlatKanbanBoardDemo,
          ),
      },
      {
        path: 'add-kanban-board-demo',
        loadComponent: () =>
          import('../pages/docs/kanban-board/demos/add-kanban-board-demo').then(
            (m) => m.AddKanbanBoardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/kbd',
    children: [
      {
        path: 'kbd-usage-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/kbd-usage-demo').then(
            (m) => m.KbdUsageDemo,
          ),
      },
      {
        path: 'group-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/group-kbd-demo').then(
            (m) => m.GroupKbdDemo,
          ),
      },
      {
        path: 'button-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/button-kbd-demo').then(
            (m) => m.ButtonKbdDemo,
          ),
      },
      {
        path: 'input-group-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/input-group-kbd-demo').then(
            (m) => m.InputGroupKbdDemo,
          ),
      },
      {
        path: 'rtl-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/rtl-kbd-demo').then(
            (m) => m.RtlKbdDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/label',
    children: [
      {
        path: 'label-usage-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/label-usage-demo').then(
            (m) => m.LabelUsageDemo,
          ),
      },
      {
        path: 'field-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/field-label-demo').then(
            (m) => m.FieldLabelDemo,
          ),
      },
      {
        path: 'description-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/description-label-demo').then(
            (m) => m.DescriptionLabelDemo,
          ),
      },
      {
        path: 'choice-card-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/choice-card-label-demo').then(
            (m) => m.ChoiceCardLabelDemo,
          ),
      },
      {
        path: 'label-text-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/label-text-label-demo').then(
            (m) => m.LabelTextLabelDemo,
          ),
      },
      {
        path: 'rtl-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/rtl-label-demo').then(
            (m) => m.RtlLabelDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/link',
    children: [
      {
        path: 'in-text-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/in-text-link-demo').then(
            (m) => m.InTextLinkDemo,
          ),
      },
      {
        path: 'link-usage-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/link-usage-demo').then(
            (m) => m.LinkUsageDemo,
          ),
      },
      {
        path: 'variants-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/variants-link-demo').then(
            (m) => m.VariantsLinkDemo,
          ),
      },
      {
        path: 'size-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/size-link-demo').then(
            (m) => m.SizeLinkDemo,
          ),
      },
      {
        path: 'with-icon-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/with-icon-link-demo').then(
            (m) => m.WithIconLinkDemo,
          ),
      },
      {
        path: 'router-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/router-link-demo').then(
            (m) => m.RouterLinkDemo,
          ),
      },
      {
        path: 'external-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/external-link-demo').then(
            (m) => m.ExternalLinkDemo,
          ),
      },
      {
        path: 'disabled-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/disabled-link-demo').then(
            (m) => m.DisabledLinkDemo,
          ),
      },
      {
        path: 'rtl-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/rtl-link-demo').then(
            (m) => m.RtlLinkDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/marquee',
    children: [
      {
        path: 'marquee-usage-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/marquee-usage-demo').then(
            (m) => m.MarqueeUsageDemo,
          ),
      },
      {
        path: 'testimonials-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/testimonials-marquee-demo').then(
            (m) => m.TestimonialsMarqueeDemo,
          ),
      },
      {
        path: 'vertical-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/vertical-marquee-demo').then(
            (m) => m.VerticalMarqueeDemo,
          ),
      },
      {
        path: 'ticker-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/ticker-marquee-demo').then(
            (m) => m.TickerMarqueeDemo,
          ),
      },
      {
        path: 'rtl-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/rtl-marquee-demo').then(
            (m) => m.RtlMarqueeDemo,
          ),
      },
      {
        path: 'speed-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/speed-marquee-demo').then(
            (m) => m.SpeedMarqueeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/masonry-grid',
    children: [
      {
        path: 'masonry-grid-usage-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/masonry-grid-usage-demo').then(
            (m) => m.MasonryGridUsageDemo,
          ),
      },
      {
        path: 'cards-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/cards-masonry-grid-demo').then(
            (m) => m.CardsMasonryGridDemo,
          ),
      },
      {
        path: 'order-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/order-masonry-grid-demo').then(
            (m) => m.OrderMasonryGridDemo,
          ),
      },
      {
        path: 'more-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/more-masonry-grid-demo').then(
            (m) => m.MoreMasonryGridDemo,
          ),
      },
      {
        path: 'columns-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/columns-masonry-grid-demo').then(
            (m) => m.ColumnsMasonryGridDemo,
          ),
      },
      {
        path: 'rtl-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/rtl-masonry-grid-demo').then(
            (m) => m.RtlMasonryGridDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/menubar',
    children: [
      {
        path: 'menubar-usage-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/menubar-usage-demo').then(
            (m) => m.MenubarUsageDemo,
          ),
      },
      {
        path: 'checkbox-menubar-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/checkbox-menubar-demo').then(
            (m) => m.CheckboxMenubarDemo,
          ),
      },
      {
        path: 'radio-menubar-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/radio-menubar-demo').then(
            (m) => m.RadioMenubarDemo,
          ),
      },
      {
        path: 'submenu-menubar-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/submenu-menubar-demo').then(
            (m) => m.SubmenuMenubarDemo,
          ),
      },
      {
        path: 'icons-menubar-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/icons-menubar-demo').then(
            (m) => m.IconsMenubarDemo,
          ),
      },
      {
        path: 'rtl-menubar-demo',
        loadComponent: () =>
          import('../pages/docs/menubar/demos/rtl-menubar-demo').then(
            (m) => m.RtlMenubarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/menu',
    children: [
      {
        path: 'menu-usage-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-usage-demo').then(
            (m) => m.MenuUsageDemo,
          ),
      },
      {
        path: 'basic-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/basic-menu-demo').then(
            (m) => m.BasicMenuDemo,
          ),
      },
      {
        path: 'submenu-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/submenu-menu-demo').then(
            (m) => m.SubmenuMenuDemo,
          ),
      },
      {
        path: 'shortcuts-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/shortcuts-menu-demo').then(
            (m) => m.ShortcutsMenuDemo,
          ),
      },
      {
        path: 'icons-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/icons-menu-demo').then(
            (m) => m.IconsMenuDemo,
          ),
      },
      {
        path: 'checkboxes-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/checkboxes-menu-demo').then(
            (m) => m.CheckboxesMenuDemo,
          ),
      },
      {
        path: 'radio-group-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/radio-group-menu-demo').then(
            (m) => m.RadioGroupMenuDemo,
          ),
      },
      {
        path: 'destructive-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/destructive-menu-demo').then(
            (m) => m.DestructiveMenuDemo,
          ),
      },
      {
        path: 'standalone-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/standalone-menu-demo').then(
            (m) => m.StandaloneMenuDemo,
          ),
      },
      {
        path: 'rtl-menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/rtl-menu-demo').then(
            (m) => m.RtlMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/native-select',
    children: [
      {
        path: 'native-select-usage-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/native-select-usage-demo').then(
            (m) => m.NativeSelectUsageDemo,
          ),
      },
      {
        path: 'groups-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/groups-native-select-demo').then(
            (m) => m.GroupsNativeSelectDemo,
          ),
      },
      {
        path: 'disabled-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/disabled-native-select-demo').then(
            (m) => m.DisabledNativeSelectDemo,
          ),
      },
      {
        path: 'invalid-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/invalid-native-select-demo').then(
            (m) => m.InvalidNativeSelectDemo,
          ),
      },
      {
        path: 'sizes-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/sizes-native-select-demo').then(
            (m) => m.SizesNativeSelectDemo,
          ),
      },
      {
        path: 'rtl-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/rtl-native-select-demo').then(
            (m) => m.RtlNativeSelectDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pie-chart',
    children: [
      {
        path: 'pie-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/pie-chart-usage-demo').then(
            (m) => m.PieChartUsageDemo,
          ),
      },
      {
        path: 'pie-chart-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/pie-chart-demo').then(
            (m) => m.PieChartDemo,
          ),
      },
      {
        path: 'donut-chart-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/donut-chart-demo').then(
            (m) => m.DonutChartDemo,
          ),
      },
      {
        path: 'stacked-pie-chart-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/stacked-pie-chart-demo').then(
            (m) => m.StackedPieChartDemo,
          ),
      },
      {
        path: 'label-pie-chart-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/label-pie-chart-demo').then(
            (m) => m.LabelPieChartDemo,
          ),
      },
      {
        path: 'rtl-pie-chart-demo',
        loadComponent: () =>
          import('../pages/docs/pie-chart/demos/rtl-pie-chart-demo').then(
            (m) => m.RtlPieChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/scatter-chart',
    children: [
      {
        path: 'scatter-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/scatter-chart/demos/scatter-chart-usage-demo').then(
            (m) => m.ScatterChartUsageDemo,
          ),
      },
      {
        path: 'scatter-chart-demo',
        loadComponent: () =>
          import('../pages/docs/scatter-chart/demos/scatter-chart-demo').then(
            (m) => m.ScatterChartDemo,
          ),
      },
      {
        path: 'bubble-scatter-chart-demo',
        loadComponent: () =>
          import('../pages/docs/scatter-chart/demos/bubble-scatter-chart-demo').then(
            (m) => m.BubbleScatterChartDemo,
          ),
      },
      {
        path: 'rtl-scatter-chart-demo',
        loadComponent: () =>
          import('../pages/docs/scatter-chart/demos/rtl-scatter-chart-demo').then(
            (m) => m.RtlScatterChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/funnel-chart',
    children: [
      {
        path: 'funnel-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/funnel-chart/demos/funnel-chart-usage-demo').then(
            (m) => m.FunnelChartUsageDemo,
          ),
      },
      {
        path: 'funnel-chart-demo',
        loadComponent: () =>
          import('../pages/docs/funnel-chart/demos/funnel-chart-demo').then(
            (m) => m.FunnelChartDemo,
          ),
      },
      {
        path: 'label-funnel-chart-demo',
        loadComponent: () =>
          import('../pages/docs/funnel-chart/demos/label-funnel-chart-demo').then(
            (m) => m.LabelFunnelChartDemo,
          ),
      },
      {
        path: 'rtl-funnel-chart-demo',
        loadComponent: () =>
          import('../pages/docs/funnel-chart/demos/rtl-funnel-chart-demo').then(
            (m) => m.RtlFunnelChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/treemap-chart',
    children: [
      {
        path: 'treemap-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/treemap-chart/demos/treemap-chart-usage-demo').then(
            (m) => m.TreemapChartUsageDemo,
          ),
      },
      {
        path: 'treemap-chart-demo',
        loadComponent: () =>
          import('../pages/docs/treemap-chart/demos/treemap-chart-demo').then(
            (m) => m.TreemapChartDemo,
          ),
      },
      {
        path: 'grouped-treemap-chart-demo',
        loadComponent: () =>
          import('../pages/docs/treemap-chart/demos/grouped-treemap-chart-demo').then(
            (m) => m.GroupedTreemapChartDemo,
          ),
      },
      {
        path: 'rtl-treemap-chart-demo',
        loadComponent: () =>
          import('../pages/docs/treemap-chart/demos/rtl-treemap-chart-demo').then(
            (m) => m.RtlTreemapChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sunburst-chart',
    children: [
      {
        path: 'sunburst-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/sunburst-chart/demos/sunburst-chart-usage-demo').then(
            (m) => m.SunburstChartUsageDemo,
          ),
      },
      {
        path: 'sunburst-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sunburst-chart/demos/sunburst-chart-demo').then(
            (m) => m.SunburstChartDemo,
          ),
      },
      {
        path: 'label-sunburst-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sunburst-chart/demos/label-sunburst-chart-demo').then(
            (m) => m.LabelSunburstChartDemo,
          ),
      },
      {
        path: 'rtl-sunburst-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sunburst-chart/demos/rtl-sunburst-chart-demo').then(
            (m) => m.RtlSunburstChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sankey-chart',
    children: [
      {
        path: 'sankey-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/sankey-chart/demos/sankey-chart-usage-demo').then(
            (m) => m.SankeyChartUsageDemo,
          ),
      },
      {
        path: 'sankey-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sankey-chart/demos/sankey-chart-demo').then(
            (m) => m.SankeyChartDemo,
          ),
      },
      {
        path: 'rtl-sankey-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sankey-chart/demos/rtl-sankey-chart-demo').then(
            (m) => m.RtlSankeyChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/radar-chart',
    children: [
      {
        path: 'radar-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/radar-chart/demos/radar-chart-usage-demo').then(
            (m) => m.RadarChartUsageDemo,
          ),
      },
      {
        path: 'radar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radar-chart/demos/radar-chart-demo').then(
            (m) => m.RadarChartDemo,
          ),
      },
      {
        path: 'multiple-radar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radar-chart/demos/multiple-radar-chart-demo').then(
            (m) => m.MultipleRadarChartDemo,
          ),
      },
      {
        path: 'lines-radar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radar-chart/demos/lines-radar-chart-demo').then(
            (m) => m.LinesRadarChartDemo,
          ),
      },
      {
        path: 'rtl-radar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radar-chart/demos/rtl-radar-chart-demo').then(
            (m) => m.RtlRadarChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/radial-chart',
    children: [
      {
        path: 'radial-chart-usage-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/radial-chart-usage-demo').then(
            (m) => m.RadialChartUsageDemo,
          ),
      },
      {
        path: 'radial-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/radial-chart-demo').then(
            (m) => m.RadialChartDemo,
          ),
      },
      {
        path: 'stacked-radial-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/stacked-radial-chart-demo').then(
            (m) => m.StackedRadialChartDemo,
          ),
      },
      {
        path: 'grid-radial-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/grid-radial-chart-demo').then(
            (m) => m.GridRadialChartDemo,
          ),
      },
      {
        path: 'label-radial-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/label-radial-chart-demo').then(
            (m) => m.LabelRadialChartDemo,
          ),
      },
      {
        path: 'rtl-radial-chart-demo',
        loadComponent: () =>
          import('../pages/docs/radial-chart/demos/rtl-radial-chart-demo').then(
            (m) => m.RtlRadialChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/scheduler',
    children: [
      {
        path: 'editable-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/editable-scheduler-demo').then(
            (m) => m.EditableSchedulerDemo,
          ),
      },
      {
        path: 'multi-day-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/multi-day-scheduler-demo').then(
            (m) => m.MultiDaySchedulerDemo,
          ),
      },
      {
        path: 'agenda-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/agenda-scheduler-demo').then(
            (m) => m.AgendaSchedulerDemo,
          ),
      },
      {
        path: 'rtl-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/rtl-scheduler-demo').then(
            (m) => m.RtlSchedulerDemo,
          ),
      },
      {
        path: 'basic-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/basic-scheduler-demo').then(
            (m) => m.BasicSchedulerDemo,
          ),
      },
      {
        path: 'month-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/month-scheduler-demo').then(
            (m) => m.MonthSchedulerDemo,
          ),
      },
      {
        path: 'working-hours-scheduler-demo',
        loadComponent: () =>
          import('../pages/docs/scheduler/demos/working-hours-scheduler-demo').then(
            (m) => m.WorkingHoursSchedulerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/rating',
    children: [
      {
        path: 'rating-usage-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/rating-usage-demo').then(
            (m) => m.RatingUsageDemo,
          ),
      },
      {
        path: 'half-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/half-rating-demo').then(
            (m) => m.HalfRatingDemo,
          ),
      },
      {
        path: 'form-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/form-rating-demo').then(
            (m) => m.FormRatingDemo,
          ),
      },
      {
        path: 'readonly-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/readonly-rating-demo').then(
            (m) => m.ReadonlyRatingDemo,
          ),
      },
      {
        path: 'disabled-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/disabled-rating-demo').then(
            (m) => m.DisabledRatingDemo,
          ),
      },
      {
        path: 'deselectable-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/deselectable-rating-demo').then(
            (m) => m.DeselectableRatingDemo,
          ),
      },
      {
        path: 'icons-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/icons-rating-demo').then(
            (m) => m.IconsRatingDemo,
          ),
      },
      {
        path: 'size-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/size-rating-demo').then(
            (m) => m.SizeRatingDemo,
          ),
      },
      {
        path: 'rtl-rating-demo',
        loadComponent: () =>
          import('../pages/docs/rating/demos/rtl-rating-demo').then(
            (m) => m.RtlRatingDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/autocomplete',
    children: [
      {
        path: 'autocomplete-usage-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/autocomplete-usage-demo').then(
            (m) => m.AutocompleteUsageDemo,
          ),
      },
      {
        path: 'inline-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/inline-autocomplete-demo').then(
            (m) => m.InlineAutocompleteDemo,
          ),
      },
      {
        path: 'groups-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/groups-autocomplete-demo').then(
            (m) => m.GroupsAutocompleteDemo,
          ),
      },
      {
        path: 'async-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/async-autocomplete-demo').then(
            (m) => m.AsyncAutocompleteDemo,
          ),
      },
      {
        path: 'auto-highlight-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/auto-highlight-autocomplete-demo').then(
            (m) => m.AutoHighlightAutocompleteDemo,
          ),
      },
      {
        path: 'limit-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/limit-autocomplete-demo').then(
            (m) => m.LimitAutocompleteDemo,
          ),
      },
      {
        path: 'form-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/form-autocomplete-demo').then(
            (m) => m.FormAutocompleteDemo,
          ),
      },
      {
        path: 'input-group-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/input-group-autocomplete-demo').then(
            (m) => m.InputGroupAutocompleteDemo,
          ),
      },
      {
        path: 'disabled-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/disabled-autocomplete-demo').then(
            (m) => m.DisabledAutocompleteDemo,
          ),
      },
      {
        path: 'rtl-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/rtl-autocomplete-demo').then(
            (m) => m.RtlAutocompleteDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/range-slider',
    children: [
      {
        path: 'trim-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/trim-range-slider-demo').then(
            (m) => m.TrimRangeSliderDemo,
          ),
      },
      {
        path: 'range-slider-usage-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/range-slider-usage-demo').then(
            (m) => m.RangeSliderUsageDemo,
          ),
      },
      {
        path: 'label-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/label-range-slider-demo').then(
            (m) => m.LabelRangeSliderDemo,
          ),
      },
      {
        path: 'steps-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/steps-range-slider-demo').then(
            (m) => m.StepsRangeSliderDemo,
          ),
      },
      {
        path: 'vertical-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/vertical-range-slider-demo').then(
            (m) => m.VerticalRangeSliderDemo,
          ),
      },
      {
        path: 'form-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/form-range-slider-demo').then(
            (m) => m.FormRangeSliderDemo,
          ),
      },
      {
        path: 'disabled-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/disabled-range-slider-demo').then(
            (m) => m.DisabledRangeSliderDemo,
          ),
      },
      {
        path: 'rtl-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/rtl-range-slider-demo').then(
            (m) => m.RtlRangeSliderDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/frame',
    children: [
      {
        path: 'frame-usage-demo',
        loadComponent: () =>
          import('../pages/docs/frame/demos/frame-usage-demo').then(
            (m) => m.FrameUsageDemo,
          ),
      },
      {
        path: 'aspect-ratio-frame-demo',
        loadComponent: () =>
          import('../pages/docs/frame/demos/aspect-ratio-frame-demo').then(
            (m) => m.AspectRatioFrameDemo,
          ),
      },
      {
        path: 'table-frame-demo',
        loadComponent: () =>
          import('../pages/docs/frame/demos/table-frame-demo').then(
            (m) => m.TableFrameDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/backdrop',
    children: [
      {
        path: 'backdrop-usage-demo',
        loadComponent: () =>
          import('../pages/docs/backdrop/demos/backdrop-usage-demo').then(
            (m) => m.BackdropUsageDemo,
          ),
      },
      {
        path: 'custom-backdrop-demo',
        loadComponent: () =>
          import('../pages/docs/backdrop/demos/custom-backdrop-demo').then(
            (m) => m.CustomBackdropDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/focus-trap',
    children: [
      {
        path: 'basic-focus-trap-demo',
        loadComponent: () =>
          import('../pages/docs/focus-trap/demos/basic-focus-trap-demo').then(
            (m) => m.BasicFocusTrapDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/select-on-focus',
    children: [
      {
        path: 'keyboard-select-on-focus-demo',
        loadComponent: () =>
          import('../pages/docs/select-on-focus/demos/keyboard-select-on-focus-demo').then(
            (m) => m.KeyboardSelectOnFocusDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/number-group',
    children: [
      {
        path: 'quantity-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/quantity-number-group-demo').then(
            (m) => m.QuantityNumberGroupDemo,
          ),
      },
      {
        path: 'stacked-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/stacked-number-group-demo').then(
            (m) => m.StackedNumberGroupDemo,
          ),
      },
      {
        path: 'steps-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/steps-number-group-demo').then(
            (m) => m.StepsNumberGroupDemo,
          ),
      },
      {
        path: 'basic-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/basic-number-group-demo').then(
            (m) => m.BasicNumberGroupDemo,
          ),
      },
      {
        path: 'scrubbing-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/scrubbing-number-group-demo').then(
            (m) => m.ScrubbingNumberGroupDemo,
          ),
      },
      {
        path: 'rtl-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/rtl-number-group-demo').then(
            (m) => m.RtlNumberGroupDemo,
          ),
      },
      {
        path: 'price-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/price-number-group-demo').then(
            (m) => m.PriceNumberGroupDemo,
          ),
      },
      {
        path: 'disabled-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/disabled-number-group-demo').then(
            (m) => m.DisabledNumberGroupDemo,
          ),
      },
      {
        path: 'without-label-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/without-label-number-group-demo').then(
            (m) => m.WithoutLabelNumberGroupDemo,
          ),
      },
      {
        path: 'signal-forms-number-group-demo',
        loadComponent: () =>
          import('../pages/docs/number-group/demos/signal-forms-number-group-demo').then(
            (m) => m.SignalFormsNumberGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/password-group',
    children: [
      {
        path: 'password-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/password-group-usage-demo').then(
            (m) => m.PasswordGroupUsageDemo,
          ),
      },
      {
        path: 'visible-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/visible-password-group-demo').then(
            (m) => m.VisiblePasswordGroupDemo,
          ),
      },
      {
        path: 'disabled-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/disabled-password-group-demo').then(
            (m) => m.DisabledPasswordGroupDemo,
          ),
      },
      {
        path: 'form-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/form-password-group-demo').then(
            (m) => m.FormPasswordGroupDemo,
          ),
      },
      {
        path: 'caps-lock-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/caps-lock-password-group-demo').then(
            (m) => m.CapsLockPasswordGroupDemo,
          ),
      },
      {
        path: 'strength-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/strength-password-group-demo').then(
            (m) => m.StrengthPasswordGroupDemo,
          ),
      },
      {
        path: 'requirements-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/requirements-password-group-demo').then(
            (m) => m.RequirementsPasswordGroupDemo,
          ),
      },
      {
        path: 'generate-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/generate-password-group-demo').then(
            (m) => m.GeneratePasswordGroupDemo,
          ),
      },
      {
        path: 'rtl-password-group-demo',
        loadComponent: () =>
          import('../pages/docs/password-group/demos/rtl-password-group-demo').then(
            (m) => m.RtlPasswordGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pagination',
    children: [
      {
        path: 'pagination-usage-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/pagination-usage-demo').then(
            (m) => m.PaginationUsageDemo,
          ),
      },
      {
        path: 'simple-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/simple-pagination-demo').then(
            (m) => m.SimplePaginationDemo,
          ),
      },
      {
        path: 'icons-only-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/icons-only-pagination-demo').then(
            (m) => m.IconsOnlyPaginationDemo,
          ),
      },
      {
        path: 'ellipsis-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/ellipsis-pagination-demo').then(
            (m) => m.EllipsisPaginationDemo,
          ),
      },
      {
        path: 'siblings-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/siblings-pagination-demo').then(
            (m) => m.SiblingsPaginationDemo,
          ),
      },
      {
        path: 'first-last-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/first-last-pagination-demo').then(
            (m) => m.FirstLastPaginationDemo,
          ),
      },
      {
        path: 'links-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/links-pagination-demo').then(
            (m) => m.LinksPaginationDemo,
          ),
      },
      {
        path: 'disabled-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/disabled-pagination-demo').then(
            (m) => m.DisabledPaginationDemo,
          ),
      },
      {
        path: 'rtl-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/rtl-pagination-demo').then(
            (m) => m.RtlPaginationDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pdf-viewer',
    children: [
      {
        path: 'pdf-viewer-usage-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-usage-demo').then(
            (m) => m.PdfViewerUsageDemo,
          ),
      },
      {
        path: 'pdf-viewer-rtl-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-rtl-demo').then(
            (m) => m.PdfViewerRtlDemo,
          ),
      },
      {
        path: 'pdf-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-demo').then(
            (m) => m.PdfViewerDemo,
          ),
      },
      {
        path: 'pdf-viewer-form-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-form-demo').then(
            (m) => m.PdfViewerFormDemo,
          ),
      },
      {
        path: 'pdf-viewer-open-parameters-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-open-parameters-demo').then(
            (m) => m.PdfViewerOpenParametersDemo,
          ),
      },
      {
        path: 'pdf-viewer-presentation-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-presentation-demo').then(
            (m) => m.PdfViewerPresentationDemo,
          ),
      },
      {
        path: 'pdf-viewer-reading-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/pdf-viewer-reading-demo').then(
            (m) => m.PdfViewerReadingDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/phone-input',
    children: [
      {
        path: 'phone-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/phone-input-usage-demo').then(
            (m) => m.PhoneInputUsageDemo,
          ),
      },
      {
        path: 'preferred-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/preferred-phone-input-demo').then(
            (m) => m.PreferredPhoneInputDemo,
          ),
      },
      {
        path: 'only-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/only-phone-input-demo').then(
            (m) => m.OnlyPhoneInputDemo,
          ),
      },
      {
        path: 'example-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/example-phone-input-demo').then(
            (m) => m.ExamplePhoneInputDemo,
          ),
      },
      {
        path: 'form-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/form-phone-input-demo').then(
            (m) => m.FormPhoneInputDemo,
          ),
      },
      {
        path: 'disabled-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/disabled-phone-input-demo').then(
            (m) => m.DisabledPhoneInputDemo,
          ),
      },
      {
        path: 'rtl-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/rtl-phone-input-demo').then(
            (m) => m.RtlPhoneInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/popover',
    children: [
      {
        path: 'popover-usage-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/popover-usage-demo').then(
            (m) => m.PopoverUsageDemo,
          ),
      },
      {
        path: 'basic-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/basic-popover-demo').then(
            (m) => m.BasicPopoverDemo,
          ),
      },
      {
        path: 'alignments-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/alignments-popover-demo').then(
            (m) => m.AlignmentsPopoverDemo,
          ),
      },
      {
        path: 'sides-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/sides-popover-demo').then(
            (m) => m.SidesPopoverDemo,
          ),
      },
      {
        path: 'hover-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/hover-popover-demo').then(
            (m) => m.HoverPopoverDemo,
          ),
      },
      {
        path: 'modal-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/modal-popover-demo').then(
            (m) => m.ModalPopoverDemo,
          ),
      },
      {
        path: 'controlled-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/controlled-popover-demo').then(
            (m) => m.ControlledPopoverDemo,
          ),
      },
      {
        path: 'rtl-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/rtl-popover-demo').then(
            (m) => m.RtlPopoverDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/preview-card',
    children: [
      {
        path: 'preview-card-usage-demo',
        loadComponent: () =>
          import('../pages/docs/preview-card/demos/preview-card-usage-demo').then(
            (m) => m.PreviewCardUsageDemo,
          ),
      },
      {
        path: 'in-text-preview-card-demo',
        loadComponent: () =>
          import('../pages/docs/preview-card/demos/in-text-preview-card-demo').then(
            (m) => m.InTextPreviewCardDemo,
          ),
      },
      {
        path: 'sides-preview-card-demo',
        loadComponent: () =>
          import('../pages/docs/preview-card/demos/sides-preview-card-demo').then(
            (m) => m.SidesPreviewCardDemo,
          ),
      },
      {
        path: 'logical-sides-preview-card-demo',
        loadComponent: () =>
          import('../pages/docs/preview-card/demos/logical-sides-preview-card-demo').then(
            (m) => m.LogicalSidesPreviewCardDemo,
          ),
      },
      {
        path: 'rtl-preview-card-demo',
        loadComponent: () =>
          import('../pages/docs/preview-card/demos/rtl-preview-card-demo').then(
            (m) => m.RtlPreviewCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/progress',
    children: [
      {
        path: 'progress-usage-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/progress-usage-demo').then(
            (m) => m.ProgressUsageDemo,
          ),
      },
      {
        path: 'controlled-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/controlled-progress-demo').then(
            (m) => m.ControlledProgressDemo,
          ),
      },
      {
        path: 'basic-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/basic-progress-demo').then(
            (m) => m.BasicProgressDemo,
          ),
      },
      {
        path: 'circle-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/circle-progress-demo').then(
            (m) => m.CircleProgressDemo,
          ),
      },
      {
        path: 'indeterminate-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/indeterminate-progress-demo').then(
            (m) => m.IndeterminateProgressDemo,
          ),
      },
      {
        path: 'download-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/download-progress-demo').then(
            (m) => m.DownloadProgressDemo,
          ),
      },
      {
        path: 'steps-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/steps-progress-demo').then(
            (m) => m.StepsProgressDemo,
          ),
      },
      {
        path: 'rtl-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/rtl-progress-demo').then(
            (m) => m.RtlProgressDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/qr-code',
    children: [
      {
        path: 'qr-code-usage-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/qr-code-usage-demo').then(
            (m) => m.QrCodeUsageDemo,
          ),
      },
      {
        path: 'sizes-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/sizes-qr-code-demo').then(
            (m) => m.SizesQrCodeDemo,
          ),
      },
      {
        path: 'colors-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/colors-qr-code-demo').then(
            (m) => m.ColorsQrCodeDemo,
          ),
      },
      {
        path: 'error-correction-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/error-correction-qr-code-demo').then(
            (m) => m.ErrorCorrectionQrCodeDemo,
          ),
      },
      {
        path: 'margin-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/margin-qr-code-demo').then(
            (m) => m.MarginQrCodeDemo,
          ),
      },
      {
        path: 'live-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/live-qr-code-demo').then(
            (m) => m.LiveQrCodeDemo,
          ),
      },
      {
        path: 'download-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/download-qr-code-demo').then(
            (m) => m.DownloadQrCodeDemo,
          ),
      },
      {
        path: 'use-cases-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/use-cases-qr-code-demo').then(
            (m) => m.UseCasesQrCodeDemo,
          ),
      },
      {
        path: 'rtl-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/rtl-qr-code-demo').then(
            (m) => m.RtlQrCodeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/radio-group',
    children: [
      {
        path: 'radio-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/radio-group-usage-demo').then(
            (m) => m.RadioGroupUsageDemo,
          ),
      },
      {
        path: 'description-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/description-radio-group-demo').then(
            (m) => m.DescriptionRadioGroupDemo,
          ),
      },
      {
        path: 'choice-card-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/choice-card-radio-group-demo').then(
            (m) => m.ChoiceCardRadioGroupDemo,
          ),
      },
      {
        path: 'fieldset-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/fieldset-radio-group-demo').then(
            (m) => m.FieldsetRadioGroupDemo,
          ),
      },
      {
        path: 'disabled-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/disabled-radio-group-demo').then(
            (m) => m.DisabledRadioGroupDemo,
          ),
      },
      {
        path: 'read-only-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/read-only-radio-group-demo').then(
            (m) => m.ReadOnlyRadioGroupDemo,
          ),
      },
      {
        path: 'invalid-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/invalid-radio-group-demo').then(
            (m) => m.InvalidRadioGroupDemo,
          ),
      },
      {
        path: 'rtl-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/rtl-radio-group-demo').then(
            (m) => m.RtlRadioGroupDemo,
          ),
      },
      {
        path: 'horizontal-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/horizontal-radio-group-demo').then(
            (m) => m.HorizontalRadioGroupDemo,
          ),
      },
      {
        path: 'form-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/form-radio-group-demo').then(
            (m) => m.FormRadioGroupDemo,
          ),
      },
      {
        path: 'custom-theme-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/custom-theme-radio-group-demo').then(
            (m) => m.CustomThemeRadioGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/resizable',
    children: [
      {
        path: 'resizable-usage-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/resizable-usage-demo').then(
            (m) => m.ResizableUsageDemo,
          ),
      },
      {
        path: 'handle-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/handle-resizable-demo').then(
            (m) => m.HandleResizableDemo,
          ),
      },
      {
        path: 'vertical-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/vertical-resizable-demo').then(
            (m) => m.VerticalResizableDemo,
          ),
      },
      {
        path: 'collapsible-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/collapsible-resizable-demo').then(
            (m) => m.CollapsibleResizableDemo,
          ),
      },
      {
        path: 'remembered-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/remembered-resizable-demo').then(
            (m) => m.RememberedResizableDemo,
          ),
      },
      {
        path: 'rtl-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/rtl-resizable-demo').then(
            (m) => m.RtlResizableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/scroll-area',
    children: [
      {
        path: 'scroll-area-usage-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/scroll-area-usage-demo').then(
            (m) => m.ScrollAreaUsageDemo,
          ),
      },
      {
        path: 'horizontal-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/horizontal-scroll-area-demo').then(
            (m) => m.HorizontalScrollAreaDemo,
          ),
      },
      {
        path: 'custom-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/custom-scroll-area-demo').then(
            (m) => m.CustomScrollAreaDemo,
          ),
      },
      {
        path: 'both-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/both-scroll-area-demo').then(
            (m) => m.BothScrollAreaDemo,
          ),
      },
      {
        path: 'scroll-fade-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/scroll-fade-scroll-area-demo').then(
            (m) => m.ScrollFadeScrollAreaDemo,
          ),
      },
      {
        path: 'rtl-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/rtl-scroll-area-demo').then(
            (m) => m.RtlScrollAreaDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/scrollbar',
    children: [
      {
        path: 'scrollbar-usage-demo',
        loadComponent: () =>
          import('../pages/docs/scrollbar/demos/scrollbar-usage-demo').then(
            (m) => m.ScrollbarUsageDemo,
          ),
      },
      {
        path: 'tuning-scrollbar-demo',
        loadComponent: () =>
          import('../pages/docs/scrollbar/demos/tuning-scrollbar-demo').then(
            (m) => m.TuningScrollbarDemo,
          ),
      },
      {
        path: 'opting-out-scrollbar-demo',
        loadComponent: () =>
          import('../pages/docs/scrollbar/demos/opting-out-scrollbar-demo').then(
            (m) => m.OptingOutScrollbarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/select',
    children: [
      {
        path: 'select-usage-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-usage-demo').then(
            (m) => m.SelectUsageDemo,
          ),
      },
      {
        path: 'groups-select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/groups-select-demo').then(
            (m) => m.GroupsSelectDemo,
          ),
      },
      {
        path: 'scrollable-select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/scrollable-select-demo').then(
            (m) => m.ScrollableSelectDemo,
          ),
      },
      {
        path: 'disabled-select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/disabled-select-demo').then(
            (m) => m.DisabledSelectDemo,
          ),
      },
      {
        path: 'invalid-select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/invalid-select-demo').then(
            (m) => m.InvalidSelectDemo,
          ),
      },
      {
        path: 'rtl-select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/rtl-select-demo').then(
            (m) => m.RtlSelectDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/separator',
    children: [
      {
        path: 'separator-usage-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/separator-usage-demo').then(
            (m) => m.SeparatorUsageDemo,
          ),
      },
      {
        path: 'list-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/list-separator-demo').then(
            (m) => m.ListSeparatorDemo,
          ),
      },
      {
        path: 'menu-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/menu-separator-demo').then(
            (m) => m.MenuSeparatorDemo,
          ),
      },
      {
        path: 'vertical-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/vertical-separator-demo').then(
            (m) => m.VerticalSeparatorDemo,
          ),
      },
      {
        path: 'rtl-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/rtl-separator-demo').then(
            (m) => m.RtlSeparatorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sheet',
    children: [
      {
        path: 'sheet-usage-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/sheet-usage-demo').then(
            (m) => m.SheetUsageDemo,
          ),
      },
      {
        path: 'side-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/side-sheet-demo').then(
            (m) => m.SideSheetDemo,
          ),
      },
      {
        path: 'inline-side-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/inline-side-sheet-demo').then(
            (m) => m.InlineSideSheetDemo,
          ),
      },
      {
        path: 'no-close-button-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/no-close-button-sheet-demo').then(
            (m) => m.NoCloseButtonSheetDemo,
          ),
      },
      {
        path: 'rtl-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/rtl-sheet-demo').then(
            (m) => m.RtlSheetDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/signature-pad',
    children: [
      {
        path: 'signature-pad-usage-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/signature-pad-usage-demo').then(
            (m) => m.SignaturePadUsageDemo,
          ),
      },
      {
        path: 'form-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/form-signature-pad-demo').then(
            (m) => m.FormSignaturePadDemo,
          ),
      },
      {
        path: 'pen-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/pen-signature-pad-demo').then(
            (m) => m.PenSignaturePadDemo,
          ),
      },
      {
        path: 'export-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/export-signature-pad-demo').then(
            (m) => m.ExportSignaturePadDemo,
          ),
      },
      {
        path: 'readonly-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/readonly-signature-pad-demo').then(
            (m) => m.ReadonlySignaturePadDemo,
          ),
      },
      {
        path: 'type-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/type-signature-pad-demo').then(
            (m) => m.TypeSignaturePadDemo,
          ),
      },
      {
        path: 'rtl-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/rtl-signature-pad-demo').then(
            (m) => m.RtlSignaturePadDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/skeleton',
    children: [
      {
        path: 'skeleton-usage-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/skeleton-usage-demo').then(
            (m) => m.SkeletonUsageDemo,
          ),
      },
      {
        path: 'avatar-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/avatar-skeleton-demo').then(
            (m) => m.AvatarSkeletonDemo,
          ),
      },
      {
        path: 'card-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/card-skeleton-demo').then(
            (m) => m.CardSkeletonDemo,
          ),
      },
      {
        path: 'text-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/text-skeleton-demo').then(
            (m) => m.TextSkeletonDemo,
          ),
      },
      {
        path: 'form-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/form-skeleton-demo').then(
            (m) => m.FormSkeletonDemo,
          ),
      },
      {
        path: 'table-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/table-skeleton-demo').then(
            (m) => m.TableSkeletonDemo,
          ),
      },
      {
        path: 'rtl-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/rtl-skeleton-demo').then(
            (m) => m.RtlSkeletonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sortable',
    children: [
      {
        path: 'sortable-usage-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/sortable-usage-demo').then(
            (m) => m.SortableUsageDemo,
          ),
      },
      {
        path: 'handle-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/handle-sortable-demo').then(
            (m) => m.HandleSortableDemo,
          ),
      },
      {
        path: 'horizontal-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/horizontal-sortable-demo').then(
            (m) => m.HorizontalSortableDemo,
          ),
      },
      {
        path: 'grid-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/grid-sortable-demo').then(
            (m) => m.GridSortableDemo,
          ),
      },
      {
        path: 'buttons-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/buttons-sortable-demo').then(
            (m) => m.ButtonsSortableDemo,
          ),
      },
      {
        path: 'linked-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/linked-sortable-demo').then(
            (m) => m.LinkedSortableDemo,
          ),
      },
      {
        path: 'disabled-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/disabled-sortable-demo').then(
            (m) => m.DisabledSortableDemo,
          ),
      },
      {
        path: 'rtl-sortable-demo',
        loadComponent: () =>
          import('../pages/docs/sortable/demos/rtl-sortable-demo').then(
            (m) => m.RtlSortableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/spinner',
    children: [
      {
        path: 'spinner-usage-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/spinner-usage-demo').then(
            (m) => m.SpinnerUsageDemo,
          ),
      },
      {
        path: 'size-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/size-spinner-demo').then(
            (m) => m.SizeSpinnerDemo,
          ),
      },
      {
        path: 'button-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/button-spinner-demo').then(
            (m) => m.ButtonSpinnerDemo,
          ),
      },
      {
        path: 'badge-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/badge-spinner-demo').then(
            (m) => m.BadgeSpinnerDemo,
          ),
      },
      {
        path: 'input-group-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/input-group-spinner-demo').then(
            (m) => m.InputGroupSpinnerDemo,
          ),
      },
      {
        path: 'empty-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/empty-spinner-demo').then(
            (m) => m.EmptySpinnerDemo,
          ),
      },
      {
        path: 'custom-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/custom-spinner-demo').then(
            (m) => m.CustomSpinnerDemo,
          ),
      },
      {
        path: 'rtl-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/rtl-spinner-demo').then(
            (m) => m.RtlSpinnerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/stepper',
    children: [
      {
        path: 'stepper-usage-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/stepper-usage-demo').then(
            (m) => m.StepperUsageDemo,
          ),
      },
      {
        path: 'numbers-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/numbers-stepper-demo').then(
            (m) => m.NumbersStepperDemo,
          ),
      },
      {
        path: 'vertical-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/vertical-stepper-demo').then(
            (m) => m.VerticalStepperDemo,
          ),
      },
      {
        path: 'linear-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/linear-stepper-demo').then(
            (m) => m.LinearStepperDemo,
          ),
      },
      {
        path: 'rtl-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/rtl-stepper-demo').then(
            (m) => m.RtlStepperDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tabs',
    children: [
      {
        path: 'tabs-usage-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/tabs-usage-demo').then(
            (m) => m.TabsUsageDemo,
          ),
      },
      {
        path: 'line-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/line-tabs-demo').then(
            (m) => m.LineTabsDemo,
          ),
      },
      {
        path: 'vertical-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/vertical-tabs-demo').then(
            (m) => m.VerticalTabsDemo,
          ),
      },
      {
        path: 'disabled-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/disabled-tabs-demo').then(
            (m) => m.DisabledTabsDemo,
          ),
      },
      {
        path: 'icons-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/icons-tabs-demo').then(
            (m) => m.IconsTabsDemo,
          ),
      },
      {
        path: 'rtl-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/rtl-tabs-demo').then(
            (m) => m.RtlTabsDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/table',
    children: [
      {
        path: 'table-usage-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/table-usage-demo').then(
            (m) => m.TableUsageDemo,
          ),
      },
      {
        path: 'footer-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/footer-table-demo').then(
            (m) => m.FooterTableDemo,
          ),
      },
      {
        path: 'scrolling-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/scrolling-table-demo').then(
            (m) => m.ScrollingTableDemo,
          ),
      },
      {
        path: 'rtl-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/rtl-table-demo').then(
            (m) => m.RtlTableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/playlist',
    children: [
      {
        path: 'playlist-usage-demo',
        loadComponent: () =>
          import('../pages/docs/playlist/demos/playlist-usage-demo').then(
            (m) => m.PlaylistUsageDemo,
          ),
      },
      {
        path: 'rtl-playlist-demo',
        loadComponent: () =>
          import('../pages/docs/playlist/demos/rtl-playlist-demo').then(
            (m) => m.RtlPlaylistDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/transfer-list',
    children: [
      {
        path: 'transfer-list-usage-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/transfer-list-usage-demo').then(
            (m) => m.TransferListUsageDemo,
          ),
      },
      {
        path: 'ordered-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/ordered-transfer-list-demo').then(
            (m) => m.OrderedTransferListDemo,
          ),
      },
      {
        path: 'form-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/form-transfer-list-demo').then(
            (m) => m.FormTransferListDemo,
          ),
      },
      {
        path: 'rtl-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/rtl-transfer-list-demo').then(
            (m) => m.RtlTransferListDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/countdown',
    children: [
      {
        path: 'countdown-usage-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/countdown-usage-demo').then(
            (m) => m.CountdownUsageDemo,
          ),
      },
      {
        path: 'timer-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/timer-countdown-demo').then(
            (m) => m.TimerCountdownDemo,
          ),
      },
      {
        path: 'rtl-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/rtl-countdown-demo').then(
            (m) => m.RtlCountdownDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/multiselect',
    children: [
      {
        path: 'multiselect-usage-demo',
        loadComponent: () =>
          import('../pages/docs/multiselect/demos/multiselect-usage-demo').then(
            (m) => m.MultiselectUsageDemo,
          ),
      },
      {
        path: 'form-multiselect-demo',
        loadComponent: () =>
          import('../pages/docs/multiselect/demos/form-multiselect-demo').then(
            (m) => m.FormMultiselectDemo,
          ),
      },
      {
        path: 'select-all-multiselect-demo',
        loadComponent: () =>
          import('../pages/docs/multiselect/demos/select-all-multiselect-demo').then(
            (m) => m.SelectAllMultiselectDemo,
          ),
      },
      {
        path: 'rtl-multiselect-demo',
        loadComponent: () =>
          import('../pages/docs/multiselect/demos/rtl-multiselect-demo').then(
            (m) => m.RtlMultiselectDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/stat-card',
    children: [
      {
        path: 'stat-card-usage-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/stat-card-usage-demo').then(
            (m) => m.StatCardUsageDemo,
          ),
      },
      {
        path: 'dashboard-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/dashboard-stat-card-demo').then(
            (m) => m.DashboardStatCardDemo,
          ),
      },
      {
        path: 'good-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/good-stat-card-demo').then(
            (m) => m.GoodStatCardDemo,
          ),
      },
      {
        path: 'rtl-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/rtl-stat-card-demo').then(
            (m) => m.RtlStatCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/notification-center',
    children: [
      {
        path: 'notification-center-usage-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/notification-center-usage-demo').then(
            (m) => m.NotificationCenterUsageDemo,
          ),
      },
      {
        path: 'by-day-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/by-day-notification-center-demo').then(
            (m) => m.ByDayNotificationCenterDemo,
          ),
      },
      {
        path: 'rtl-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/rtl-notification-center-demo').then(
            (m) => m.RtlNotificationCenterDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tags-input',
    children: [
      {
        path: 'tags-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/tags-input/demos/tags-input-usage-demo').then(
            (m) => m.TagsInputUsageDemo,
          ),
      },
      {
        path: 'emails-tags-input-demo',
        loadComponent: () =>
          import('../pages/docs/tags-input/demos/emails-tags-input-demo').then(
            (m) => m.EmailsTagsInputDemo,
          ),
      },
      {
        path: 'limit-tags-input-demo',
        loadComponent: () =>
          import('../pages/docs/tags-input/demos/limit-tags-input-demo').then(
            (m) => m.LimitTagsInputDemo,
          ),
      },
      {
        path: 'form-tags-input-demo',
        loadComponent: () =>
          import('../pages/docs/tags-input/demos/form-tags-input-demo').then(
            (m) => m.FormTagsInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/textarea',
    children: [
      {
        path: 'textarea-usage-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/textarea-usage-demo').then(
            (m) => m.TextareaUsageDemo,
          ),
      },
      {
        path: 'field-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/field-textarea-demo').then(
            (m) => m.FieldTextareaDemo,
          ),
      },
      {
        path: 'disabled-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/disabled-textarea-demo').then(
            (m) => m.DisabledTextareaDemo,
          ),
      },
      {
        path: 'invalid-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/invalid-textarea-demo').then(
            (m) => m.InvalidTextareaDemo,
          ),
      },
      {
        path: 'button-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/button-textarea-demo').then(
            (m) => m.ButtonTextareaDemo,
          ),
      },
      {
        path: 'rtl-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/rtl-textarea-demo').then(
            (m) => m.RtlTextareaDemo,
          ),
      },
      {
        path: 'form-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/form-textarea-demo').then(
            (m) => m.FormTextareaDemo,
          ),
      },
      {
        path: 'maxlength-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/maxlength-textarea-demo').then(
            (m) => m.MaxlengthTextareaDemo,
          ),
      },
      {
        path: 'rows-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/rows-textarea-demo').then(
            (m) => m.RowsTextareaDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/theming',
    children: [
      {
        path: 'theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theming/demos/theme-toggle-demo').then(
            (m) => m.ThemeToggleDemo,
          ),
      },
      {
        path: 'theme-menu-demo',
        loadComponent: () =>
          import('../pages/docs/theming/demos/theme-menu-demo').then(
            (m) => m.ThemeMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-picker',
    children: [
      {
        path: 'confirm-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/confirm-time-picker-demo').then(
            (m) => m.ConfirmTimePickerDemo,
          ),
      },
      {
        path: 'stays-open-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/stays-open-time-picker-demo').then(
            (m) => m.StaysOpenTimePickerDemo,
          ),
      },
      {
        path: 'time-picker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/time-picker-usage-demo').then(
            (m) => m.TimePickerUsageDemo,
          ),
      },
      {
        path: 'hour-cycle-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/hour-cycle-time-picker-demo').then(
            (m) => m.HourCycleTimePickerDemo,
          ),
      },
      {
        path: 'steps-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/steps-time-picker-demo').then(
            (m) => m.StepsTimePickerDemo,
          ),
      },
      {
        path: 'limits-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/limits-time-picker-demo').then(
            (m) => m.LimitsTimePickerDemo,
          ),
      },
      {
        path: 'range-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/range-time-picker-demo').then(
            (m) => m.RangeTimePickerDemo,
          ),
      },
      {
        path: 'now-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/now-time-picker-demo').then(
            (m) => m.NowTimePickerDemo,
          ),
      },
      {
        path: 'locale-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/locale-time-picker-demo').then(
            (m) => m.LocaleTimePickerDemo,
          ),
      },
      {
        path: 'disabled-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/disabled-time-picker-demo').then(
            (m) => m.DisabledTimePickerDemo,
          ),
      },
      {
        path: 'form-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/form-time-picker-demo').then(
            (m) => m.FormTimePickerDemo,
          ),
      },
      {
        path: 'rtl-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/rtl-time-picker-demo').then(
            (m) => m.RtlTimePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-input',
    children: [
      {
        path: 'time-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/time-input-usage-demo').then(
            (m) => m.TimeInputUsageDemo,
          ),
      },
      {
        path: 'hour-cycle-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/hour-cycle-time-input-demo').then(
            (m) => m.HourCycleTimeInputDemo,
          ),
      },
      {
        path: 'limits-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/limits-time-input-demo').then(
            (m) => m.LimitsTimeInputDemo,
          ),
      },
      {
        path: 'locale-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/locale-time-input-demo').then(
            (m) => m.LocaleTimeInputDemo,
          ),
      },
      {
        path: 'disabled-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/disabled-time-input-demo').then(
            (m) => m.DisabledTimeInputDemo,
          ),
      },
      {
        path: 'read-only-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/read-only-time-input-demo').then(
            (m) => m.ReadOnlyTimeInputDemo,
          ),
      },
      {
        path: 'form-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/form-time-input-demo').then(
            (m) => m.FormTimeInputDemo,
          ),
      },
      {
        path: 'controlled-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/controlled-time-input-demo').then(
            (m) => m.ControlledTimeInputDemo,
          ),
      },
      {
        path: 'rtl-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/rtl-time-input-demo').then(
            (m) => m.RtlTimeInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/trigger-menu',
    children: [
      {
        path: 'textarea-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/textarea-trigger-menu-demo').then(
            (m) => m.TextareaTriggerMenuDemo,
          ),
      },
      {
        path: 'input-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/input-trigger-menu-demo').then(
            (m) => m.InputTriggerMenuDemo,
          ),
      },
      {
        path: 'form-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/form-trigger-menu-demo').then(
            (m) => m.FormTriggerMenuDemo,
          ),
      },
      {
        path: 'trigger-menu-usage-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/trigger-menu-usage-demo').then(
            (m) => m.TriggerMenuUsageDemo,
          ),
      },
      {
        path: 'commands-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/commands-trigger-menu-demo').then(
            (m) => m.CommandsTriggerMenuDemo,
          ),
      },
      {
        path: 'loading-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/loading-trigger-menu-demo').then(
            (m) => m.LoadingTriggerMenuDemo,
          ),
      },
      {
        path: 'rtl-trigger-menu-demo',
        loadComponent: () =>
          import('../pages/docs/trigger-menu/demos/rtl-trigger-menu-demo').then(
            (m) => m.RtlTriggerMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/token-input',
    children: [
      {
        path: 'token-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/token-input-usage-demo').then(
            (m) => m.TokenInputUsageDemo,
          ),
      },
      {
        path: 'mentions-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/mentions-token-input-demo').then(
            (m) => m.MentionsTokenInputDemo,
          ),
      },
      {
        path: 'prompt-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/prompt-token-input-demo').then(
            (m) => m.PromptTokenInputDemo,
          ),
      },
      {
        path: 'deletion-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/deletion-token-input-demo').then(
            (m) => m.DeletionTokenInputDemo,
          ),
      },
      {
        path: 'codec-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/codec-token-input-demo').then(
            (m) => m.CodecTokenInputDemo,
          ),
      },
      {
        path: 'form-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/form-token-input-demo').then(
            (m) => m.FormTokenInputDemo,
          ),
      },
      {
        path: 'methods-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/methods-token-input-demo').then(
            (m) => m.MethodsTokenInputDemo,
          ),
      },
      {
        path: 'submit-shortcut-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/submit-shortcut-token-input-demo').then(
            (m) => m.SubmitShortcutTokenInputDemo,
          ),
      },
      {
        path: 'rtl-token-input-demo',
        loadComponent: () =>
          import('../pages/docs/token-input/demos/rtl-token-input-demo').then(
            (m) => m.RtlTokenInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/listbox',
    children: [
      {
        path: 'listbox-usage-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/listbox-usage-demo').then(
            (m) => m.ListboxUsageDemo,
          ),
      },
      {
        path: 'multiple-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/multiple-listbox-demo').then(
            (m) => m.MultipleListboxDemo,
          ),
      },
      {
        path: 'activation-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/activation-listbox-demo').then(
            (m) => m.ActivationListboxDemo,
          ),
      },
      {
        path: 'manual-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/manual-listbox-demo').then(
            (m) => m.ManualListboxDemo,
          ),
      },
      {
        path: 'virtual-focus-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/virtual-focus-listbox-demo').then(
            (m) => m.VirtualFocusListboxDemo,
          ),
      },
      {
        path: 'deselectable-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/deselectable-listbox-demo').then(
            (m) => m.DeselectableListboxDemo,
          ),
      },
      {
        path: 'groups-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/groups-listbox-demo').then(
            (m) => m.GroupsListboxDemo,
          ),
      },
      {
        path: 'icons-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/icons-listbox-demo').then(
            (m) => m.IconsListboxDemo,
          ),
      },
      {
        path: 'horizontal-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/horizontal-listbox-demo').then(
            (m) => m.HorizontalListboxDemo,
          ),
      },
      {
        path: 'disabled-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/disabled-listbox-demo').then(
            (m) => m.DisabledListboxDemo,
          ),
      },
      {
        path: 'read-only-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/read-only-listbox-demo').then(
            (m) => m.ReadOnlyListboxDemo,
          ),
      },
      {
        path: 'form-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/form-listbox-demo').then(
            (m) => m.FormListboxDemo,
          ),
      },
      {
        path: 'object-values-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/object-values-listbox-demo').then(
            (m) => m.ObjectValuesListboxDemo,
          ),
      },
      {
        path: 'methods-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/methods-listbox-demo').then(
            (m) => m.MethodsListboxDemo,
          ),
      },
      {
        path: 'scrollable-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/scrollable-listbox-demo').then(
            (m) => m.ScrollableListboxDemo,
          ),
      },
      {
        path: 'rtl-listbox-demo',
        loadComponent: () =>
          import('../pages/docs/listbox/demos/rtl-listbox-demo').then(
            (m) => m.RtlListboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/meter',
    children: [
      {
        path: 'meter-usage-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/meter-usage-demo').then(
            (m) => m.MeterUsageDemo,
          ),
      },
      {
        path: 'bounds-meter-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/bounds-meter-demo').then(
            (m) => m.BoundsMeterDemo,
          ),
      },
      {
        path: 'format-meter-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/format-meter-demo').then(
            (m) => m.FormatMeterDemo,
          ),
      },
      {
        path: 'locale-meter-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/locale-meter-demo').then(
            (m) => m.LocaleMeterDemo,
          ),
      },
      {
        path: 'value-label-meter-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/value-label-meter-demo').then(
            (m) => m.ValueLabelMeterDemo,
          ),
      },
      {
        path: 'rtl-meter-demo',
        loadComponent: () =>
          import('../pages/docs/meter/demos/rtl-meter-demo').then(
            (m) => m.RtlMeterDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/segmented-control',
    children: [
      {
        path: 'segmented-control-usage-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/segmented-control-usage-demo').then(
            (m) => m.SegmentedControlUsageDemo,
          ),
      },
      {
        path: 'icons-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/icons-segmented-control-demo').then(
            (m) => m.IconsSegmentedControlDemo,
          ),
      },
      {
        path: 'vertical-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/vertical-segmented-control-demo').then(
            (m) => m.VerticalSegmentedControlDemo,
          ),
      },
      {
        path: 'disabled-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/disabled-segmented-control-demo').then(
            (m) => m.DisabledSegmentedControlDemo,
          ),
      },
      {
        path: 'read-only-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/read-only-segmented-control-demo').then(
            (m) => m.ReadOnlySegmentedControlDemo,
          ),
      },
      {
        path: 'form-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/form-segmented-control-demo').then(
            (m) => m.FormSegmentedControlDemo,
          ),
      },
      {
        path: 'rtl-segmented-control-demo',
        loadComponent: () =>
          import('../pages/docs/segmented-control/demos/rtl-segmented-control-demo').then(
            (m) => m.RtlSegmentedControlDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/preferences',
    children: [
      {
        path: 'preferences-usage-demo',
        loadComponent: () =>
          import('../pages/docs/preferences/demos/preferences-usage-demo').then(
            (m) => m.PreferencesUsageDemo,
          ),
      },
      {
        path: 'read-preference-demo',
        loadComponent: () =>
          import('../pages/docs/preferences/demos/read-preference-demo').then(
            (m) => m.ReadPreferenceDemo,
          ),
      },
      {
        path: 'global-preference-demo',
        loadComponent: () =>
          import('../pages/docs/preferences/demos/global-preference-demo').then(
            (m) => m.GlobalPreferenceDemo,
          ),
      },
      {
        path: 'several-preferences-demo',
        loadComponent: () =>
          import('../pages/docs/preferences/demos/several-preferences-demo').then(
            (m) => m.SeveralPreferencesDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/waterfall',
    children: [
      {
        path: 'waterfall-usage-demo',
        loadComponent: () =>
          import('../pages/docs/waterfall/demos/waterfall-usage-demo').then(
            (m) => m.WaterfallUsageDemo,
          ),
      },
      {
        path: 'nested-waterfall-demo',
        loadComponent: () =>
          import('../pages/docs/waterfall/demos/nested-waterfall-demo').then(
            (m) => m.NestedWaterfallDemo,
          ),
      },
      {
        path: 'zoom-waterfall-demo',
        loadComponent: () =>
          import('../pages/docs/waterfall/demos/zoom-waterfall-demo').then(
            (m) => m.ZoomWaterfallDemo,
          ),
      },
      {
        path: 'large-waterfall-demo',
        loadComponent: () =>
          import('../pages/docs/waterfall/demos/large-waterfall-demo').then(
            (m) => m.LargeWaterfallDemo,
          ),
      },
      {
        path: 'rtl-waterfall-demo',
        loadComponent: () =>
          import('../pages/docs/waterfall/demos/rtl-waterfall-demo').then(
            (m) => m.RtlWaterfallDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/color-picker',
    children: [
      {
        path: 'all-features-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/all-features-color-picker-demo').then(
            (m) => m.AllFeaturesColorPickerDemo,
          ),
      },
      {
        path: 'color-picker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/color-picker-usage-demo').then(
            (m) => m.ColorPickerUsageDemo,
          ),
      },
      {
        path: 'spaces-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/spaces-color-picker-demo').then(
            (m) => m.SpacesColorPickerDemo,
          ),
      },
      {
        path: 'oklch-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/oklch-color-picker-demo').then(
            (m) => m.OklchColorPickerDemo,
          ),
      },
      {
        path: 'presets-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/presets-color-picker-demo').then(
            (m) => m.PresetsColorPickerDemo,
          ),
      },
      {
        path: 'popover-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/popover-color-picker-demo').then(
            (m) => m.PopoverColorPickerDemo,
          ),
      },
      {
        path: 'disabled-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/disabled-color-picker-demo').then(
            (m) => m.DisabledColorPickerDemo,
          ),
      },
      {
        path: 'read-only-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/read-only-color-picker-demo').then(
            (m) => m.ReadOnlyColorPickerDemo,
          ),
      },
      {
        path: 'commit-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/commit-color-picker-demo').then(
            (m) => m.CommitColorPickerDemo,
          ),
      },
      {
        path: 'form-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/form-color-picker-demo').then(
            (m) => m.FormColorPickerDemo,
          ),
      },
      {
        path: 'rtl-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/rtl-color-picker-demo').then(
            (m) => m.RtlColorPickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-clock',
    children: [
      {
        path: 'basic-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/basic-time-clock-demo').then(
            (m) => m.BasicTimeClockDemo,
          ),
      },
      {
        path: 'form-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/form-time-clock-demo').then(
            (m) => m.FormTimeClockDemo,
          ),
      },
      {
        path: 'input-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/input-time-clock-demo').then(
            (m) => m.InputTimeClockDemo,
          ),
      },
      {
        path: 'limits-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/limits-time-clock-demo').then(
            (m) => m.LimitsTimeClockDemo,
          ),
      },
      {
        path: 'locale-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/locale-time-clock-demo').then(
            (m) => m.LocaleTimeClockDemo,
          ),
      },
      {
        path: 'rtl-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/rtl-time-clock-demo').then(
            (m) => m.RtlTimeClockDemo,
          ),
      },
      {
        path: 'seconds-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/seconds-time-clock-demo').then(
            (m) => m.SecondsTimeClockDemo,
          ),
      },
      {
        path: 'step-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/step-time-clock-demo').then(
            (m) => m.StepTimeClockDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/attachment',
    children: [
      {
        path: 'attachment-usage-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/attachment-usage-demo').then(
            (m) => m.AttachmentUsageDemo,
          ),
      },
      {
        path: 'image-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/image-attachment-demo').then(
            (m) => m.ImageAttachmentDemo,
          ),
      },
      {
        path: 'states-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/states-attachment-demo').then(
            (m) => m.StatesAttachmentDemo,
          ),
      },
      {
        path: 'sizes-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/sizes-attachment-demo').then(
            (m) => m.SizesAttachmentDemo,
          ),
      },
      {
        path: 'group-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/group-attachment-demo').then(
            (m) => m.GroupAttachmentDemo,
          ),
      },
      {
        path: 'trigger-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/trigger-attachment-demo').then(
            (m) => m.TriggerAttachmentDemo,
          ),
      },
      {
        path: 'rtl-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/rtl-attachment-demo').then(
            (m) => m.RtlAttachmentDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/bubble',
    children: [
      {
        path: 'bubble-usage-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/bubble-usage-demo').then(
            (m) => m.BubbleUsageDemo,
          ),
      },
      {
        path: 'variants-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/variants-bubble-demo').then(
            (m) => m.VariantsBubbleDemo,
          ),
      },
      {
        path: 'alignment-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/alignment-bubble-demo').then(
            (m) => m.AlignmentBubbleDemo,
          ),
      },
      {
        path: 'group-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/group-bubble-demo').then(
            (m) => m.GroupBubbleDemo,
          ),
      },
      {
        path: 'links-buttons-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/links-buttons-bubble-demo').then(
            (m) => m.LinksButtonsBubbleDemo,
          ),
      },
      {
        path: 'reactions-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/reactions-bubble-demo').then(
            (m) => m.ReactionsBubbleDemo,
          ),
      },
      {
        path: 'show-more-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/show-more-bubble-demo').then(
            (m) => m.ShowMoreBubbleDemo,
          ),
      },
      {
        path: 'tooltip-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/tooltip-bubble-demo').then(
            (m) => m.TooltipBubbleDemo,
          ),
      },
      {
        path: 'popover-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/popover-bubble-demo').then(
            (m) => m.PopoverBubbleDemo,
          ),
      },
      {
        path: 'rtl-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/rtl-bubble-demo').then(
            (m) => m.RtlBubbleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/questionnaire',
    children: [
      {
        path: 'questionnaire-usage-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/questionnaire-usage-demo').then(
            (m) => m.QuestionnaireUsageDemo,
          ),
      },
      {
        path: 'skip-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/skip-questionnaire-demo').then(
            (m) => m.SkipQuestionnaireDemo,
          ),
      },
      {
        path: 'multiple-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/multiple-questionnaire-demo').then(
            (m) => m.MultipleQuestionnaireDemo,
          ),
      },
      {
        path: 'shortcuts-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/shortcuts-questionnaire-demo').then(
            (m) => m.ShortcutsQuestionnaireDemo,
          ),
      },
      {
        path: 'validation-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/validation-questionnaire-demo').then(
            (m) => m.ValidationQuestionnaireDemo,
          ),
      },
      {
        path: 'controlled-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/controlled-questionnaire-demo').then(
            (m) => m.ControlledQuestionnaireDemo,
          ),
      },
      {
        path: 'resume-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/resume-questionnaire-demo').then(
            (m) => m.ResumeQuestionnaireDemo,
          ),
      },
      {
        path: 'conditional-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/conditional-questionnaire-demo').then(
            (m) => m.ConditionalQuestionnaireDemo,
          ),
      },
      {
        path: 'navigation-state-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/navigation-state-questionnaire-demo').then(
            (m) => m.NavigationStateQuestionnaireDemo,
          ),
      },
      {
        path: 'progress-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/progress-questionnaire-demo').then(
            (m) => m.ProgressQuestionnaireDemo,
          ),
      },
      {
        path: 'animated-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/animated-questionnaire-demo').then(
            (m) => m.AnimatedQuestionnaireDemo,
          ),
      },
      {
        path: 'card-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/card-questionnaire-demo').then(
            (m) => m.CardQuestionnaireDemo,
          ),
      },
      {
        path: 'dialog-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/dialog-questionnaire-demo').then(
            (m) => m.DialogQuestionnaireDemo,
          ),
      },
      {
        path: 'freeform-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/freeform-questionnaire-demo').then(
            (m) => m.FreeformQuestionnaireDemo,
          ),
      },
      {
        path: 'rtl-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/rtl-questionnaire-demo').then(
            (m) => m.RtlQuestionnaireDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tree',
    children: [
      {
        path: 'tree-usage-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/tree-usage-demo').then(
            (m) => m.TreeUsageDemo,
          ),
      },
      {
        path: 'data-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/data-tree-demo').then(
            (m) => m.DataTreeDemo,
          ),
      },
      {
        path: 'multiple-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/multiple-tree-demo').then(
            (m) => m.MultipleTreeDemo,
          ),
      },
      {
        path: 'checkboxes-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/checkboxes-tree-demo').then(
            (m) => m.CheckboxesTreeDemo,
          ),
      },
      {
        path: 'links-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/links-tree-demo').then(
            (m) => m.LinksTreeDemo,
          ),
      },
      {
        path: 'disabled-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/disabled-tree-demo').then(
            (m) => m.DisabledTreeDemo,
          ),
      },
      {
        path: 'lazy-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/lazy-tree-demo').then(
            (m) => m.LazyTreeDemo,
          ),
      },
      {
        path: 'controller-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/controller-tree-demo').then(
            (m) => m.ControllerTreeDemo,
          ),
      },
      {
        path: 'rtl-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/rtl-tree-demo').then(
            (m) => m.RtlTreeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tree-table',
    children: [
      {
        path: 'basic-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/basic-tree-table-demo').then(
            (m) => m.BasicTreeTableDemo,
          ),
      },
      {
        path: 'expand-all-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/expand-all-tree-table-demo').then(
            (m) => m.ExpandAllTreeTableDemo,
          ),
      },
      {
        path: 'selection-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/selection-tree-table-demo').then(
            (m) => m.SelectionTreeTableDemo,
          ),
      },
      {
        path: 'sorting-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/sorting-tree-table-demo').then(
            (m) => m.SortingTreeTableDemo,
          ),
      },
      {
        path: 'filter-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/filter-tree-table-demo').then(
            (m) => m.FilterTreeTableDemo,
          ),
      },
      {
        path: 'rtl-tree-table-demo',
        loadComponent: () =>
          import('../pages/docs/tree-table/demos/rtl-tree-table-demo').then(
            (m) => m.RtlTreeTableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/header',
    children: [
      {
        path: 'header-usage-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/header-usage-demo').then(
            (m) => m.HeaderUsageDemo,
          ),
      },
      {
        path: 'basic-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/basic-header-demo').then(
            (m) => m.BasicHeaderDemo,
          ),
      },
      {
        path: 'mobile-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/mobile-header-demo').then(
            (m) => m.MobileHeaderDemo,
          ),
      },
      {
        path: 'push-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/push-header-demo').then(
            (m) => m.PushHeaderDemo,
          ),
      },
      {
        path: 'navigation-menu-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/navigation-menu-header-demo').then(
            (m) => m.NavigationMenuHeaderDemo,
          ),
      },
      {
        path: 'sticky-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/sticky-header-demo').then(
            (m) => m.StickyHeaderDemo,
          ),
      },
      {
        path: 'rtl-header-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/header/demos/rtl-header-demo').then(
            (m) => m.RtlHeaderDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/navigation-menu',
    children: [
      {
        path: 'navigation-menu-usage-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/navigation-menu-usage-demo').then(
            (m) => m.NavigationMenuUsageDemo,
          ),
      },
      {
        path: 'open-item-navigation-menu-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/open-item-navigation-menu-demo').then(
            (m) => m.OpenItemNavigationMenuDemo,
          ),
      },
      {
        path: 'separate-navigation-menu-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/separate-navigation-menu-demo').then(
            (m) => m.SeparateNavigationMenuDemo,
          ),
      },
      {
        path: 'align-navigation-menu-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/align-navigation-menu-demo').then(
            (m) => m.AlignNavigationMenuDemo,
          ),
      },
      {
        path: 'rtl-navigation-menu-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/rtl-navigation-menu-demo').then(
            (m) => m.RtlNavigationMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sidebar',
    children: [
      {
        path: 'sidebar-usage-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/sidebar-usage-demo').then(
            (m) => m.SidebarUsageDemo,
          ),
      },
      {
        path: 'header-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/header-sidebar-demo').then(
            (m) => m.HeaderSidebarDemo,
          ),
      },
      {
        path: 'footer-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/footer-sidebar-demo').then(
            (m) => m.FooterSidebarDemo,
          ),
      },
      {
        path: 'group-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/group-sidebar-demo').then(
            (m) => m.GroupSidebarDemo,
          ),
      },
      {
        path: 'collapsible-group-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/collapsible-group-sidebar-demo').then(
            (m) => m.CollapsibleGroupSidebarDemo,
          ),
      },
      {
        path: 'group-action-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/group-action-sidebar-demo').then(
            (m) => m.GroupActionSidebarDemo,
          ),
      },
      {
        path: 'menu-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/menu-sidebar-demo').then(
            (m) => m.MenuSidebarDemo,
          ),
      },
      {
        path: 'menu-action-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/menu-action-sidebar-demo').then(
            (m) => m.MenuActionSidebarDemo,
          ),
      },
      {
        path: 'sub-menu-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/sub-menu-sidebar-demo').then(
            (m) => m.SubMenuSidebarDemo,
          ),
      },
      {
        path: 'collapsible-menu-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/collapsible-menu-sidebar-demo').then(
            (m) => m.CollapsibleMenuSidebarDemo,
          ),
      },
      {
        path: 'menu-badge-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/menu-badge-sidebar-demo').then(
            (m) => m.MenuBadgeSidebarDemo,
          ),
      },
      {
        path: 'skeleton-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/skeleton-sidebar-demo').then(
            (m) => m.SkeletonSidebarDemo,
          ),
      },
      {
        path: 'controlled-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/controlled-sidebar-demo').then(
            (m) => m.ControlledSidebarDemo,
          ),
      },
      {
        path: 'icon-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/icon-sidebar-demo').then(
            (m) => m.IconSidebarDemo,
          ),
      },
      {
        path: 'floating-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/floating-sidebar-demo').then(
            (m) => m.FloatingSidebarDemo,
          ),
      },
      {
        path: 'inset-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/inset-sidebar-demo').then(
            (m) => m.InsetSidebarDemo,
          ),
      },
      {
        path: 'rtl-sidebar-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/rtl-sidebar-demo').then(
            (m) => m.RtlSidebarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/gantt',
    children: [
      {
        path: 'basic-gantt-demo',
        loadComponent: () =>
          import('../pages/docs/gantt/demos/basic-gantt-demo').then(
            (m) => m.BasicGanttDemo,
          ),
      },
      {
        path: 'scales-gantt-demo',
        loadComponent: () =>
          import('../pages/docs/gantt/demos/scales-gantt-demo').then(
            (m) => m.ScalesGanttDemo,
          ),
      },
      {
        path: 'milestones-gantt-demo',
        loadComponent: () =>
          import('../pages/docs/gantt/demos/milestones-gantt-demo').then(
            (m) => m.MilestonesGanttDemo,
          ),
      },
      {
        path: 'rtl-gantt-demo',
        loadComponent: () =>
          import('../pages/docs/gantt/demos/rtl-gantt-demo').then(
            (m) => m.RtlGanttDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/trace',
    children: [
      {
        path: 'trace-usage-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/trace-usage-demo').then(
            (m) => m.TraceUsageDemo,
          ),
      },
      {
        path: 'line-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/line-trace-demo').then(
            (m) => m.LineTraceDemo,
          ),
      },
      {
        path: 'status-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/status-trace-demo').then(
            (m) => m.StatusTraceDemo,
          ),
      },
      {
        path: 'description-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/description-trace-demo').then(
            (m) => m.DescriptionTraceDemo,
          ),
      },
      {
        path: 'collapsible-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/collapsible-trace-demo').then(
            (m) => m.CollapsibleTraceDemo,
          ),
      },
      {
        path: 'open-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/open-trace-demo').then(
            (m) => m.OpenTraceDemo,
          ),
      },
      {
        path: 'link-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/link-trace-demo').then(
            (m) => m.LinkTraceDemo,
          ),
      },
      {
        path: 'dialog-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/dialog-trace-demo').then(
            (m) => m.DialogTraceDemo,
          ),
      },
      {
        path: 'sheet-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/sheet-trace-demo').then(
            (m) => m.SheetTraceDemo,
          ),
      },
      {
        path: 'group-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/group-trace-demo').then(
            (m) => m.GroupTraceDemo,
          ),
      },
      {
        path: 'sources-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/sources-trace-demo').then(
            (m) => m.SourcesTraceDemo,
          ),
      },
      {
        path: 'chain-of-thought-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/chain-of-thought-trace-demo').then(
            (m) => m.ChainOfThoughtTraceDemo,
          ),
      },
      {
        path: 'commit-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/commit-trace-demo').then(
            (m) => m.CommitTraceDemo,
          ),
      },
      {
        path: 'turn-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/turn-trace-demo').then(
            (m) => m.TurnTraceDemo,
          ),
      },
      {
        path: 'reasoning-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/reasoning-trace-demo').then(
            (m) => m.ReasoningTraceDemo,
          ),
      },
      {
        path: 'tool-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/tool-trace-demo').then(
            (m) => m.ToolTraceDemo,
          ),
      },
      {
        path: 'rtl-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/rtl-trace-demo').then(
            (m) => m.RtlTraceDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/message-scroller',
    children: [
      {
        path: 'message-scroller-usage-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/message-scroller-usage-demo').then(
            (m) => m.MessageScrollerUsageDemo,
          ),
      },
      {
        path: 'anchoring-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/anchoring-message-scroller-demo').then(
            (m) => m.AnchoringMessageScrollerDemo,
          ),
      },
      {
        path: 'group-chat-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/group-chat-message-scroller-demo').then(
            (m) => m.GroupChatMessageScrollerDemo,
          ),
      },
      {
        path: 'previous-context-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/previous-context-message-scroller-demo').then(
            (m) => m.PreviousContextMessageScrollerDemo,
          ),
      },
      {
        path: 'streaming-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/streaming-message-scroller-demo').then(
            (m) => m.StreamingMessageScrollerDemo,
          ),
      },
      {
        path: 'position-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/position-message-scroller-demo').then(
            (m) => m.PositionMessageScrollerDemo,
          ),
      },
      {
        path: 'history-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/history-message-scroller-demo').then(
            (m) => m.HistoryMessageScrollerDemo,
          ),
      },
      {
        path: 'animation-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/animation-message-scroller-demo').then(
            (m) => m.AnimationMessageScrollerDemo,
          ),
      },
      {
        path: 'commands-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/commands-message-scroller-demo').then(
            (m) => m.CommandsMessageScrollerDemo,
          ),
      },
      {
        path: 'visibility-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/visibility-message-scroller-demo').then(
            (m) => m.VisibilityMessageScrollerDemo,
          ),
      },
      {
        path: 'scrollable-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/scrollable-message-scroller-demo').then(
            (m) => m.ScrollableMessageScrollerDemo,
          ),
      },
      {
        path: 'rtl-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/rtl-message-scroller-demo').then(
            (m) => m.RtlMessageScrollerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/message',
    children: [
      {
        path: 'message-usage-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/message-usage-demo').then(
            (m) => m.MessageUsageDemo,
          ),
      },
      {
        path: 'avatar-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/avatar-message-demo').then(
            (m) => m.AvatarMessageDemo,
          ),
      },
      {
        path: 'group-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/group-message-demo').then(
            (m) => m.GroupMessageDemo,
          ),
      },
      {
        path: 'header-footer-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/header-footer-message-demo').then(
            (m) => m.HeaderFooterMessageDemo,
          ),
      },
      {
        path: 'actions-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/actions-message-demo').then(
            (m) => m.ActionsMessageDemo,
          ),
      },
      {
        path: 'attachment-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/attachment-message-demo').then(
            (m) => m.AttachmentMessageDemo,
          ),
      },
      {
        path: 'status-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/status-message-demo').then(
            (m) => m.StatusMessageDemo,
          ),
      },
      {
        path: 'pattern-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/pattern-message-demo').then(
            (m) => m.PatternMessageDemo,
          ),
      },
      {
        path: 'rtl-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/rtl-message-demo').then(
            (m) => m.RtlMessageDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/marker',
    children: [
      {
        path: 'marker-usage-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/marker-usage-demo').then(
            (m) => m.MarkerUsageDemo,
          ),
      },
      {
        path: 'variants-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/variants-marker-demo').then(
            (m) => m.VariantsMarkerDemo,
          ),
      },
      {
        path: 'status-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/status-marker-demo').then(
            (m) => m.StatusMarkerDemo,
          ),
      },
      {
        path: 'shimmer-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/shimmer-marker-demo').then(
            (m) => m.ShimmerMarkerDemo,
          ),
      },
      {
        path: 'separator-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/separator-marker-demo').then(
            (m) => m.SeparatorMarkerDemo,
          ),
      },
      {
        path: 'border-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/border-marker-demo').then(
            (m) => m.BorderMarkerDemo,
          ),
      },
      {
        path: 'icon-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/icon-marker-demo').then(
            (m) => m.IconMarkerDemo,
          ),
      },
      {
        path: 'links-buttons-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/links-buttons-marker-demo').then(
            (m) => m.LinksButtonsMarkerDemo,
          ),
      },
      {
        path: 'rtl-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/rtl-marker-demo').then(
            (m) => m.RtlMarkerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/timeline',
    children: [
      {
        path: 'timeline-usage-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/timeline-usage-demo').then(
            (m) => m.TimelineUsageDemo,
          ),
      },
      {
        path: 'horizontal-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/horizontal-timeline-demo').then(
            (m) => m.HorizontalTimelineDemo,
          ),
      },
      {
        path: 'alternate-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/alternate-timeline-demo').then(
            (m) => m.AlternateTimelineDemo,
          ),
      },
      {
        path: 'failure-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/failure-timeline-demo').then(
            (m) => m.FailureTimelineDemo,
          ),
      },
      {
        path: 'status-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/status-timeline-demo').then(
            (m) => m.StatusTimelineDemo,
          ),
      },
      {
        path: 'details-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/details-timeline-demo').then(
            (m) => m.DetailsTimelineDemo,
          ),
      },
      {
        path: 'feed-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/feed-timeline-demo').then(
            (m) => m.FeedTimelineDemo,
          ),
      },
      {
        path: 'rtl-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/rtl-timeline-demo').then(
            (m) => m.RtlTimelineDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toast',
    children: [
      {
        path: 'toast-usage-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/toast-usage-demo').then(
            (m) => m.ToastUsageDemo,
          ),
      },
      {
        path: 'types-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/types-toast-demo').then(
            (m) => m.TypesToastDemo,
          ),
      },
      {
        path: 'duration-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/duration-toast-demo').then(
            (m) => m.DurationToastDemo,
          ),
      },
      {
        path: 'position-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/position-toast-demo').then(
            (m) => m.PositionToastDemo,
          ),
      },
      {
        path: 'stacked-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/stacked-toast-demo').then(
            (m) => m.StackedToastDemo,
          ),
      },
      {
        path: 'update-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/update-toast-demo').then(
            (m) => m.UpdateToastDemo,
          ),
      },
      {
        path: 'promise-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/promise-toast-demo').then(
            (m) => m.PromiseToastDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toc',
    children: [
      {
        path: 'toc-usage-demo',
        data: { fullPage: true },
        loadComponent: () =>
          import('../pages/docs/toc/demos/toc-usage-demo').then(
            (m) => m.TocUsageDemo,
          ),
      },
      {
        path: 'basic-toc-demo',
        loadComponent: () =>
          import('../pages/docs/toc/demos/basic-toc-demo').then(
            (m) => m.BasicTocDemo,
          ),
      },
      {
        path: 'levels-toc-demo',
        loadComponent: () =>
          import('../pages/docs/toc/demos/levels-toc-demo').then(
            (m) => m.LevelsTocDemo,
          ),
      },
      {
        path: 'links-toc-demo',
        loadComponent: () =>
          import('../pages/docs/toc/demos/links-toc-demo').then(
            (m) => m.LinksTocDemo,
          ),
      },
      {
        path: 'rtl-toc-demo',
        loadComponent: () =>
          import('../pages/docs/toc/demos/rtl-toc-demo').then(
            (m) => m.RtlTocDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toggle',
    children: [
      {
        path: 'toggle-usage-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/toggle-usage-demo').then(
            (m) => m.ToggleUsageDemo,
          ),
      },
      {
        path: 'outline-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/outline-toggle-demo').then(
            (m) => m.OutlineToggleDemo,
          ),
      },
      {
        path: 'rtl-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/rtl-toggle-demo').then(
            (m) => m.RtlToggleDemo,
          ),
      },
      {
        path: 'with-text-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/with-text-toggle-demo').then(
            (m) => m.WithTextToggleDemo,
          ),
      },
      {
        path: 'sizes-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/sizes-toggle-demo').then(
            (m) => m.SizesToggleDemo,
          ),
      },
      {
        path: 'disabled-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/disabled-toggle-demo').then(
            (m) => m.DisabledToggleDemo,
          ),
      },
      {
        path: 'toolbar-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/toolbar-toggle-demo').then(
            (m) => m.ToolbarToggleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toggle-group',
    children: [
      {
        path: 'toggle-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/toggle-group-usage-demo').then(
            (m) => m.ToggleGroupUsageDemo,
          ),
      },
      {
        path: 'outline-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/outline-toggle-group-demo').then(
            (m) => m.OutlineToggleGroupDemo,
          ),
      },
      {
        path: 'sizes-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/sizes-toggle-group-demo').then(
            (m) => m.SizesToggleGroupDemo,
          ),
      },
      {
        path: 'spacing-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/spacing-toggle-group-demo').then(
            (m) => m.SpacingToggleGroupDemo,
          ),
      },
      {
        path: 'vertical-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/vertical-toggle-group-demo').then(
            (m) => m.VerticalToggleGroupDemo,
          ),
      },
      {
        path: 'disabled-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/disabled-toggle-group-demo').then(
            (m) => m.DisabledToggleGroupDemo,
          ),
      },
      {
        path: 'font-weight-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/font-weight-toggle-group-demo').then(
            (m) => m.FontWeightToggleGroupDemo,
          ),
      },
      {
        path: 'single-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/single-toggle-group-demo').then(
            (m) => m.SingleToggleGroupDemo,
          ),
      },
      {
        path: 'multiple-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/multiple-toggle-group-demo').then(
            (m) => m.MultipleToggleGroupDemo,
          ),
      },
      {
        path: 'rtl-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/rtl-toggle-group-demo').then(
            (m) => m.RtlToggleGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toolbar',
    children: [
      {
        path: 'toolbar-usage-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/toolbar-usage-demo').then(
            (m) => m.ToolbarUsageDemo,
          ),
      },
      {
        path: 'menu-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/menu-toolbar-demo').then(
            (m) => m.MenuToolbarDemo,
          ),
      },
      {
        path: 'tooltip-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/tooltip-toolbar-demo').then(
            (m) => m.TooltipToolbarDemo,
          ),
      },
      {
        path: 'input-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/input-toolbar-demo').then(
            (m) => m.InputToolbarDemo,
          ),
      },
      {
        path: 'vertical-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/vertical-toolbar-demo').then(
            (m) => m.VerticalToolbarDemo,
          ),
      },
      {
        path: 'disabled-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/disabled-toolbar-demo').then(
            (m) => m.DisabledToolbarDemo,
          ),
      },
      {
        path: 'rtl-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/rtl-toolbar-demo').then(
            (m) => m.RtlToolbarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tooltip',
    children: [
      {
        path: 'tooltip-usage-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/tooltip-usage-demo').then(
            (m) => m.TooltipUsageDemo,
          ),
      },
      {
        path: 'sides-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/sides-tooltip-demo').then(
            (m) => m.SidesTooltipDemo,
          ),
      },
      {
        path: 'keyboard-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/keyboard-tooltip-demo').then(
            (m) => m.KeyboardTooltipDemo,
          ),
      },
      {
        path: 'disabled-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/disabled-tooltip-demo').then(
            (m) => m.DisabledTooltipDemo,
          ),
      },
      {
        path: 'controlled-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/controlled-tooltip-demo').then(
            (m) => m.ControlledTooltipDemo,
          ),
      },
      {
        path: 'group-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/group-tooltip-demo').then(
            (m) => m.GroupTooltipDemo,
          ),
      },
      {
        path: 'rtl-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/rtl-tooltip-demo').then(
            (m) => m.RtlTooltipDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/typeset',
    children: [
      {
        path: 'page-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/page-typeset-demo').then(
            (m) => m.PageTypesetDemo,
          ),
      },
      {
        path: 'typeset-usage-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/typeset-usage-demo').then(
            (m) => m.TypesetUsageDemo,
          ),
      },
      {
        path: 'tuning-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/tuning-typeset-demo').then(
            (m) => m.TuningTypesetDemo,
          ),
      },
      {
        path: 'components-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/components-typeset-demo').then(
            (m) => m.ComponentsTypesetDemo,
          ),
      },
      {
        path: 'table-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/table-typeset-demo').then(
            (m) => m.TableTypesetDemo,
          ),
      },
      {
        path: 'rtl-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/rtl-typeset-demo').then(
            (m) => m.RtlTypesetDemo,
          ),
      },
      {
        path: 'headings-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/headings-typeset-demo').then(
            (m) => m.HeadingsTypesetDemo,
          ),
      },
      {
        path: 'text-typeset-demo',
        loadComponent: () =>
          import('../pages/docs/typeset/demos/text-typeset-demo').then(
            (m) => m.TextTypesetDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/media-player',
    children: [
      {
        path: 'media-player-usage-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/media-player-usage-demo').then(
            (m) => m.MediaPlayerUsageDemo,
          ),
      },
      {
        path: 'responsive-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/responsive-media-player-demo').then(
            (m) => m.ResponsiveMediaPlayerDemo,
          ),
      },
      {
        path: 'minimal-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/minimal-media-player-demo').then(
            (m) => m.MinimalMediaPlayerDemo,
          ),
      },
      {
        path: 'captions-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/captions-media-player-demo').then(
            (m) => m.CaptionsMediaPlayerDemo,
          ),
      },
      {
        path: 'controlled-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/controlled-media-player-demo').then(
            (m) => m.ControlledMediaPlayerDemo,
          ),
      },
      {
        path: 'audio-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/audio-media-player-demo').then(
            (m) => m.AudioMediaPlayerDemo,
          ),
      },
      {
        path: 'error-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/error-media-player-demo').then(
            (m) => m.ErrorMediaPlayerDemo,
          ),
      },
      {
        path: 'rtl-media-player-demo',
        loadComponent: () =>
          import('../pages/docs/media-player/demos/rtl-media-player-demo').then(
            (m) => m.RtlMediaPlayerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/virtual-list',
    children: [
      {
        path: 'infinite-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/infinite-virtual-list-demo').then(
            (m) => m.InfiniteVirtualListDemo,
          ),
      },
      {
        path: 'virtual-list-usage-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/virtual-list-usage-demo').then(
            (m) => m.VirtualListUsageDemo,
          ),
      },
      {
        path: 'variable-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/variable-virtual-list-demo').then(
            (m) => m.VariableVirtualListDemo,
          ),
      },
      {
        path: 'page-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/page-virtual-list-demo').then(
            (m) => m.PageVirtualListDemo,
          ),
      },
      {
        path: 'horizontal-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/horizontal-virtual-list-demo').then(
            (m) => m.HorizontalVirtualListDemo,
          ),
      },
      {
        path: 'grid-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/grid-virtual-list-demo').then(
            (m) => m.GridVirtualListDemo,
          ),
      },
      {
        path: 'chat-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/chat-virtual-list-demo').then(
            (m) => m.ChatVirtualListDemo,
          ),
      },
      {
        path: 'scroll-to-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/scroll-to-virtual-list-demo').then(
            (m) => m.ScrollToVirtualListDemo,
          ),
      },
      {
        path: 'rtl-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/rtl-virtual-list-demo').then(
            (m) => m.RtlVirtualListDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/switch',
    children: [
      {
        path: 'switch-usage-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/switch-usage-demo').then(
            (m) => m.SwitchUsageDemo,
          ),
      },
      {
        path: 'description-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/description-switch-demo').then(
            (m) => m.DescriptionSwitchDemo,
          ),
      },
      {
        path: 'choice-card-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/choice-card-switch-demo').then(
            (m) => m.ChoiceCardSwitchDemo,
          ),
      },
      {
        path: 'disabled-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/disabled-switch-demo').then(
            (m) => m.DisabledSwitchDemo,
          ),
      },
      {
        path: 'invalid-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/invalid-switch-demo').then(
            (m) => m.InvalidSwitchDemo,
          ),
      },
      {
        path: 'sizes-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/sizes-switch-demo').then(
            (m) => m.SizesSwitchDemo,
          ),
      },
      {
        path: 'placement-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/placement-switch-demo').then(
            (m) => m.PlacementSwitchDemo,
          ),
      },
      {
        path: 'state-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/state-switch-demo').then(
            (m) => m.StateSwitchDemo,
          ),
      },
      {
        path: 'signal-forms-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/signal-forms-switch-demo').then(
            (m) => m.SignalFormsSwitchDemo,
          ),
      },
      {
        path: 'rtl-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/rtl-switch-demo').then(
            (m) => m.RtlSwitchDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/slider',
    children: [
      {
        path: 'slider-usage-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/slider-usage-demo').then(
            (m) => m.SliderUsageDemo,
          ),
      },
      {
        path: 'controlled-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/controlled-slider-demo').then(
            (m) => m.ControlledSliderDemo,
          ),
      },
      {
        path: 'disabled-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/disabled-slider-demo').then(
            (m) => m.DisabledSliderDemo,
          ),
      },
      {
        path: 'vertical-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/vertical-slider-demo').then(
            (m) => m.VerticalSliderDemo,
          ),
      },
      {
        path: 'form-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/form-slider-demo').then(
            (m) => m.FormSliderDemo,
          ),
      },
      {
        path: 'custom-color-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/custom-color-slider-demo').then(
            (m) => m.CustomColorSliderDemo,
          ),
      },
      {
        path: 'rtl-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/rtl-slider-demo').then(
            (m) => m.RtlSliderDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/checkbox-group',
    children: [
      {
        path: 'checkbox-group-usage-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/checkbox-group-usage-demo').then(
            (m) => m.CheckboxGroupUsageDemo,
          ),
      },
      {
        path: 'parent-checkbox-group-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/parent-checkbox-group-demo').then(
            (m) => m.ParentCheckboxGroupDemo,
          ),
      },
      {
        path: 'nested-parent-checkbox-group-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/nested-parent-checkbox-group-demo').then(
            (m) => m.NestedParentCheckboxGroupDemo,
          ),
      },
      {
        path: 'form-checkbox-group-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/form-checkbox-group-demo').then(
            (m) => m.FormCheckboxGroupDemo,
          ),
      },
      {
        path: 'disabled-checkbox-group-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/disabled-checkbox-group-demo').then(
            (m) => m.DisabledCheckboxGroupDemo,
          ),
      },
      {
        path: 'rtl-checkbox-group-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox-group/demos/rtl-checkbox-group-demo').then(
            (m) => m.RtlCheckboxGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/otp-input',
    children: [
      {
        path: 'otp-input-usage-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/otp-input-usage-demo').then(
            (m) => m.OtpInputUsageDemo,
          ),
      },
      {
        path: 'digits-only-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/digits-only-otp-input-demo').then(
            (m) => m.DigitsOnlyOtpInputDemo,
          ),
      },
      {
        path: 'alphanumeric-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/alphanumeric-otp-input-demo').then(
            (m) => m.AlphanumericOtpInputDemo,
          ),
      },
      {
        path: 'four-digits-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/four-digits-otp-input-demo').then(
            (m) => m.FourDigitsOtpInputDemo,
          ),
      },
      {
        path: 'separator-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/separator-otp-input-demo').then(
            (m) => m.SeparatorOtpInputDemo,
          ),
      },
      {
        path: 'invalid-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/invalid-otp-input-demo').then(
            (m) => m.InvalidOtpInputDemo,
          ),
      },
      {
        path: 'disabled-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/disabled-otp-input-demo').then(
            (m) => m.DisabledOtpInputDemo,
          ),
      },
      {
        path: 'controlled-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/controlled-otp-input-demo').then(
            (m) => m.ControlledOtpInputDemo,
          ),
      },
      {
        path: 'form-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/form-otp-input-demo').then(
            (m) => m.FormOtpInputDemo,
          ),
      },
      {
        path: 'placeholder-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/placeholder-otp-input-demo').then(
            (m) => m.PlaceholderOtpInputDemo,
          ),
      },
      {
        path: 'normalization-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/normalization-otp-input-demo').then(
            (m) => m.NormalizationOtpInputDemo,
          ),
      },
      {
        path: 'masked-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/masked-otp-input-demo').then(
            (m) => m.MaskedOtpInputDemo,
          ),
      },
      {
        path: 'verification-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/verification-otp-input-demo').then(
            (m) => m.VerificationOtpInputDemo,
          ),
      },
      {
        path: 'server-validation-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/server-validation-otp-input-demo').then(
            (m) => m.ServerValidationOtpInputDemo,
          ),
      },
      {
        path: 'rtl-otp-input-demo',
        loadComponent: () =>
          import('../pages/docs/otp-input/demos/rtl-otp-input-demo').then(
            (m) => m.RtlOtpInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/collapsible',
    children: [
      {
        path: 'trigger-elsewhere-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/trigger-elsewhere-collapsible-demo').then(
            (m) => m.TriggerElsewhereCollapsibleDemo,
          ),
      },
      {
        path: 'collapsible-usage-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/collapsible-usage-demo').then(
            (m) => m.CollapsibleUsageDemo,
          ),
      },
      {
        path: 'basic-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/basic-collapsible-demo').then(
            (m) => m.BasicCollapsibleDemo,
          ),
      },
      {
        path: 'settings-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/settings-collapsible-demo').then(
            (m) => m.SettingsCollapsibleDemo,
          ),
      },
      {
        path: 'file-tree-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/file-tree-collapsible-demo').then(
            (m) => m.FileTreeCollapsibleDemo,
          ),
      },
      {
        path: 'hidden-until-found-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/hidden-until-found-collapsible-demo').then(
            (m) => m.HiddenUntilFoundCollapsibleDemo,
          ),
      },
      {
        path: 'disabled-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/disabled-collapsible-demo').then(
            (m) => m.DisabledCollapsibleDemo,
          ),
      },
      {
        path: 'open-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/open-collapsible-demo').then(
            (m) => m.OpenCollapsibleDemo,
          ),
      },
      {
        path: 'rtl-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/rtl-collapsible-demo').then(
            (m) => m.RtlCollapsibleDemo,
          ),
      },
    ],
  },
];
