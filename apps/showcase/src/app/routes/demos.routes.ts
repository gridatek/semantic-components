import { Route } from '@angular/router';

export const demosRoutes: Route[] = [
  {
    path: 'demos/accordion',
    children: [
      {
        path: 'basic-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/basic-accordion-demo').then(
            (m) => m.BasicAccordionDemo,
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
        path: 'multiple-accordion-demo',
        loadComponent: () =>
          import('../pages/docs/accordion/demos/multiple-accordion-demo').then(
            (m) => m.MultipleAccordionDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/alert',
    children: [
      {
        path: 'default-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/default-alert-demo').then(
            (m) => m.DefaultAlertDemo,
          ),
      },
      {
        path: 'destructive-alert-demo',
        loadComponent: () =>
          import('../pages/docs/alert/demos/destructive-alert-demo').then(
            (m) => m.DestructiveAlertDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/alert-dialog',
    children: [
      {
        path: 'basic-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/basic-alert-dialog-demo').then(
            (m) => m.BasicAlertDialogDemo,
          ),
      },
      {
        path: 'destructive-alert-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/demos/destructive-alert-dialog-demo').then(
            (m) => m.DestructiveAlertDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/animated-counter',
    children: [
      {
        path: 'count-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/count-animated-counter-demo').then(
            (m) => m.CountAnimatedCounterDemo,
          ),
      },
      {
        path: 'roll-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/roll-animated-counter-demo').then(
            (m) => m.RollAnimatedCounterDemo,
          ),
      },
      {
        path: 'formats-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/formats-animated-counter-demo').then(
            (m) => m.FormatsAnimatedCounterDemo,
          ),
      },
      {
        path: 'visible-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/visible-animated-counter-demo').then(
            (m) => m.VisibleAnimatedCounterDemo,
          ),
      },
      {
        path: 'card-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/card-animated-counter-demo').then(
            (m) => m.CardAnimatedCounterDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/aspect-ratio',
    children: [
      {
        path: 'sixteen-nine-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/sixteen-nine-aspect-ratio-demo').then(
            (m) => m.SixteenNineAspectRatioDemo,
          ),
      },
      {
        path: 'four-three-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/four-three-aspect-ratio-demo').then(
            (m) => m.FourThreeAspectRatioDemo,
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
        path: 'ultrawide-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/ultrawide-aspect-ratio-demo').then(
            (m) => m.UltrawideAspectRatioDemo,
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
        path: 'placeholder-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/placeholder-aspect-ratio-demo').then(
            (m) => m.PlaceholderAspectRatioDemo,
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
        path: 'map-aspect-ratio-demo',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/demos/map-aspect-ratio-demo').then(
            (m) => m.MapAspectRatioDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/autocomplete',
    children: [
      {
        path: 'basic-autocomplete-demo',
        loadComponent: () =>
          import('../pages/docs/autocomplete/demos/basic-autocomplete-demo').then(
            (m) => m.BasicAutocompleteDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/audio-player',
    children: [
      {
        path: 'player-audio-player-demo',
        loadComponent: () =>
          import('../pages/docs/audio-player/demos/player-audio-player-demo').then(
            (m) => m.PlayerAudioPlayerDemo,
          ),
      },
      {
        path: 'minimal-audio-player-demo',
        loadComponent: () =>
          import('../pages/docs/audio-player/demos/minimal-audio-player-demo').then(
            (m) => m.MinimalAudioPlayerDemo,
          ),
      },
      {
        path: 'controlled-audio-player-demo',
        loadComponent: () =>
          import('../pages/docs/audio-player/demos/controlled-audio-player-demo').then(
            (m) => m.ControlledAudioPlayerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/avatar',
    children: [
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
        path: 'sizes-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/sizes-avatar-demo').then(
            (m) => m.SizesAvatarDemo,
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
        path: 'group-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/avatar/demos/group-avatar-demo').then(
            (m) => m.GroupAvatarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/badge',
    children: [
      {
        path: 'variants-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/variants-badge-demo').then(
            (m) => m.VariantsBadgeDemo,
          ),
      },
      {
        path: 'with-icons-badge-demo',
        loadComponent: () =>
          import('../pages/docs/badge/demos/with-icons-badge-demo').then(
            (m) => m.WithIconsBadgeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/barcode-scanner',
    children: [
      {
        path: 'camera-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/camera-barcode-scanner-demo').then(
            (m) => m.CameraBarcodeScannerDemo,
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
        path: 'controls-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/controls-barcode-scanner-demo').then(
            (m) => m.ControlsBarcodeScannerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/breadcrumb',
    children: [
      {
        path: 'basic-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/basic-breadcrumb-demo').then(
            (m) => m.BasicBreadcrumbDemo,
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
        path: 'custom-separator-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/custom-separator-breadcrumb-demo').then(
            (m) => m.CustomSeparatorBreadcrumbDemo,
          ),
      },
      {
        path: 'longer-path-breadcrumb-demo',
        loadComponent: () =>
          import('../pages/docs/breadcrumb/demos/longer-path-breadcrumb-demo').then(
            (m) => m.LongerPathBreadcrumbDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/button',
    children: [
      {
        path: 'variants-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/variants-button-demo').then(
            (m) => m.VariantsButtonDemo,
          ),
      },
      {
        path: 'sizes-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/sizes-button-demo').then(
            (m) => m.SizesButtonDemo,
          ),
      },
      {
        path: 'with-icons-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/with-icons-button-demo').then(
            (m) => m.WithIconsButtonDemo,
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
        path: 'loading-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/loading-button-demo').then(
            (m) => m.LoadingButtonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/button-group',
    children: [
      {
        path: 'button-group-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-demo').then(
            (m) => m.ButtonGroupDemo,
          ),
      },
      {
        path: 'button-group-orientation-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-orientation-demo').then(
            (m) => m.ButtonGroupOrientationDemo,
          ),
      },
      {
        path: 'button-group-size-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-size-demo').then(
            (m) => m.ButtonGroupSizeDemo,
          ),
      },
      {
        path: 'button-group-separator-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-separator-demo').then(
            (m) => m.ButtonGroupSeparatorDemo,
          ),
      },
      {
        path: 'button-group-split-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-split-demo').then(
            (m) => m.ButtonGroupSplitDemo,
          ),
      },
      {
        path: 'button-group-input-demo',
        loadComponent: () =>
          import('../pages/docs/button-group/demos/button-group-input-demo').then(
            (m) => m.ButtonGroupInputDemo,
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
    ],
  },
  {
    path: 'demos/card',
    children: [
      {
        path: 'basic-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/basic-card-demo').then(
            (m) => m.BasicCardDemo,
          ),
      },
      {
        path: 'form-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/form-card-demo').then(
            (m) => m.FormCardDemo,
          ),
      },
      {
        path: 'notification-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/notification-card-demo').then(
            (m) => m.NotificationCardDemo,
          ),
      },
      {
        path: 'stats-card-demo',
        loadComponent: () =>
          import('../pages/docs/card/demos/stats-card-demo').then(
            (m) => m.StatsCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/carousel',
    children: [
      {
        path: 'default-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/default-carousel-demo').then(
            (m) => m.DefaultCarouselDemo,
          ),
      },
      {
        path: 'cards-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/cards-carousel-demo').then(
            (m) => m.CardsCarouselDemo,
          ),
      },
      {
        path: 'third-width-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/third-width-carousel-demo').then(
            (m) => m.ThirdWidthCarouselDemo,
          ),
      },
      {
        path: 'half-width-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/half-width-carousel-demo').then(
            (m) => m.HalfWidthCarouselDemo,
          ),
      },
      {
        path: 'vertical-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/vertical-carousel-demo').then(
            (m) => m.VerticalCarouselDemo,
          ),
      },
      {
        path: 'images-carousel-demo',
        loadComponent: () =>
          import('../pages/docs/carousel/demos/images-carousel-demo').then(
            (m) => m.ImagesCarouselDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/area-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/bar-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/line-chart',
    children: [
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
    ],
  },

  {
    path: 'demos/chart',
    children: [
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
        path: 'signal-forms-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/signal-forms-checkbox-demo').then(
            (m) => m.SignalFormsCheckboxDemo,
          ),
      },
      {
        path: 'label-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/label-checkbox-demo').then(
            (m) => m.LabelCheckboxDemo,
          ),
      },
      {
        path: 'basic-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/basic-checkbox-demo').then(
            (m) => m.BasicCheckboxDemo,
          ),
      },
      {
        path: 'with-description-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/with-description-checkbox-demo').then(
            (m) => m.WithDescriptionCheckboxDemo,
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
        path: 'indeterminate-checkbox-demo',
        loadComponent: () =>
          import('../pages/docs/checkbox/demos/indeterminate-checkbox-demo').then(
            (m) => m.IndeterminateCheckboxDemo,
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
    ],
  },
  {
    path: 'demos/code-editor',
    children: [
      {
        path: 'basic-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/basic-code-editor-demo').then(
            (m) => m.BasicCodeEditorDemo,
          ),
      },
      {
        path: 'form-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/form-code-editor-demo').then(
            (m) => m.FormCodeEditorDemo,
          ),
      },
      {
        path: 'languages-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/languages-code-editor-demo').then(
            (m) => m.LanguagesCodeEditorDemo,
          ),
      },
      {
        path: 'wrap-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/wrap-code-editor-demo').then(
            (m) => m.WrapCodeEditorDemo,
          ),
      },
      {
        path: 'readonly-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/readonly-code-editor-demo').then(
            (m) => m.ReadonlyCodeEditorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/code-block',
    children: [
      {
        path: 'basic-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/basic-code-block-demo').then(
            (m) => m.BasicCodeBlockDemo,
          ),
      },
      {
        path: 'numbers-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/numbers-code-block-demo').then(
            (m) => m.NumbersCodeBlockDemo,
          ),
      },
      {
        path: 'changes-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/changes-code-block-demo').then(
            (m) => m.ChangesCodeBlockDemo,
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
        path: 'floating-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/floating-code-block-demo').then(
            (m) => m.FloatingCodeBlockDemo,
          ),
      },
      {
        path: 'error-code-block-demo',
        loadComponent: () =>
          import('../pages/docs/code-block/demos/error-code-block-demo').then(
            (m) => m.ErrorCodeBlockDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/collapsible',
    children: [
      {
        path: 'basic-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/basic-collapsible-demo').then(
            (m) => m.BasicCollapsibleDemo,
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
        path: 'disabled-collapsible-demo',
        loadComponent: () =>
          import('../pages/docs/collapsible/demos/disabled-collapsible-demo').then(
            (m) => m.DisabledCollapsibleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/color-picker',
    children: [
      {
        path: 'basic-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/basic-color-picker-demo').then(
            (m) => m.BasicColorPickerDemo,
          ),
      },
      {
        path: 'alpha-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/alpha-color-picker-demo').then(
            (m) => m.AlphaColorPickerDemo,
          ),
      },
      {
        path: 'formats-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/formats-color-picker-demo').then(
            (m) => m.FormatsColorPickerDemo,
          ),
      },
      {
        path: 'swatches-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/swatches-color-picker-demo').then(
            (m) => m.SwatchesColorPickerDemo,
          ),
      },
      {
        path: 'form-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/form-color-picker-demo').then(
            (m) => m.FormColorPickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/combobox',
    children: [
      {
        path: 'combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/combobox-demo').then(
            (m) => m.ComboboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/command',
    children: [
      {
        path: 'command-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/command-demo').then(
            (m) => m.ScCommandDemo,
          ),
      },
      {
        path: 'command-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/command/demos/command-dialog-demo').then(
            (m) => m.ScCommandDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/confetti',
    children: [
      {
        path: 'burst-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/burst-confetti-demo').then(
            (m) => m.BurstConfettiDemo,
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
        path: 'context-menu-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/context-menu-demo').then(
            (m) => m.ScContextMenuDemo,
          ),
      },
      {
        path: 'context-menu-aria-demo',
        loadComponent: () =>
          import('../pages/docs/context-menu/demos/context-menu-aria-demo').then(
            (m) => m.ContextMenuAriaDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/copy-to-clipboard',
    children: [
      {
        path: 'basic-copy-to-clipboard-demo',
        loadComponent: () =>
          import('../pages/docs/copy-to-clipboard/demos/basic-copy-to-clipboard-demo').then(
            (m) => m.BasicCopyToClipboardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/countdown',
    children: [
      {
        path: 'event-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/event-countdown-demo').then(
            (m) => m.EventCountdownDemo,
          ),
      },
      {
        path: 'inline-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/inline-countdown-demo').then(
            (m) => m.InlineCountdownDemo,
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
        path: 'roll-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/roll-countdown-demo').then(
            (m) => m.RollCountdownDemo,
          ),
      },
      {
        path: 'done-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/done-countdown-demo').then(
            (m) => m.DoneCountdownDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/data-table',
    children: [
      {
        path: 'featured-data-table-demo',
        loadComponent: () =>
          import('../pages/docs/data-table/demos/featured-data-table-demo').then(
            (m) => m.FeaturedDataTableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-input',
    children: [
      {
        path: 'basic-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/basic-date-input-demo').then(
            (m) => m.BasicDateInputDemo,
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
        path: 'limits-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/limits-date-input-demo').then(
            (m) => m.LimitsDateInputDemo,
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
        path: 'disabled-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/disabled-date-input-demo').then(
            (m) => m.DisabledDateInputDemo,
          ),
      },
      {
        path: 'segmented-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/segmented-date-input-demo').then(
            (m) => m.SegmentedDateInputDemo,
          ),
      },
      {
        path: 'segmented-locale-date-input-demo',
        loadComponent: () =>
          import('../pages/docs/date-input/demos/segmented-locale-date-input-demo').then(
            (m) => m.SegmentedLocaleDateInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/date-picker',
    children: [
      {
        path: 'basic-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/basic-date-picker-demo').then(
            (m) => m.BasicDatePickerDemo,
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
        path: 'segmented-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/segmented-date-picker-demo').then(
            (m) => m.SegmentedDatePickerDemo,
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
        path: 'range-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/range-date-picker-demo').then(
            (m) => m.RangeDatePickerDemo,
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
        path: 'presets-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/presets-date-range-picker-demo').then(
            (m) => m.PresetsDateRangePickerDemo,
          ),
      },
      {
        path: 'typed-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/typed-date-range-picker-demo').then(
            (m) => m.TypedDateRangePickerDemo,
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
        path: 'form-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/form-date-range-picker-demo').then(
            (m) => m.FormDateRangePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/dialog',
    children: [
      {
        path: 'dialog-demo',
        loadComponent: () =>
          import('../pages/docs/dialog/demos/dialog-demo').then(
            (m) => m.ScDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/native-dialog',
    children: [
      {
        path: 'native-dialog-demo',
        loadComponent: () =>
          import('../pages/docs/native-dialog/demos/native-dialog-demo').then(
            (m) => m.NativeDialogDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/diff-viewer',
    children: [
      {
        path: 'split-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/split-diff-viewer-demo').then(
            (m) => m.SplitDiffViewerDemo,
          ),
      },
      {
        path: 'unified-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/unified-diff-viewer-demo').then(
            (m) => m.UnifiedDiffViewerDemo,
          ),
      },
      {
        path: 'folded-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/folded-diff-viewer-demo').then(
            (m) => m.FoldedDiffViewerDemo,
          ),
      },
      {
        path: 'whitespace-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/whitespace-diff-viewer-demo').then(
            (m) => m.WhitespaceDiffViewerDemo,
          ),
      },
      {
        path: 'identical-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/identical-diff-viewer-demo').then(
            (m) => m.IdenticalDiffViewerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/dock',
    children: [
      {
        path: 'apps-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/apps-dock-demo').then(
            (m) => m.AppsDockDemo,
          ),
      },
      {
        path: 'navigation-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/navigation-dock-demo').then(
            (m) => m.NavigationDockDemo,
          ),
      },
      {
        path: 'vertical-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/vertical-dock-demo').then(
            (m) => m.VerticalDockDemo,
          ),
      },
      {
        path: 'plain-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/plain-dock-demo').then(
            (m) => m.PlainDockDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/drawer',
    children: [
      {
        path: 'basic-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/basic-drawer-demo').then(
            (m) => m.BasicDrawerDemo,
          ),
      },
      {
        path: 'top-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/top-drawer-demo').then(
            (m) => m.TopDrawerDemo,
          ),
      },
      {
        path: 'left-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/left-drawer-demo').then(
            (m) => m.LeftDrawerDemo,
          ),
      },
      {
        path: 'right-drawer-demo',
        loadComponent: () =>
          import('../pages/docs/drawer/demos/right-drawer-demo').then(
            (m) => m.RightDrawerDemo,
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
        path: 'quick-reactions-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/quick-reactions-emoji-picker-demo').then(
            (m) => m.QuickReactionsEmojiPickerDemo,
          ),
      },
      {
        path: 'message-reactions-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/message-reactions-emoji-picker-demo').then(
            (m) => m.MessageReactionsEmojiPickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/editor',
    children: [
      {
        path: 'prefilled-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/prefilled-editor-demo').then(
            (m) => m.PrefilledEditorDemo,
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
        path: 'basic-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/basic-empty-demo').then(
            (m) => m.BasicEmptyDemo,
          ),
      },
      {
        path: 'actions-empty-demo',
        loadComponent: () =>
          import('../pages/docs/empty/demos/actions-empty-demo').then(
            (m) => m.ActionsEmptyDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/field',
    children: [
      {
        path: 'basic-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/basic-field-demo').then(
            (m) => m.BasicFieldDemo,
          ),
      },
      {
        path: 'horizontal-field-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/horizontal-field-demo').then(
            (m) => m.HorizontalFieldDemo,
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
        path: 'fieldset-demo',
        loadComponent: () =>
          import('../pages/docs/field/demos/fieldset-demo').then(
            (m) => m.FieldsetDemo,
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
    path: 'demos/file-upload',
    children: [
      {
        path: 'basic-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/basic-file-upload-demo').then(
            (m) => m.BasicFileUploadDemo,
          ),
      },
      {
        path: 'single-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/single-file-upload-demo').then(
            (m) => m.SingleFileUploadDemo,
          ),
      },
      {
        path: 'rejections-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/rejections-file-upload-demo').then(
            (m) => m.RejectionsFileUploadDemo,
          ),
      },
      {
        path: 'progress-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/progress-file-upload-demo').then(
            (m) => m.ProgressFileUploadDemo,
          ),
      },
      {
        path: 'form-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/form-file-upload-demo').then(
            (m) => m.FormFileUploadDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/hover-card',
    children: [
      {
        path: 'basic-hover-card-demo',
        loadComponent: () =>
          import('../pages/docs/hover-card/demos/basic-hover-card-demo').then(
            (m) => m.BasicHoverCardDemo,
          ),
      },
      {
        path: 'right-hover-card-demo',
        loadComponent: () =>
          import('../pages/docs/hover-card/demos/right-hover-card-demo').then(
            (m) => m.RightHoverCardDemo,
          ),
      },
      {
        path: 'top-hover-card-demo',
        loadComponent: () =>
          import('../pages/docs/hover-card/demos/top-hover-card-demo').then(
            (m) => m.TopHoverCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/image-annotator',
    children: [
      {
        path: 'editor-image-annotator-demo',
        loadComponent: () =>
          import('../pages/docs/image-annotator/demos/editor-image-annotator-demo').then(
            (m) => m.EditorImageAnnotatorDemo,
          ),
      },
      {
        path: 'review-image-annotator-demo',
        loadComponent: () =>
          import('../pages/docs/image-annotator/demos/review-image-annotator-demo').then(
            (m) => m.ReviewImageAnnotatorDemo,
          ),
      },
      {
        path: 'read-only-image-annotator-demo',
        loadComponent: () =>
          import('../pages/docs/image-annotator/demos/read-only-image-annotator-demo').then(
            (m) => m.ReadOnlyImageAnnotatorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/compare',
    children: [
      {
        path: 'basic-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/basic-compare-demo').then(
            (m) => m.BasicCompareDemo,
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
        path: 'content-compare-demo',
        loadComponent: () =>
          import('../pages/docs/compare/demos/content-compare-demo').then(
            (m) => m.ContentCompareDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/image-cropper',
    children: [
      {
        path: 'box-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/box-image-cropper-demo').then(
            (m) => m.BoxImageCropperDemo,
          ),
      },
      {
        path: 'avatar-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/avatar-image-cropper-demo').then(
            (m) => m.AvatarImageCropperDemo,
          ),
      },
      {
        path: 'cover-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/cover-image-cropper-demo').then(
            (m) => m.CoverImageCropperDemo,
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
        path: 'grid-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/grid-infinite-scroll-demo').then(
            (m) => m.GridInfiniteScrollDemo,
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
    ],
  },
  {
    path: 'demos/item',
    children: [
      {
        path: 'basic-item-demo',
        loadComponent: () =>
          import('../pages/docs/item/demos/basic-item-demo').then(
            (m) => m.BasicItemDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input',
    children: [
      {
        path: 'basic-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/basic-input-demo').then(
            (m) => m.BasicInputDemo,
          ),
      },
      {
        path: 'label-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/label-input-demo').then(
            (m) => m.LabelInputDemo,
          ),
      },
      {
        path: 'types-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/types-input-demo').then(
            (m) => m.TypesInputDemo,
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
        path: 'disabled-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/disabled-input-demo').then(
            (m) => m.DisabledInputDemo,
          ),
      },
      {
        path: 'button-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/button-input-demo').then(
            (m) => m.ButtonInputDemo,
          ),
      },
      {
        path: 'form-input-demo',
        loadComponent: () =>
          import('../pages/docs/input/demos/form-input-demo').then(
            (m) => m.FormInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input-button',
    children: [
      {
        path: 'basic-input-button-demo',
        loadComponent: () =>
          import('../pages/docs/input-button/demos/basic-input-button-demo').then(
            (m) => m.BasicInputButtonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/intersection-observer',
    children: [
      {
        path: 'basic-intersection-observer-demo',
        loadComponent: () =>
          import('../pages/docs/intersection-observer/demos/basic-intersection-observer-demo').then(
            (m) => m.BasicIntersectionObserverDemo,
          ),
      },
      {
        path: 'once-intersection-observer-demo',
        loadComponent: () =>
          import('../pages/docs/intersection-observer/demos/once-intersection-observer-demo').then(
            (m) => m.OnceIntersectionObserverDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/input-group',
    children: [
      {
        path: 'basic-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/basic-input-group-demo').then(
            (m) => m.BasicInputGroupDemo,
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
        path: 'text-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/text-input-group-demo').then(
            (m) => m.TextInputGroupDemo,
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
        path: 'icon-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/icon-input-group-demo').then(
            (m) => m.IconInputGroupDemo,
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
        path: 'dropdown-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/dropdown-input-group-demo').then(
            (m) => m.DropdownInputGroupDemo,
          ),
      },
      {
        path: 'label-input-group-demo',
        loadComponent: () =>
          import('../pages/docs/input-group/demos/label-input-group-demo').then(
            (m) => m.LabelInputGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/otp-field',
    children: [
      {
        path: 'basic-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/basic-otp-field-demo').then(
            (m) => m.BasicOtpFieldDemo,
          ),
      },
      {
        path: 'separator-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/separator-otp-field-demo').then(
            (m) => m.SeparatorOtpFieldDemo,
          ),
      },
      {
        path: 'pin-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/pin-otp-field-demo').then(
            (m) => m.PinOtpFieldDemo,
          ),
      },
      {
        path: 'dot-separator-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/dot-separator-otp-field-demo').then(
            (m) => m.DotSeparatorOtpFieldDemo,
          ),
      },
      {
        path: 'disabled-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/disabled-otp-field-demo').then(
            (m) => m.DisabledOtpFieldDemo,
          ),
      },
      {
        path: 'verification-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/verification-otp-field-demo').then(
            (m) => m.VerificationOtpFieldDemo,
          ),
      },
      {
        path: 'signal-forms-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/signal-forms-otp-field-demo').then(
            (m) => m.SignalFormsOtpFieldDemo,
          ),
      },
      {
        path: 'server-validation-otp-field-demo',
        loadComponent: () =>
          import('../pages/docs/otp-field/demos/server-validation-otp-field-demo').then(
            (m) => m.ServerValidationOtpFieldDemo,
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
        path: 'basic-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/basic-kbd-demo').then(
            (m) => m.BasicKbdDemo,
          ),
      },
      {
        path: 'shortcuts-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/shortcuts-kbd-demo').then(
            (m) => m.ShortcutsKbdDemo,
          ),
      },
      {
        path: 'variants-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/variants-kbd-demo').then(
            (m) => m.VariantsKbdDemo,
          ),
      },
      {
        path: 'arrow-keys-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/arrow-keys-kbd-demo').then(
            (m) => m.ArrowKeysKbdDemo,
          ),
      },
      {
        path: 'function-keys-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/function-keys-kbd-demo').then(
            (m) => m.FunctionKeysKbdDemo,
          ),
      },
      {
        path: 'inline-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/inline-kbd-demo').then(
            (m) => m.InlineKbdDemo,
          ),
      },
      {
        path: 'complex-shortcuts-kbd-demo',
        loadComponent: () =>
          import('../pages/docs/kbd/demos/complex-shortcuts-kbd-demo').then(
            (m) => m.ComplexShortcutsKbdDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/label',
    children: [
      {
        path: 'basic-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/basic-label-demo').then(
            (m) => m.BasicLabelDemo,
          ),
      },
      {
        path: 'checkbox-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/checkbox-label-demo').then(
            (m) => m.CheckboxLabelDemo,
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
        path: 'label-text-label-demo',
        loadComponent: () =>
          import('../pages/docs/label/demos/label-text-label-demo').then(
            (m) => m.LabelTextLabelDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/link',
    children: [
      {
        path: 'variants-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/variants-link-demo').then(
            (m) => m.VariantsLinkDemo,
          ),
      },
      {
        path: 'sizes-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/sizes-link-demo').then(
            (m) => m.SizesLinkDemo,
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
        path: 'with-icons-link-demo',
        loadComponent: () =>
          import('../pages/docs/link/demos/with-icons-link-demo').then(
            (m) => m.WithIconsLinkDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/lightbox',
    children: [
      {
        path: 'gallery-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/gallery-lightbox-demo').then(
            (m) => m.GalleryLightboxDemo,
          ),
      },
      {
        path: 'zoom-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/zoom-lightbox-demo').then(
            (m) => m.ZoomLightboxDemo,
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
        path: 'controlled-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/controlled-lightbox-demo').then(
            (m) => m.ControlledLightboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/marquee',
    children: [
      {
        path: 'logos-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/logos-marquee-demo').then(
            (m) => m.LogosMarqueeDemo,
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
        path: 'photos-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/photos-masonry-grid-demo').then(
            (m) => m.PhotosMasonryGridDemo,
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
        path: 'more-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/more-masonry-grid-demo').then(
            (m) => m.MoreMasonryGridDemo,
          ),
      },
      {
        path: 'order-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/order-masonry-grid-demo').then(
            (m) => m.OrderMasonryGridDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/mention-input',
    children: [
      {
        path: 'basic-mention-input-demo',
        loadComponent: () =>
          import('../pages/docs/mention-input/demos/basic-mention-input-demo').then(
            (m) => m.BasicMentionInputDemo,
          ),
      },
      {
        path: 'avatars-mention-input-demo',
        loadComponent: () =>
          import('../pages/docs/mention-input/demos/avatars-mention-input-demo').then(
            (m) => m.AvatarsMentionInputDemo,
          ),
      },
      {
        path: 'custom-trigger-mention-input-demo',
        loadComponent: () =>
          import('../pages/docs/mention-input/demos/custom-trigger-mention-input-demo').then(
            (m) => m.CustomTriggerMentionInputDemo,
          ),
      },
      {
        path: 'disabled-mention-input-demo',
        loadComponent: () =>
          import('../pages/docs/mention-input/demos/disabled-mention-input-demo').then(
            (m) => m.DisabledMentionInputDemo,
          ),
      },
      {
        path: 'form-mention-input-demo',
        loadComponent: () =>
          import('../pages/docs/mention-input/demos/form-mention-input-demo').then(
            (m) => m.FormMentionInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/menu-bar',
    children: [
      {
        path: 'menu-bar-demo',
        loadComponent: () =>
          import('../pages/docs/menu-bar/demos/menu-bar-demo').then(
            (m) => m.MenuBarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/menu',
    children: [
      {
        path: 'menu-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-demo').then(
            (m) => m.ScMenuDemo,
          ),
      },
      {
        path: 'menu-shortcuts-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-shortcuts-demo').then(
            (m) => m.MenuShortcutsDemo,
          ),
      },
      {
        path: 'menu-tools-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-tools-demo').then(
            (m) => m.MenuToolsDemo,
          ),
      },
      {
        path: 'menu-avatar-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-avatar-demo').then(
            (m) => m.MenuAvatarDemo,
          ),
      },
      {
        path: 'menu-align-demo',
        loadComponent: () =>
          import('../pages/docs/menu/demos/menu-align-demo').then(
            (m) => m.ScMenuAlignDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/multiselect',
    children: [
      {
        path: 'basic-multiselect-demo',
        loadComponent: () =>
          import('../pages/docs/multiselect/demos/basic-multiselect-demo').then(
            (m) => m.BasicMultiselectDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/native-select',
    children: [
      {
        path: 'basic-native-select-demo',
        loadComponent: () =>
          import('../pages/docs/native-select/demos/basic-native-select-demo').then(
            (m) => m.BasicNativeSelectDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pie-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/scatter-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/funnel-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/treemap-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/sunburst-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/sankey-chart',
    children: [
      {
        path: 'sankey-chart-demo',
        loadComponent: () =>
          import('../pages/docs/sankey-chart/demos/sankey-chart-demo').then(
            (m) => m.SankeyChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/radar-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/radial-chart',
    children: [
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
    ],
  },
  {
    path: 'demos/scheduler',
    children: [
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
    path: 'demos/slider',
    children: [
      {
        path: 'basic-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/basic-slider-demo').then(
            (m) => m.BasicSliderDemo,
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
        path: 'form-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/form-slider-demo').then(
            (m) => m.FormSliderDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/range-slider',
    children: [
      {
        path: 'basic-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/basic-range-slider-demo').then(
            (m) => m.BasicRangeSliderDemo,
          ),
      },
      {
        path: 'custom-color-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/custom-color-range-slider-demo').then(
            (m) => m.CustomColorRangeSliderDemo,
          ),
      },
      {
        path: 'form-range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/range-slider/demos/form-range-slider-demo').then(
            (m) => m.FormRangeSliderDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/navigation-menu',
    children: [
      {
        path: 'navigation-menu-demo',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/demos/navigation-menu-demo').then(
            (m) => m.ScNavigationMenuDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/notification-center',
    children: [
      {
        path: 'by-day-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/by-day-notification-center-demo').then(
            (m) => m.ByDayNotificationCenterDemo,
          ),
      },
      {
        path: 'inbox-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/inbox-notification-center-demo').then(
            (m) => m.InboxNotificationCenterDemo,
          ),
      },
      {
        path: 'empty-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/empty-notification-center-demo').then(
            (m) => m.EmptyNotificationCenterDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/backdrop',
    children: [
      {
        path: 'basic-backdrop-demo',
        loadComponent: () =>
          import('../pages/docs/backdrop/demos/basic-backdrop-demo').then(
            (m) => m.BasicBackdropDemo,
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
    path: 'demos/hotkey',
    children: [
      {
        path: 'basic-hotkey-demo',
        loadComponent: () =>
          import('../pages/docs/hotkey/demos/basic-hotkey-demo').then(
            (m) => m.BasicHotkeyDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/number-field',
    children: [
      {
        path: 'quantity-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/quantity-number-field-demo').then(
            (m) => m.QuantityNumberFieldDemo,
          ),
      },
      {
        path: 'stacked-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/stacked-number-field-demo').then(
            (m) => m.StackedNumberFieldDemo,
          ),
      },
      {
        path: 'steps-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/steps-number-field-demo').then(
            (m) => m.StepsNumberFieldDemo,
          ),
      },
      {
        path: 'basic-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/basic-number-field-demo').then(
            (m) => m.BasicNumberFieldDemo,
          ),
      },
      {
        path: 'scrubbing-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/scrubbing-number-field-demo').then(
            (m) => m.ScrubbingNumberFieldDemo,
          ),
      },
      {
        path: 'price-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/price-number-field-demo').then(
            (m) => m.PriceNumberFieldDemo,
          ),
      },
      {
        path: 'disabled-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/disabled-number-field-demo').then(
            (m) => m.DisabledNumberFieldDemo,
          ),
      },
      {
        path: 'without-label-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/without-label-number-field-demo').then(
            (m) => m.WithoutLabelNumberFieldDemo,
          ),
      },
      {
        path: 'signal-forms-number-field-demo',
        loadComponent: () =>
          import('../pages/docs/number-field/demos/signal-forms-number-field-demo').then(
            (m) => m.SignalFormsNumberFieldDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/org-chart',
    children: [
      {
        path: 'basic-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/basic-org-chart-demo').then(
            (m) => m.BasicOrgChartDemo,
          ),
      },
      {
        path: 'avatars-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/avatars-org-chart-demo').then(
            (m) => m.AvatarsOrgChartDemo,
          ),
      },
      {
        path: 'across-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/across-org-chart-demo').then(
            (m) => m.AcrossOrgChartDemo,
          ),
      },
      {
        path: 'collapsible-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/collapsible-org-chart-demo').then(
            (m) => m.CollapsibleOrgChartDemo,
          ),
      },
      {
        path: 'selection-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/selection-org-chart-demo').then(
            (m) => m.SelectionOrgChartDemo,
          ),
      },
      {
        path: 'data-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/data-org-chart-demo').then(
            (m) => m.DataOrgChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/password-field',
    children: [
      {
        path: 'basic-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/basic-password-field-demo').then(
            (m) => m.BasicPasswordFieldDemo,
          ),
      },
      {
        path: 'visible-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/visible-password-field-demo').then(
            (m) => m.VisiblePasswordFieldDemo,
          ),
      },
      {
        path: 'disabled-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/disabled-password-field-demo').then(
            (m) => m.DisabledPasswordFieldDemo,
          ),
      },
      {
        path: 'form-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/form-password-field-demo').then(
            (m) => m.FormPasswordFieldDemo,
          ),
      },
      {
        path: 'caps-lock-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/caps-lock-password-field-demo').then(
            (m) => m.CapsLockPasswordFieldDemo,
          ),
      },
      {
        path: 'strength-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/strength-password-field-demo').then(
            (m) => m.StrengthPasswordFieldDemo,
          ),
      },
      {
        path: 'requirements-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/requirements-password-field-demo').then(
            (m) => m.RequirementsPasswordFieldDemo,
          ),
      },
      {
        path: 'generate-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/generate-password-field-demo').then(
            (m) => m.GeneratePasswordFieldDemo,
          ),
      },
      {
        path: 'rtl-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/rtl-password-field-demo').then(
            (m) => m.RtlPasswordFieldDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pagination',
    children: [
      {
        path: 'first-last-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/first-last-pagination-demo').then(
            (m) => m.FirstLastPaginationDemo,
          ),
      },
      {
        path: 'basic-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/basic-pagination-demo').then(
            (m) => m.BasicPaginationDemo,
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
        path: 'many-pages-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/many-pages-pagination-demo').then(
            (m) => m.ManyPagesPaginationDemo,
          ),
      },
      {
        path: 'buttons-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/buttons-pagination-demo').then(
            (m) => m.ButtonsPaginationDemo,
          ),
      },
      {
        path: 'first-page-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/first-page-pagination-demo').then(
            (m) => m.FirstPagePaginationDemo,
          ),
      },
      {
        path: 'last-page-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/last-page-pagination-demo').then(
            (m) => m.LastPagePaginationDemo,
          ),
      },
      {
        path: 'page-size-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/page-size-pagination-demo').then(
            (m) => m.PageSizePaginationDemo,
          ),
      },
      {
        path: 'keyboard-navigation-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/keyboard-navigation-pagination-demo').then(
            (m) => m.KeyboardNavigationPaginationDemo,
          ),
      },
      {
        path: 'disabled-link-pagination-demo',
        loadComponent: () =>
          import('../pages/docs/pagination/demos/disabled-link-pagination-demo').then(
            (m) => m.DisabledLinkPaginationDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pdf-viewer',
    children: [
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
        path: 'country-selector-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/country-selector-phone-input-demo').then(
            (m) => m.CountrySelectorPhoneInputDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/popover',
    children: [
      {
        path: 'basic-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/basic-popover-demo').then(
            (m) => m.BasicPopoverDemo,
          ),
      },
      {
        path: 'top-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/top-popover-demo').then(
            (m) => m.TopPopoverDemo,
          ),
      },
      {
        path: 'right-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/right-popover-demo').then(
            (m) => m.RightPopoverDemo,
          ),
      },
      {
        path: 'left-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/left-popover-demo').then(
            (m) => m.LeftPopoverDemo,
          ),
      },
      {
        path: 'align-start-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/align-start-popover-demo').then(
            (m) => m.AlignStartPopoverDemo,
          ),
      },
      {
        path: 'align-end-popover-demo',
        loadComponent: () =>
          import('../pages/docs/popover/demos/align-end-popover-demo').then(
            (m) => m.AlignEndPopoverDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/progress',
    children: [
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
    path: 'demos/query-param-state',
    children: [
      {
        path: 'demo-query-param-state-demo',
        loadComponent: () =>
          import('../pages/docs/query-param-state/demos/demo-query-param-state-demo').then(
            (m) => m.DemoQueryParamStateDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/qr-code',
    children: [
      {
        path: 'basic-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/basic-qr-code-demo').then(
            (m) => m.BasicQrCodeDemo,
          ),
      },
      {
        path: 'interactive-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/interactive-qr-code-demo').then(
            (m) => m.InteractiveQrCodeDemo,
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
        path: 'quiet-zone-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/quiet-zone-qr-code-demo').then(
            (m) => m.QuietZoneQrCodeDemo,
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
    ],
  },
  {
    path: 'demos/radio-group',
    children: [
      {
        path: 'basic-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/basic-radio-group-demo').then(
            (m) => m.BasicRadioGroupDemo,
          ),
      },
      {
        path: 'descriptions-radio-group-demo',
        loadComponent: () =>
          import('../pages/docs/radio-group/demos/descriptions-radio-group-demo').then(
            (m) => m.DescriptionsRadioGroupDemo,
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
        path: 'horizontal-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/horizontal-resizable-demo').then(
            (m) => m.HorizontalResizableDemo,
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
        path: 'with-handle-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/with-handle-resizable-demo').then(
            (m) => m.WithHandleResizableDemo,
          ),
      },
      {
        path: 'three-panels-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/three-panels-resizable-demo').then(
            (m) => m.ThreePanelsResizableDemo,
          ),
      },
      {
        path: 'nested-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/nested-resizable-demo').then(
            (m) => m.NestedResizableDemo,
          ),
      },
      {
        path: 'ide-layout-resizable-demo',
        loadComponent: () =>
          import('../pages/docs/resizable/demos/ide-layout-resizable-demo').then(
            (m) => m.IdeLayoutResizableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/scroll-area',
    children: [
      {
        path: 'vertical-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/vertical-scroll-area-demo').then(
            (m) => m.VerticalScrollAreaDemo,
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
        path: 'both-scroll-area-demo',
        loadComponent: () =>
          import('../pages/docs/scroll-area/demos/both-scroll-area-demo').then(
            (m) => m.BothScrollAreaDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/select',
    children: [
      {
        path: 'select-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-demo').then(
            (m) => m.SelectDemo,
          ),
      },
      {
        path: 'select-disabled-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-disabled-demo').then(
            (m) => m.SelectDisabledDemo,
          ),
      },
      {
        path: 'select-group-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-group-demo').then(
            (m) => m.SelectGroupDemo,
          ),
      },
      {
        path: 'select-signal-forms-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-signal-forms-demo').then(
            (m) => m.SelectSignalFormsDemo,
          ),
      },
      {
        path: 'select-currency-demo',
        loadComponent: () =>
          import('../pages/docs/select/demos/select-currency-demo').then(
            (m) => m.SelectCurrencyDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/separator',
    children: [
      {
        path: 'basic-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/basic-separator-demo').then(
            (m) => m.BasicSeparatorDemo,
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
        path: 'card-separator-demo',
        loadComponent: () =>
          import('../pages/docs/separator/demos/card-separator-demo').then(
            (m) => m.CardSeparatorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sheet',
    children: [
      {
        path: 'right-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/right-sheet-demo').then(
            (m) => m.RightSheetDemo,
          ),
      },
      {
        path: 'left-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/left-sheet-demo').then(
            (m) => m.LeftSheetDemo,
          ),
      },
      {
        path: 'top-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/top-sheet-demo').then(
            (m) => m.TopSheetDemo,
          ),
      },
      {
        path: 'bottom-sheet-demo',
        loadComponent: () =>
          import('../pages/docs/sheet/demos/bottom-sheet-demo').then(
            (m) => m.BottomSheetDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/signature-pad',
    children: [
      {
        path: 'basic-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/basic-signature-pad-demo').then(
            (m) => m.BasicSignaturePadDemo,
          ),
      },
      {
        path: 'pens-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/pens-signature-pad-demo').then(
            (m) => m.PensSignaturePadDemo,
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
        path: 'form-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/form-signature-pad-demo').then(
            (m) => m.FormSignaturePadDemo,
          ),
      },
      {
        path: 'export-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/export-signature-pad-demo').then(
            (m) => m.ExportSignaturePadDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/skeleton',
    children: [
      {
        path: 'basic-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/basic-skeleton-demo').then(
            (m) => m.BasicSkeletonDemo,
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
        path: 'article-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/article-skeleton-demo').then(
            (m) => m.ArticleSkeletonDemo,
          ),
      },
      {
        path: 'list-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/list-skeleton-demo').then(
            (m) => m.ListSkeletonDemo,
          ),
      },
      {
        path: 'table-skeleton-demo',
        loadComponent: () =>
          import('../pages/docs/skeleton/demos/table-skeleton-demo').then(
            (m) => m.TableSkeletonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sortable-list',
    children: [
      {
        path: 'basic-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/basic-sortable-list-demo').then(
            (m) => m.BasicSortableListDemo,
          ),
      },
      {
        path: 'handle-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/handle-sortable-list-demo').then(
            (m) => m.HandleSortableListDemo,
          ),
      },
      {
        path: 'horizontal-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/horizontal-sortable-list-demo').then(
            (m) => m.HorizontalSortableListDemo,
          ),
      },
      {
        path: 'grid-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/grid-sortable-list-demo').then(
            (m) => m.GridSortableListDemo,
          ),
      },
      {
        path: 'buttons-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/buttons-sortable-list-demo').then(
            (m) => m.ButtonsSortableListDemo,
          ),
      },
      {
        path: 'disabled-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/disabled-sortable-list-demo').then(
            (m) => m.DisabledSortableListDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/speed-dial',
    children: [
      {
        path: 'basic-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/basic-speed-dial-demo').then(
            (m) => m.BasicSpeedDialDemo,
          ),
      },
      {
        path: 'directions-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/directions-speed-dial-demo').then(
            (m) => m.DirectionsSpeedDialDemo,
          ),
      },
      {
        path: 'arc-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/arc-speed-dial-demo').then(
            (m) => m.ArcSpeedDialDemo,
          ),
      },
      {
        path: 'backdrop-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/backdrop-speed-dial-demo').then(
            (m) => m.BackdropSpeedDialDemo,
          ),
      },
      {
        path: 'controlled-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/controlled-speed-dial-demo').then(
            (m) => m.ControlledSpeedDialDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/spinner',
    children: [
      {
        path: 'default-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/default-spinner-demo').then(
            (m) => m.DefaultSpinnerDemo,
          ),
      },
      {
        path: 'colors-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/colors-spinner-demo').then(
            (m) => m.ColorsSpinnerDemo,
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
        path: 'overlay-spinner-demo',
        loadComponent: () =>
          import('../pages/docs/spinner/demos/overlay-spinner-demo').then(
            (m) => m.OverlaySpinnerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/spotlight',
    children: [
      {
        path: 'basic-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/basic-spotlight-demo').then(
            (m) => m.BasicSpotlightDemo,
          ),
      },
      {
        path: 'interactive-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/interactive-spotlight-demo').then(
            (m) => m.InteractiveSpotlightDemo,
          ),
      },
      {
        path: 'sides-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/sides-spotlight-demo').then(
            (m) => m.SidesSpotlightDemo,
          ),
      },
      {
        path: 'custom-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/custom-spotlight-demo').then(
            (m) => m.CustomSpotlightDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/stat-card',
    children: [
      {
        path: 'basic-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/basic-stat-card-demo').then(
            (m) => m.BasicStatCardDemo,
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
        path: 'formats-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/formats-stat-card-demo').then(
            (m) => m.FormatsStatCardDemo,
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
        path: 'text-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/text-stat-card-demo').then(
            (m) => m.TextStatCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/stepper',
    children: [
      {
        path: 'linear-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/linear-stepper-demo').then(
            (m) => m.LinearStepperDemo,
          ),
      },
      {
        path: 'horizontal-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/horizontal-stepper-demo').then(
            (m) => m.HorizontalStepperDemo,
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
        path: 'simple-stepper-demo',
        loadComponent: () =>
          import('../pages/docs/stepper/demos/simple-stepper-demo').then(
            (m) => m.SimpleStepperDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/switch',
    children: [
      {
        path: 'signal-forms-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/signal-forms-switch-demo').then(
            (m) => m.SignalFormsSwitchDemo,
          ),
      },
      {
        path: 'basic-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/basic-switch-demo').then(
            (m) => m.BasicSwitchDemo,
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
        path: 'disabled-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/disabled-switch-demo').then(
            (m) => m.DisabledSwitchDemo,
          ),
      },
      {
        path: 'input-first-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/input-first-switch-demo').then(
            (m) => m.InputFirstSwitchDemo,
          ),
      },
      {
        path: 'input-last-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/input-last-switch-demo').then(
            (m) => m.InputLastSwitchDemo,
          ),
      },
      {
        path: 'description-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/description-switch-demo').then(
            (m) => m.DescriptionSwitchDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tabs',
    children: [
      {
        path: 'basic-tabs-demo',
        loadComponent: () =>
          import('../pages/docs/tabs/demos/basic-tabs-demo').then(
            (m) => m.BasicTabsDemo,
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
    ],
  },
  {
    path: 'demos/table',
    children: [
      {
        path: 'basic-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/basic-table-demo').then(
            (m) => m.BasicTableDemo,
          ),
      },
      {
        path: 'caption-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/caption-table-demo').then(
            (m) => m.CaptionTableDemo,
          ),
      },
      {
        path: 'users-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/users-table-demo').then(
            (m) => m.UsersTableDemo,
          ),
      },
      {
        path: 'footer-table-demo',
        loadComponent: () =>
          import('../pages/docs/table/demos/footer-table-demo').then(
            (m) => m.FooterTableDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tags-input',
    children: [
      {
        path: 'basic-tags-input-demo',
        loadComponent: () =>
          import('../pages/docs/tags-input/demos/basic-tags-input-demo').then(
            (m) => m.BasicTagsInputDemo,
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
        path: 'basic-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/basic-textarea-demo').then(
            (m) => m.BasicTextareaDemo,
          ),
      },
      {
        path: 'label-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/label-textarea-demo').then(
            (m) => m.LabelTextareaDemo,
          ),
      },
      {
        path: 'helper-text-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/helper-text-textarea-demo').then(
            (m) => m.HelperTextTextareaDemo,
          ),
      },
      {
        path: 'rows-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/rows-textarea-demo').then(
            (m) => m.RowsTextareaDemo,
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
        path: 'maxlength-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/maxlength-textarea-demo').then(
            (m) => m.MaxlengthTextareaDemo,
          ),
      },
      {
        path: 'form-textarea-demo',
        loadComponent: () =>
          import('../pages/docs/textarea/demos/form-textarea-demo').then(
            (m) => m.FormTextareaDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/theme',
    children: [
      {
        path: 'basic-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/basic-theme-toggle-demo').then(
            (m) => m.BasicThemeToggleDemo,
          ),
      },
      {
        path: 'variants-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/variants-theme-toggle-demo').then(
            (m) => m.VariantsThemeToggleDemo,
          ),
      },
      {
        path: 'sizes-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/sizes-theme-toggle-demo').then(
            (m) => m.SizesThemeToggleDemo,
          ),
      },
      {
        path: 'theme-select-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/theme-select-demo').then(
            (m) => m.ThemeSelectDemo,
          ),
      },
      {
        path: 'navigation-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/navigation-theme-toggle-demo').then(
            (m) => m.NavigationThemeToggleDemo,
          ),
      },
      {
        path: 'settings-panel-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme/demos/settings-panel-theme-toggle-demo').then(
            (m) => m.SettingsPanelThemeToggleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-picker',
    children: [
      {
        path: 'basic-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/basic-time-picker-demo').then(
            (m) => m.BasicTimePickerDemo,
          ),
      },
      {
        path: 'interval-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/interval-time-picker-demo').then(
            (m) => m.IntervalTimePickerDemo,
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
        path: 'form-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/form-time-picker-demo').then(
            (m) => m.FormTimePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-input',
    children: [
      {
        path: 'basic-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/basic-time-input-demo').then(
            (m) => m.BasicTimeInputDemo,
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
        path: 'seconds-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/seconds-time-input-demo').then(
            (m) => m.SecondsTimeInputDemo,
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
        path: 'form-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/form-time-input-demo').then(
            (m) => m.FormTimeInputDemo,
          ),
      },
      {
        path: 'disabled-time-input-demo',
        loadComponent: () =>
          import('../pages/docs/time-input/demos/disabled-time-input-demo').then(
            (m) => m.DisabledTimeInputDemo,
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
        path: 'locale-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/locale-time-clock-demo').then(
            (m) => m.LocaleTimeClockDemo,
          ),
      },
      {
        path: 'step-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/step-time-clock-demo').then(
            (m) => m.StepTimeClockDemo,
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
        path: 'input-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/input-time-clock-demo').then(
            (m) => m.InputTimeClockDemo,
          ),
      },
      {
        path: 'form-time-clock-demo',
        loadComponent: () =>
          import('../pages/docs/time-clock/demos/form-time-clock-demo').then(
            (m) => m.FormTimeClockDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/attachment',
    children: [
      {
        path: 'basic-attachment-demo',
        loadComponent: () =>
          import('../pages/docs/attachment/demos/basic-attachment-demo').then(
            (m) => m.BasicAttachmentDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/bubble',
    children: [
      {
        path: 'basic-bubble-demo',
        loadComponent: () =>
          import('../pages/docs/bubble/demos/basic-bubble-demo').then(
            (m) => m.BasicBubbleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/questionnaire',
    children: [
      {
        path: 'basic-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/basic-questionnaire-demo').then(
            (m) => m.BasicQuestionnaireDemo,
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
        path: 'rtl-questionnaire-demo',
        loadComponent: () =>
          import('../pages/docs/questionnaire/demos/rtl-questionnaire-demo').then(
            (m) => m.RtlQuestionnaireDemo,
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
    path: 'demos/json-viewer',
    children: [
      {
        path: 'basic-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/basic-json-viewer-demo').then(
            (m) => m.BasicJsonViewerDemo,
          ),
      },
      {
        path: 'summary-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/summary-json-viewer-demo').then(
            (m) => m.SummaryJsonViewerDemo,
          ),
      },
      {
        path: 'large-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/large-json-viewer-demo').then(
            (m) => m.LargeJsonViewerDemo,
          ),
      },
      {
        path: 'controls-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/controls-json-viewer-demo').then(
            (m) => m.ControlsJsonViewerDemo,
          ),
      },
      {
        path: 'types-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/types-json-viewer-demo').then(
            (m) => m.TypesJsonViewerDemo,
          ),
      },
      {
        path: 'rtl-json-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/json-viewer/demos/rtl-json-viewer-demo').then(
            (m) => m.RtlJsonViewerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/trace',
    children: [
      {
        path: 'basic-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/basic-trace-demo').then(
            (m) => m.BasicTraceDemo,
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
        path: 'link-trace-demo',
        loadComponent: () =>
          import('../pages/docs/trace/demos/link-trace-demo').then(
            (m) => m.LinkTraceDemo,
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
        path: 'basic-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/basic-message-scroller-demo').then(
            (m) => m.BasicMessageScrollerDemo,
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
        path: 'history-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/history-message-scroller-demo').then(
            (m) => m.HistoryMessageScrollerDemo,
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
        path: 'position-message-scroller-demo',
        loadComponent: () =>
          import('../pages/docs/message-scroller/demos/position-message-scroller-demo').then(
            (m) => m.PositionMessageScrollerDemo,
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
        path: 'basic-message-demo',
        loadComponent: () =>
          import('../pages/docs/message/demos/basic-message-demo').then(
            (m) => m.BasicMessageDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/marker',
    children: [
      {
        path: 'basic-marker-demo',
        loadComponent: () =>
          import('../pages/docs/marker/demos/basic-marker-demo').then(
            (m) => m.BasicMarkerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/timeline',
    children: [
      {
        path: 'activity-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/activity-timeline-demo').then(
            (m) => m.ActivityTimelineDemo,
          ),
      },
      {
        path: 'tracking-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/tracking-timeline-demo').then(
            (m) => m.TrackingTimelineDemo,
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
        path: 'horizontal-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/horizontal-timeline-demo').then(
            (m) => m.HorizontalTimelineDemo,
          ),
      },
      {
        path: 'pending-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/pending-timeline-demo').then(
            (m) => m.PendingTimelineDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toast',
    children: [
      {
        path: 'basic-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/basic-toast-demo').then(
            (m) => m.BasicToastDemo,
          ),
      },
      {
        path: 'title-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/title-toast-demo').then(
            (m) => m.TitleToastDemo,
          ),
      },
      {
        path: 'action-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/action-toast-demo').then(
            (m) => m.ActionToastDemo,
          ),
      },
      {
        path: 'destructive-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/destructive-toast-demo').then(
            (m) => m.DestructiveToastDemo,
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
        path: 'variants-toast-demo',
        loadComponent: () =>
          import('../pages/docs/toast/demos/variants-toast-demo').then(
            (m) => m.VariantsToastDemo,
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
    path: 'demos/toggle',
    children: [
      {
        path: 'basic-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/toggle/demos/basic-toggle-demo').then(
            (m) => m.BasicToggleDemo,
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
        path: 'disabled-toggle-group-demo',
        loadComponent: () =>
          import('../pages/docs/toggle-group/demos/disabled-toggle-group-demo').then(
            (m) => m.DisabledToggleGroupDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/toolbar',
    children: [
      {
        path: 'basic-toolbar-demo',
        loadComponent: () =>
          import('../pages/docs/toolbar/demos/basic-toolbar-demo').then(
            (m) => m.BasicToolbarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tooltip',
    children: [
      {
        path: 'basic-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/basic-tooltip-demo').then(
            (m) => m.BasicTooltipDemo,
          ),
      },
      {
        path: 'positions-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/positions-tooltip-demo').then(
            (m) => m.PositionsTooltipDemo,
          ),
      },
      {
        path: 'icon-button-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/icon-button-tooltip-demo').then(
            (m) => m.IconButtonTooltipDemo,
          ),
      },
      {
        path: 'delay-tooltip-demo',
        loadComponent: () =>
          import('../pages/docs/tooltip/demos/delay-tooltip-demo').then(
            (m) => m.DelayTooltipDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tour-guide',
    children: [
      {
        path: 'tour-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/tour-tour-guide-demo').then(
            (m) => m.TourTourGuideDemo,
          ),
      },
      {
        path: 'minimal-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/minimal-tour-guide-demo').then(
            (m) => m.MinimalTourGuideDemo,
          ),
      },
      {
        path: 'scrolling-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/scrolling-tour-guide-demo').then(
            (m) => m.ScrollingTourGuideDemo,
          ),
      },
      {
        path: 'controlled-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/controlled-tour-guide-demo').then(
            (m) => m.ControlledTourGuideDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/transfer-list',
    children: [
      {
        path: 'basic-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/basic-transfer-list-demo').then(
            (m) => m.BasicTransferListDemo,
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
        path: 'ordered-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/ordered-transfer-list-demo').then(
            (m) => m.OrderedTransferListDemo,
          ),
      },
      {
        path: 'many-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/many-transfer-list-demo').then(
            (m) => m.ManyTransferListDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/typography',
    children: [
      {
        path: 'headings-typography-demo',
        loadComponent: () =>
          import('../pages/docs/typography/demos/headings-typography-demo').then(
            (m) => m.HeadingsTypographyDemo,
          ),
      },
      {
        path: 'underline-typography-demo',
        loadComponent: () =>
          import('../pages/docs/typography/demos/underline-typography-demo').then(
            (m) => m.UnderlineTypographyDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/tree',
    children: [
      {
        path: 'file-explorer-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/file-explorer-tree-demo').then(
            (m) => m.FileExplorerTreeDemo,
          ),
      },
      {
        path: 'navigation-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/navigation-tree-demo').then(
            (m) => m.NavigationTreeDemo,
          ),
      },
      {
        path: 'simple-tree-demo',
        loadComponent: () =>
          import('../pages/docs/tree/demos/simple-tree-demo').then(
            (m) => m.SimpleTreeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/video-player',
    children: [
      {
        path: 'player-video-player-demo',
        loadComponent: () =>
          import('../pages/docs/video-player/demos/player-video-player-demo').then(
            (m) => m.PlayerVideoPlayerDemo,
          ),
      },
      {
        path: 'minimal-video-player-demo',
        loadComponent: () =>
          import('../pages/docs/video-player/demos/minimal-video-player-demo').then(
            (m) => m.MinimalVideoPlayerDemo,
          ),
      },
      {
        path: 'controlled-video-player-demo',
        loadComponent: () =>
          import('../pages/docs/video-player/demos/controlled-video-player-demo').then(
            (m) => m.ControlledVideoPlayerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/virtual-list',
    children: [
      {
        path: 'basic-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/basic-virtual-list-demo').then(
            (m) => m.BasicVirtualListDemo,
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
        path: 'page-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/page-virtual-list-demo').then(
            (m) => m.PageVirtualListDemo,
          ),
      },
      {
        path: 'scroll-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/scroll-virtual-list-demo').then(
            (m) => m.ScrollVirtualListDemo,
          ),
      },
      {
        path: 'infinite-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/infinite-virtual-list-demo').then(
            (m) => m.InfiniteVirtualListDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/sidebar',
    children: [
      {
        path: 'basic-sidebar-demo',
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/basic-sidebar-demo').then(
            (m) => m.BasicSidebarDemo,
          ),
      },
      {
        path: 'icon-sidebar-demo',
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/icon-sidebar-demo').then(
            (m) => m.IconSidebarDemo,
          ),
      },
      {
        path: 'floating-sidebar-demo',
        loadComponent: () =>
          import('../pages/docs/sidebar/demos/floating-sidebar-demo').then(
            (m) => m.FloatingSidebarDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/navbar',
    children: [
      {
        path: 'basic-navbar-demo',
        loadComponent: () =>
          import('../pages/docs/navbar/demos/basic-navbar-demo').then(
            (m) => m.BasicNavbarDemo,
          ),
      },
      {
        path: 'mobile-navbar-demo',
        loadComponent: () =>
          import('../pages/docs/navbar/demos/mobile-navbar-demo').then(
            (m) => m.MobileNavbarDemo,
          ),
      },
    ],
  },
];
