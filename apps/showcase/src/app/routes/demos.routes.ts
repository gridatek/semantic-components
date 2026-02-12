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
        path: 'basic-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/basic-animated-counter-demo').then(
            (m) => m.BasicAnimatedCounterDemo,
          ),
      },
      {
        path: 'easing-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/easing-animated-counter-demo').then(
            (m) => m.EasingAnimatedCounterDemo,
          ),
      },
      {
        path: 'prefix-animated-counter-demo',
        loadComponent: () =>
          import('../pages/docs/animated-counter/demos/prefix-animated-counter-demo').then(
            (m) => m.PrefixAnimatedCounterDemo,
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
    path: 'demos/audio-player',
    children: [
      {
        path: 'audio-player-demo',
        loadComponent: () =>
          import('../pages/docs/audio-player/demos/audio-player-demo').then(
            (m) => m.AudioPlayerDemo,
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
    ],
  },
  {
    path: 'demos/avatar-group',
    children: [
      {
        path: 'basic-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/basic-avatar-group-demo').then(
            (m) => m.BasicAvatarGroupDemo,
          ),
      },
      {
        path: 'sizes-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/sizes-avatar-group-demo').then(
            (m) => m.SizesAvatarGroupDemo,
          ),
      },
      {
        path: 'spacing-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/spacing-avatar-group-demo').then(
            (m) => m.SpacingAvatarGroupDemo,
          ),
      },
      {
        path: 'max-count-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/max-count-avatar-group-demo').then(
            (m) => m.MaxCountAvatarGroupDemo,
          ),
      },
      {
        path: 'fallback-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/fallback-avatar-group-demo').then(
            (m) => m.FallbackAvatarGroupDemo,
          ),
      },
      {
        path: 'team-avatar-group-demo',
        loadComponent: () =>
          import('../pages/docs/avatar-group/demos/team-avatar-group-demo').then(
            (m) => m.TeamAvatarGroupDemo,
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
        path: 'basic-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/basic-barcode-scanner-demo').then(
            (m) => m.BasicBarcodeScannerDemo,
          ),
      },
      {
        path: 'qr-code-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/qr-code-barcode-scanner-demo').then(
            (m) => m.QrCodeBarcodeScannerDemo,
          ),
      },
      {
        path: 'product-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/product-barcode-scanner-demo').then(
            (m) => m.ProductBarcodeScannerDemo,
          ),
      },
      {
        path: 'single-scan-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/single-scan-barcode-scanner-demo').then(
            (m) => m.SingleScanBarcodeScannerDemo,
          ),
      },
      {
        path: 'history-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/history-barcode-scanner-demo').then(
            (m) => m.HistoryBarcodeScannerDemo,
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
        path: 'browser-support-barcode-scanner-demo',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/demos/browser-support-barcode-scanner-demo').then(
            (m) => m.BrowserSupportBarcodeScannerDemo,
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
        path: 'as-link-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/as-link-button-demo').then(
            (m) => m.AsLinkButtonDemo,
          ),
      },
      {
        path: 'loading-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/loading-button-demo').then(
            (m) => m.LoadingButtonDemo,
          ),
      },
      {
        path: 'disabled-link-button-demo',
        loadComponent: () =>
          import('../pages/docs/button/demos/disabled-link-button-demo').then(
            (m) => m.DisabledLinkButtonDemo,
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
    ],
  },
  {
    path: 'demos/calendar',
    children: [
      {
        path: 'single-date-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/single-date-calendar-demo').then(
            (m) => m.SingleDateCalendarDemo,
          ),
      },
      {
        path: 'multiple-date-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/multiple-date-calendar-demo').then(
            (m) => m.MultipleDateCalendarDemo,
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
        path: 'disabled-dates-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/disabled-dates-calendar-demo').then(
            (m) => m.DisabledDatesCalendarDemo,
          ),
      },
      {
        path: 'min-max-calendar-demo',
        loadComponent: () =>
          import('../pages/docs/calendar/demos/min-max-calendar-demo').then(
            (m) => m.MinMaxCalendarDemo,
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
    path: 'demos/chart',
    children: [
      {
        path: 'bar-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/bar-chart-demo').then(
            (m) => m.BarChartDemo,
          ),
      },
      {
        path: 'line-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/line-chart-demo').then(
            (m) => m.LineChartDemo,
          ),
      },
      {
        path: 'area-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/area-chart-demo').then(
            (m) => m.AreaChartDemo,
          ),
      },
      {
        path: 'pie-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/pie-chart-demo').then(
            (m) => m.PieChartDemo,
          ),
      },
      {
        path: 'donut-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/donut-chart-demo').then(
            (m) => m.DonutChartDemo,
          ),
      },
      {
        path: 'monthly-revenue-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/monthly-revenue-chart-demo').then(
            (m) => m.MonthlyRevenueChartDemo,
          ),
      },
      {
        path: 'user-growth-chart-demo',
        loadComponent: () =>
          import('../pages/docs/chart/demos/user-growth-chart-demo').then(
            (m) => m.UserGrowthChartDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/checkbox',
    children: [
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
        path: 'typescript-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/typescript-code-editor-demo').then(
            (m) => m.TypescriptCodeEditorDemo,
          ),
      },
      {
        path: 'html-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/html-code-editor-demo').then(
            (m) => m.HtmlCodeEditorDemo,
          ),
      },
      {
        path: 'css-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/css-code-editor-demo').then(
            (m) => m.CssCodeEditorDemo,
          ),
      },
      {
        path: 'json-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/json-code-editor-demo').then(
            (m) => m.JsonCodeEditorDemo,
          ),
      },
      {
        path: 'python-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/python-code-editor-demo').then(
            (m) => m.PythonCodeEditorDemo,
          ),
      },
      {
        path: 'sql-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/sql-code-editor-demo').then(
            (m) => m.SqlCodeEditorDemo,
          ),
      },
      {
        path: 'light-theme-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/light-theme-code-editor-demo').then(
            (m) => m.LightThemeCodeEditorDemo,
          ),
      },
      {
        path: 'readonly-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/readonly-code-editor-demo').then(
            (m) => m.ReadonlyCodeEditorDemo,
          ),
      },
      {
        path: 'minimal-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/minimal-code-editor-demo').then(
            (m) => m.MinimalCodeEditorDemo,
          ),
      },
      {
        path: 'word-wrap-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/word-wrap-code-editor-demo').then(
            (m) => m.WordWrapCodeEditorDemo,
          ),
      },
      {
        path: 'interactive-code-editor-demo',
        loadComponent: () =>
          import('../pages/docs/code-editor/demos/interactive-code-editor-demo').then(
            (m) => m.InteractiveCodeEditorDemo,
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
        path: 'full-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/full-color-picker-demo').then(
            (m) => m.FullColorPickerDemo,
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
        path: 'eyedropper-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/eyedropper-color-picker-demo').then(
            (m) => m.EyedropperColorPickerDemo,
          ),
      },
      {
        path: 'simple-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/simple-color-picker-demo').then(
            (m) => m.SimpleColorPickerDemo,
          ),
      },
      {
        path: 'compact-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/compact-color-picker-demo').then(
            (m) => m.CompactColorPickerDemo,
          ),
      },
      {
        path: 'rgb-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/rgb-color-picker-demo').then(
            (m) => m.RgbColorPickerDemo,
          ),
      },
      {
        path: 'hsl-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/hsl-color-picker-demo').then(
            (m) => m.HslColorPickerDemo,
          ),
      },
      {
        path: 'preview-color-picker-demo',
        loadComponent: () =>
          import('../pages/docs/color-picker/demos/preview-color-picker-demo').then(
            (m) => m.PreviewColorPickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/combobox',
    children: [
      {
        path: 'basic-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/basic-combobox-demo').then(
            (m) => m.BasicComboboxDemo,
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
        path: 'multiple-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/multiple-combobox-demo').then(
            (m) => m.MultipleComboboxDemo,
          ),
      },
      {
        path: 'countries-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/countries-combobox-demo').then(
            (m) => m.CountriesComboboxDemo,
          ),
      },
      {
        path: 'form-combobox-demo',
        loadComponent: () =>
          import('../pages/docs/combobox/demos/form-combobox-demo').then(
            (m) => m.FormComboboxDemo,
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
        path: 'basic-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/basic-confetti-demo').then(
            (m) => m.BasicConfettiDemo,
          ),
      },
      {
        path: 'from-element-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/from-element-confetti-demo').then(
            (m) => m.FromElementConfettiDemo,
          ),
      },
      {
        path: 'custom-colors-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/custom-colors-confetti-demo').then(
            (m) => m.CustomColorsConfettiDemo,
          ),
      },
      {
        path: 'multiple-bursts-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/multiple-bursts-confetti-demo').then(
            (m) => m.MultipleBurstsConfettiDemo,
          ),
      },
      {
        path: 'corner-bursts-confetti-demo',
        loadComponent: () =>
          import('../pages/docs/confetti/demos/corner-bursts-confetti-demo').then(
            (m) => m.CornerBurstsConfettiDemo,
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
    ],
  },
  {
    path: 'demos/copy-button',
    children: [
      {
        path: 'basic-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/basic-copy-button-demo').then(
            (m) => m.BasicCopyButtonDemo,
          ),
      },
      {
        path: 'variants-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/variants-copy-button-demo').then(
            (m) => m.VariantsCopyButtonDemo,
          ),
      },
      {
        path: 'sizes-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/sizes-copy-button-demo').then(
            (m) => m.SizesCopyButtonDemo,
          ),
      },
      {
        path: 'withtext-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/withtext-copy-button-demo').then(
            (m) => m.WithtextCopyButtonDemo,
          ),
      },
      {
        path: 'input-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/input-copy-button-demo').then(
            (m) => m.InputCopyButtonDemo,
          ),
      },
      {
        path: 'code-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/code-copy-button-demo').then(
            (m) => m.CodeCopyButtonDemo,
          ),
      },
      {
        path: 'inline-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/inline-copy-button-demo').then(
            (m) => m.InlineCopyButtonDemo,
          ),
      },
      {
        path: 'timeout-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/timeout-copy-button-demo').then(
            (m) => m.TimeoutCopyButtonDemo,
          ),
      },
      {
        path: 'disabled-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/disabled-copy-button-demo').then(
            (m) => m.DisabledCopyButtonDemo,
          ),
      },
      {
        path: 'usecases-copy-button-demo',
        loadComponent: () =>
          import('../pages/docs/copy-button/demos/usecases-copy-button-demo').then(
            (m) => m.UsecasesCopyButtonDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/countdown',
    children: [
      {
        path: 'basic-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/basic-countdown-demo').then(
            (m) => m.BasicCountdownDemo,
          ),
      },
      {
        path: 'compact-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/compact-countdown-demo').then(
            (m) => m.CompactCountdownDemo,
          ),
      },
      {
        path: 'cards-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/cards-countdown-demo').then(
            (m) => m.CardsCountdownDemo,
          ),
      },
      {
        path: 'separator-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/separator-countdown-demo').then(
            (m) => m.SeparatorCountdownDemo,
          ),
      },
      {
        path: 'labels-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/labels-countdown-demo').then(
            (m) => m.LabelsCountdownDemo,
          ),
      },
      {
        path: 'nodays-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/nodays-countdown-demo').then(
            (m) => m.NodaysCountdownDemo,
          ),
      },
      {
        path: 'simple-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/simple-countdown-demo').then(
            (m) => m.SimpleCountdownDemo,
          ),
      },
      {
        path: 'event-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/event-countdown-demo').then(
            (m) => m.EventCountdownDemo,
          ),
      },
      {
        path: 'sale-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/sale-countdown-demo').then(
            (m) => m.SaleCountdownDemo,
          ),
      },
      {
        path: 'completed-countdown-demo',
        loadComponent: () =>
          import('../pages/docs/countdown/demos/completed-countdown-demo').then(
            (m) => m.CompletedCountdownDemo,
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
        path: 'placeholder-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/placeholder-date-picker-demo').then(
            (m) => m.PlaceholderDatePickerDemo,
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
        path: 'constrained-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/constrained-date-picker-demo').then(
            (m) => m.ConstrainedDatePickerDemo,
          ),
      },
      {
        path: 'form-date-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-picker/demos/form-date-picker-demo').then(
            (m) => m.FormDatePickerDemo,
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
        path: 'constrained-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/constrained-date-range-picker-demo').then(
            (m) => m.ConstrainedDateRangePickerDemo,
          ),
      },
      {
        path: 'formats-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/formats-date-range-picker-demo').then(
            (m) => m.FormatsDateRangePickerDemo,
          ),
      },
      {
        path: 'no-clear-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/no-clear-date-range-picker-demo').then(
            (m) => m.NoClearDateRangePickerDemo,
          ),
      },
      {
        path: 'disabled-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/disabled-date-range-picker-demo').then(
            (m) => m.DisabledDateRangePickerDemo,
          ),
      },
      {
        path: 'analytics-date-range-picker-demo',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/demos/analytics-date-range-picker-demo').then(
            (m) => m.AnalyticsDateRangePickerDemo,
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
    path: 'demos/diff-viewer',
    children: [
      {
        path: 'basic-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/basic-diff-viewer-demo').then(
            (m) => m.BasicDiffViewerDemo,
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
        path: 'json-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/json-diff-viewer-demo').then(
            (m) => m.JsonDiffViewerDemo,
          ),
      },
      {
        path: 'minimal-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/minimal-diff-viewer-demo').then(
            (m) => m.MinimalDiffViewerDemo,
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
        path: 'large-diff-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/demos/large-diff-viewer-demo').then(
            (m) => m.LargeDiffViewerDemo,
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
        path: 'basic-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/basic-dock-demo').then(
            (m) => m.BasicDockDemo,
          ),
      },
      {
        path: 'no-magnification-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/no-magnification-dock-demo').then(
            (m) => m.NoMagnificationDockDemo,
          ),
      },
      {
        path: 'badges-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/badges-dock-demo').then(
            (m) => m.BadgesDockDemo,
          ),
      },
      {
        path: 'sizes-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/sizes-dock-demo').then(
            (m) => m.SizesDockDemo,
          ),
      },
      {
        path: 'magnification-scale-dock-demo',
        loadComponent: () =>
          import('../pages/docs/dock/demos/magnification-scale-dock-demo').then(
            (m) => m.MagnificationScaleDockDemo,
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
        path: 'no-search-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/no-search-emoji-picker-demo').then(
            (m) => m.NoSearchEmojiPickerDemo,
          ),
      },
      {
        path: 'no-categories-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/no-categories-emoji-picker-demo').then(
            (m) => m.NoCategoriesEmojiPickerDemo,
          ),
      },
      {
        path: 'no-recent-emoji-picker-demo',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/demos/no-recent-emoji-picker-demo').then(
            (m) => m.NoRecentEmojiPickerDemo,
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
        path: 'basic-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/basic-editor-demo').then(
            (m) => m.BasicEditorDemo,
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
        path: 'minimal-toolbar-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/minimal-toolbar-editor-demo').then(
            (m) => m.MinimalToolbarEditorDemo,
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
        path: 'custom-height-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/custom-height-editor-demo').then(
            (m) => m.CustomHeightEditorDemo,
          ),
      },
      {
        path: 'full-featured-editor-demo',
        loadComponent: () =>
          import('../pages/docs/editor/demos/full-featured-editor-demo').then(
            (m) => m.FullFeaturedEditorDemo,
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
        path: 'dropzone-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/dropzone-file-upload-demo').then(
            (m) => m.DropzoneFileUploadDemo,
          ),
      },
      {
        path: 'image-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/image-file-upload-demo').then(
            (m) => m.ImageFileUploadDemo,
          ),
      },
      {
        path: 'button-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/button-file-upload-demo').then(
            (m) => m.ButtonFileUploadDemo,
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
        path: 'progress-file-upload-demo',
        loadComponent: () =>
          import('../pages/docs/file-upload/demos/progress-file-upload-demo').then(
            (m) => m.ProgressFileUploadDemo,
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
        path: 'basic-image-annotator-demo',
        loadComponent: () =>
          import('../pages/docs/image-annotator/demos/basic-image-annotator-demo').then(
            (m) => m.BasicImageAnnotatorDemo,
          ),
      },
      {
        path: 'custom-size-image-annotator-demo',
        loadComponent: () =>
          import('../pages/docs/image-annotator/demos/custom-size-image-annotator-demo').then(
            (m) => m.CustomSizeImageAnnotatorDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/image-compare',
    children: [
      {
        path: 'basic-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/basic-image-compare-demo').then(
            (m) => m.BasicImageCompareDemo,
          ),
      },
      {
        path: 'labels-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/labels-image-compare-demo').then(
            (m) => m.LabelsImageCompareDemo,
          ),
      },
      {
        path: 'no-labels-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/no-labels-image-compare-demo').then(
            (m) => m.NoLabelsImageCompareDemo,
          ),
      },
      {
        path: 'vertical-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/vertical-image-compare-demo').then(
            (m) => m.VerticalImageCompareDemo,
          ),
      },
      {
        path: 'position-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/position-image-compare-demo').then(
            (m) => m.PositionImageCompareDemo,
          ),
      },
      {
        path: 'controlled-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/controlled-image-compare-demo').then(
            (m) => m.ControlledImageCompareDemo,
          ),
      },
      {
        path: 'square-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/square-image-compare-demo').then(
            (m) => m.SquareImageCompareDemo,
          ),
      },
      {
        path: 'keyboard-image-compare-demo',
        loadComponent: () =>
          import('../pages/docs/image-compare/demos/keyboard-image-compare-demo').then(
            (m) => m.KeyboardImageCompareDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/image-cropper',
    children: [
      {
        path: 'basic-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/basic-image-cropper-demo').then(
            (m) => m.BasicImageCropperDemo,
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
        path: 'avatar-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/avatar-image-cropper-demo').then(
            (m) => m.AvatarImageCropperDemo,
          ),
      },
      {
        path: 'upload-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/upload-image-cropper-demo').then(
            (m) => m.UploadImageCropperDemo,
          ),
      },
      {
        path: 'info-image-cropper-demo',
        loadComponent: () =>
          import('../pages/docs/image-cropper/demos/info-image-cropper-demo').then(
            (m) => m.InfoImageCropperDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/infinite-scroll',
    children: [
      {
        path: 'basic-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/basic-infinite-scroll-demo').then(
            (m) => m.BasicInfiniteScrollDemo,
          ),
      },
      {
        path: 'custom-loader-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/custom-loader-infinite-scroll-demo').then(
            (m) => m.CustomLoaderInfiniteScrollDemo,
          ),
      },
      {
        path: 'end-message-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/end-message-infinite-scroll-demo').then(
            (m) => m.EndMessageInfiniteScrollDemo,
          ),
      },
      {
        path: 'threshold-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/threshold-infinite-scroll-demo').then(
            (m) => m.ThresholdInfiniteScrollDemo,
          ),
      },
      {
        path: 'grid-infinite-scroll-demo',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/demos/grid-infinite-scroll-demo').then(
            (m) => m.GridInfiniteScrollDemo,
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
    ],
  },
  {
    path: 'demos/opt-field',
    children: [
      {
        path: 'basic-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/basic-opt-field-demo').then(
            (m) => m.BasicOptFieldDemo,
          ),
      },
      {
        path: 'separator-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/separator-opt-field-demo').then(
            (m) => m.SeparatorOptFieldDemo,
          ),
      },
      {
        path: 'pin-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/pin-opt-field-demo').then(
            (m) => m.PinOptFieldDemo,
          ),
      },
      {
        path: 'dot-separator-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/dot-separator-opt-field-demo').then(
            (m) => m.DotSeparatorOptFieldDemo,
          ),
      },
      {
        path: 'disabled-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/disabled-opt-field-demo').then(
            (m) => m.DisabledOptFieldDemo,
          ),
      },
      {
        path: 'verification-opt-field-demo',
        loadComponent: () =>
          import('../pages/docs/opt-field/demos/verification-opt-field-demo').then(
            (m) => m.VerificationOptFieldDemo,
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
        path: 'minimal-kanban-board-demo',
        loadComponent: () =>
          import('../pages/docs/kanban-board/demos/minimal-kanban-board-demo').then(
            (m) => m.MinimalKanbanBoardDemo,
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
    ],
  },
  {
    path: 'demos/language-switcher',
    children: [
      {
        path: 'basic-toggle-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/basic-toggle-language-switcher-demo').then(
            (m) => m.BasicToggleLanguageSwitcherDemo,
          ),
      },
      {
        path: 'icon-only-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/icon-only-language-switcher-demo').then(
            (m) => m.IconOnlyLanguageSwitcherDemo,
          ),
      },
      {
        path: 'variants-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/variants-language-switcher-demo').then(
            (m) => m.VariantsLanguageSwitcherDemo,
          ),
      },
      {
        path: 'sizes-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/sizes-language-switcher-demo').then(
            (m) => m.SizesLanguageSwitcherDemo,
          ),
      },
      {
        path: 'select-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/select-language-switcher-demo').then(
            (m) => m.SelectLanguageSwitcherDemo,
          ),
      },
      {
        path: 'english-labels-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/english-labels-language-switcher-demo').then(
            (m) => m.EnglishLabelsLanguageSwitcherDemo,
          ),
      },
      {
        path: 'button-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/button-language-switcher-demo').then(
            (m) => m.ButtonLanguageSwitcherDemo,
          ),
      },
      {
        path: 'navigation-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/navigation-language-switcher-demo').then(
            (m) => m.NavigationLanguageSwitcherDemo,
          ),
      },
      {
        path: 'settings-panel-language-switcher-demo',
        loadComponent: () =>
          import('../pages/docs/language-switcher/demos/settings-panel-language-switcher-demo').then(
            (m) => m.SettingsPanelLanguageSwitcherDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/lightbox',
    children: [
      {
        path: 'basic-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/basic-lightbox-demo').then(
            (m) => m.BasicLightboxDemo,
          ),
      },
      {
        path: 'info-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/info-lightbox-demo').then(
            (m) => m.InfoLightboxDemo,
          ),
      },
      {
        path: 'gallery-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/gallery-lightbox-demo').then(
            (m) => m.GalleryLightboxDemo,
          ),
      },
      {
        path: 'no-thumbnails-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/no-thumbnails-lightbox-demo').then(
            (m) => m.NoThumbnailsLightboxDemo,
          ),
      },
      {
        path: 'no-zoom-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/no-zoom-lightbox-demo').then(
            (m) => m.NoZoomLightboxDemo,
          ),
      },
      {
        path: 'no-loop-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/no-loop-lightbox-demo').then(
            (m) => m.NoLoopLightboxDemo,
          ),
      },
      {
        path: 'single-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/single-lightbox-demo').then(
            (m) => m.SingleLightboxDemo,
          ),
      },
      {
        path: 'keyboard-lightbox-demo',
        loadComponent: () =>
          import('../pages/docs/lightbox/demos/keyboard-lightbox-demo').then(
            (m) => m.KeyboardLightboxDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/marquee',
    children: [
      {
        path: 'text-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/text-marquee-demo').then(
            (m) => m.TextMarqueeDemo,
          ),
      },
      {
        path: 'reversed-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/reversed-marquee-demo').then(
            (m) => m.ReversedMarqueeDemo,
          ),
      },
      {
        path: 'logo-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/logo-marquee-demo').then(
            (m) => m.LogoMarqueeDemo,
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
        path: 'speed-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/speed-marquee-demo').then(
            (m) => m.SpeedMarqueeDemo,
          ),
      },
      {
        path: 'pause-on-hover-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/pause-on-hover-marquee-demo').then(
            (m) => m.PauseOnHoverMarqueeDemo,
          ),
      },
      {
        path: 'gallery-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/gallery-marquee-demo').then(
            (m) => m.GalleryMarqueeDemo,
          ),
      },
      {
        path: 'stacked-marquee-demo',
        loadComponent: () =>
          import('../pages/docs/marquee/demos/stacked-marquee-demo').then(
            (m) => m.StackedMarqueeDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/masonry-grid',
    children: [
      {
        path: 'basic-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/basic-masonry-grid-demo').then(
            (m) => m.BasicMasonryGridDemo,
          ),
      },
      {
        path: 'image-gallery-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/image-gallery-masonry-grid-demo').then(
            (m) => m.ImageGalleryMasonryGridDemo,
          ),
      },
      {
        path: 'breakpoints-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/breakpoints-masonry-grid-demo').then(
            (m) => m.BreakpointsMasonryGridDemo,
          ),
      },
      {
        path: 'cards-masonry-grid-demo',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/demos/cards-masonry-grid-demo').then(
            (m) => m.CardsMasonryGridDemo,
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
    ],
  },
  {
    path: 'demos/multi-select',
    children: [
      {
        path: 'basic-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/basic-multi-select-demo').then(
            (m) => m.BasicMultiSelectDemo,
          ),
      },
      {
        path: 'selectall-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/selectall-multi-select-demo').then(
            (m) => m.SelectallMultiSelectDemo,
          ),
      },
      {
        path: 'count-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/count-multi-select-demo').then(
            (m) => m.CountMultiSelectDemo,
          ),
      },
      {
        path: 'disabled-options-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/disabled-options-multi-select-demo').then(
            (m) => m.DisabledOptionsMultiSelectDemo,
          ),
      },
      {
        path: 'nosearch-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/nosearch-multi-select-demo').then(
            (m) => m.NosearchMultiSelectDemo,
          ),
      },
      {
        path: 'disabled-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/disabled-multi-select-demo').then(
            (m) => m.DisabledMultiSelectDemo,
          ),
      },
      {
        path: 'form-multi-select-demo',
        loadComponent: () =>
          import('../pages/docs/multi-select/demos/form-multi-select-demo').then(
            (m) => m.FormMultiSelectDemo,
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
        path: 'grouped-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/grouped-notification-center-demo').then(
            (m) => m.GroupedNotificationCenterDemo,
          ),
      },
      {
        path: 'flat-notification-center-demo',
        loadComponent: () =>
          import('../pages/docs/notification-center/demos/flat-notification-center-demo').then(
            (m) => m.FlatNotificationCenterDemo,
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
    path: 'demos/number-field',
    children: [
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
        path: 'horizontal-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/horizontal-org-chart-demo').then(
            (m) => m.HorizontalOrgChartDemo,
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
        path: 'compact-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/compact-org-chart-demo').then(
            (m) => m.CompactOrgChartDemo,
          ),
      },
      {
        path: 'non-collapsible-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/non-collapsible-org-chart-demo').then(
            (m) => m.NonCollapsibleOrgChartDemo,
          ),
      },
      {
        path: 'large-org-chart-demo',
        loadComponent: () =>
          import('../pages/docs/org-chart/demos/large-org-chart-demo').then(
            (m) => m.LargeOrgChartDemo,
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
        path: 'show-default-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/show-default-password-field-demo').then(
            (m) => m.ShowDefaultPasswordFieldDemo,
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
        path: 'new-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/new-password-field-demo').then(
            (m) => m.NewPasswordFieldDemo,
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
        path: 'full-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/full-password-field-demo').then(
            (m) => m.FullPasswordFieldDemo,
          ),
      },
      {
        path: 'signal-forms-password-field-demo',
        loadComponent: () =>
          import('../pages/docs/password-field/demos/signal-forms-password-field-demo').then(
            (m) => m.SignalFormsPasswordFieldDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/pagination',
    children: [
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
        path: 'basic-pdf-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/basic-pdf-viewer-demo').then(
            (m) => m.BasicPdfViewerDemo,
          ),
      },
      {
        path: 'minimal-pdf-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/minimal-pdf-viewer-demo').then(
            (m) => m.MinimalPdfViewerDemo,
          ),
      },
      {
        path: 'custom-toolbar-pdf-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/custom-toolbar-pdf-viewer-demo').then(
            (m) => m.CustomToolbarPdfViewerDemo,
          ),
      },
      {
        path: 'interactive-pdf-viewer-demo',
        loadComponent: () =>
          import('../pages/docs/pdf-viewer/demos/interactive-pdf-viewer-demo').then(
            (m) => m.InteractivePdfViewerDemo,
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
      {
        path: 'default-country-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/default-country-phone-input-demo').then(
            (m) => m.DefaultCountryPhoneInputDemo,
          ),
      },
      {
        path: 'us-format-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/us-format-phone-input-demo').then(
            (m) => m.UsFormatPhoneInputDemo,
          ),
      },
      {
        path: 'international-format-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/international-format-phone-input-demo').then(
            (m) => m.InternationalFormatPhoneInputDemo,
          ),
      },
      {
        path: 'without-icon-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/without-icon-phone-input-demo').then(
            (m) => m.WithoutIconPhoneInputDemo,
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
        path: 'form-phone-input-demo',
        loadComponent: () =>
          import('../pages/docs/phone-input/demos/form-phone-input-demo').then(
            (m) => m.FormPhoneInputDemo,
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
        path: 'values-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/values-progress-demo').then(
            (m) => m.ValuesProgressDemo,
          ),
      },
      {
        path: 'custom-max-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/custom-max-progress-demo').then(
            (m) => m.CustomMaxProgressDemo,
          ),
      },
      {
        path: 'custom-styling-progress-demo',
        loadComponent: () =>
          import('../pages/docs/progress/demos/custom-styling-progress-demo').then(
            (m) => m.CustomStylingProgressDemo,
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
        path: 'logo-qr-code-demo',
        loadComponent: () =>
          import('../pages/docs/qr-code/demos/logo-qr-code-demo').then(
            (m) => m.LogoQrCodeDemo,
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
    path: 'demos/search-input',
    children: [
      {
        path: 'basic-search-input-demo',
        loadComponent: () =>
          import('../pages/docs/search-input/demos/basic-search-input-demo').then(
            (m) => m.BasicSearchInputDemo,
          ),
      },
      {
        path: 'loading-search-input-demo',
        loadComponent: () =>
          import('../pages/docs/search-input/demos/loading-search-input-demo').then(
            (m) => m.LoadingSearchInputDemo,
          ),
      },
      {
        path: 'categories-search-input-demo',
        loadComponent: () =>
          import('../pages/docs/search-input/demos/categories-search-input-demo').then(
            (m) => m.CategoriesSearchInputDemo,
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
            (m) => m.ScSelectDemo,
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
        path: 'colors-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/colors-signature-pad-demo').then(
            (m) => m.ColorsSignaturePadDemo,
          ),
      },
      {
        path: 'thick-pen-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/thick-pen-signature-pad-demo').then(
            (m) => m.ThickPenSignaturePadDemo,
          ),
      },
      {
        path: 'no-controls-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/no-controls-signature-pad-demo').then(
            (m) => m.NoControlsSignaturePadDemo,
          ),
      },
      {
        path: 'disabled-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/disabled-signature-pad-demo').then(
            (m) => m.DisabledSignaturePadDemo,
          ),
      },
      {
        path: 'small-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/small-signature-pad-demo').then(
            (m) => m.SmallSignaturePadDemo,
          ),
      },
      {
        path: 'preview-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/preview-signature-pad-demo').then(
            (m) => m.PreviewSignaturePadDemo,
          ),
      },
      {
        path: 'form-signature-pad-demo',
        loadComponent: () =>
          import('../pages/docs/signature-pad/demos/form-signature-pad-demo').then(
            (m) => m.FormSignaturePadDemo,
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
        path: 'range-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/range-slider-demo').then(
            (m) => m.RangeSliderDemo,
          ),
      },
      {
        path: 'step-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/step-slider-demo').then(
            (m) => m.StepSliderDemo,
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
        path: 'volume-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/volume-slider-demo').then(
            (m) => m.VolumeSliderDemo,
          ),
      },
      {
        path: 'price-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/price-slider-demo').then(
            (m) => m.PriceSliderDemo,
          ),
      },
      {
        path: 'temperature-slider-demo',
        loadComponent: () =>
          import('../pages/docs/slider/demos/temperature-slider-demo').then(
            (m) => m.TemperatureSliderDemo,
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
        path: 'task-list-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/task-list-sortable-list-demo').then(
            (m) => m.TaskListSortableListDemo,
          ),
      },
      {
        path: 'playlist-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/playlist-sortable-list-demo').then(
            (m) => m.PlaylistSortableListDemo,
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
        path: 'kanban-sortable-list-demo',
        loadComponent: () =>
          import('../pages/docs/sortable-list/demos/kanban-sortable-list-demo').then(
            (m) => m.KanbanSortableListDemo,
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
        path: 'custom-icons-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/custom-icons-speed-dial-demo').then(
            (m) => m.CustomIconsSpeedDialDemo,
          ),
      },
      {
        path: 'sizes-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/sizes-speed-dial-demo').then(
            (m) => m.SizesSpeedDialDemo,
          ),
      },
      {
        path: 'without-labels-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/without-labels-speed-dial-demo').then(
            (m) => m.WithoutLabelsSpeedDialDemo,
          ),
      },
      {
        path: 'disabled-actions-speed-dial-demo',
        loadComponent: () =>
          import('../pages/docs/speed-dial/demos/disabled-actions-speed-dial-demo').then(
            (m) => m.DisabledActionsSpeedDialDemo,
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
    path: 'demos/split-button',
    children: [
      {
        path: 'basic-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/basic-split-button-demo').then(
            (m) => m.BasicSplitButtonDemo,
          ),
      },
      {
        path: 'variants-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/variants-split-button-demo').then(
            (m) => m.VariantsSplitButtonDemo,
          ),
      },
      {
        path: 'sizes-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/sizes-split-button-demo').then(
            (m) => m.SizesSplitButtonDemo,
          ),
      },
      {
        path: 'icons-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/icons-split-button-demo').then(
            (m) => m.IconsSplitButtonDemo,
          ),
      },
      {
        path: 'destructive-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/destructive-split-button-demo').then(
            (m) => m.DestructiveSplitButtonDemo,
          ),
      },
      {
        path: 'disabled-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/disabled-split-button-demo').then(
            (m) => m.DisabledSplitButtonDemo,
          ),
      },
      {
        path: 'form-split-button-demo',
        loadComponent: () =>
          import('../pages/docs/split-button/demos/form-split-button-demo').then(
            (m) => m.FormSplitButtonDemo,
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
        path: 'custom-overlay-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/custom-overlay-spotlight-demo').then(
            (m) => m.CustomOverlaySpotlightDemo,
          ),
      },
      {
        path: 'placement-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/placement-spotlight-demo').then(
            (m) => m.PlacementSpotlightDemo,
          ),
      },
      {
        path: 'interactive-spotlight-demo',
        loadComponent: () =>
          import('../pages/docs/spotlight/demos/interactive-spotlight-demo').then(
            (m) => m.InteractiveSpotlightDemo,
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
        path: 'sizes-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/sizes-stat-card-demo').then(
            (m) => m.SizesStatCardDemo,
          ),
      },
      {
        path: 'variants-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/variants-stat-card-demo').then(
            (m) => m.VariantsStatCardDemo,
          ),
      },
      {
        path: 'description-stat-card-demo',
        loadComponent: () =>
          import('../pages/docs/stat-card/demos/description-stat-card-demo').then(
            (m) => m.DescriptionStatCardDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/stepper',
    children: [
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
        path: 'form-switch-demo',
        loadComponent: () =>
          import('../pages/docs/switch/demos/form-switch-demo').then(
            (m) => m.FormSwitchDemo,
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
    path: 'demos/tag-input',
    children: [
      {
        path: 'basic-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/basic-tag-input-demo').then(
            (m) => m.BasicTagInputDemo,
          ),
      },
      {
        path: 'clearable-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/clearable-tag-input-demo').then(
            (m) => m.ClearableTagInputDemo,
          ),
      },
      {
        path: 'max-tags-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/max-tags-tag-input-demo').then(
            (m) => m.MaxTagsTagInputDemo,
          ),
      },
      {
        path: 'variants-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/variants-tag-input-demo').then(
            (m) => m.VariantsTagInputDemo,
          ),
      },
      {
        path: 'duplicates-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/duplicates-tag-input-demo').then(
            (m) => m.DuplicatesTagInputDemo,
          ),
      },
      {
        path: 'delimiters-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/delimiters-tag-input-demo').then(
            (m) => m.DelimitersTagInputDemo,
          ),
      },
      {
        path: 'blur-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/blur-tag-input-demo').then(
            (m) => m.BlurTagInputDemo,
          ),
      },
      {
        path: 'disabled-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/disabled-tag-input-demo').then(
            (m) => m.DisabledTagInputDemo,
          ),
      },
      {
        path: 'validation-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/validation-tag-input-demo').then(
            (m) => m.ValidationTagInputDemo,
          ),
      },
      {
        path: 'form-field-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/form-field-tag-input-demo').then(
            (m) => m.FormFieldTagInputDemo,
          ),
      },
      {
        path: 'email-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/email-tag-input-demo').then(
            (m) => m.EmailTagInputDemo,
          ),
      },
      {
        path: 'output-tag-input-demo',
        loadComponent: () =>
          import('../pages/docs/tag-input/demos/output-tag-input-demo').then(
            (m) => m.OutputTagInputDemo,
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
    path: 'demos/theme-toggle',
    children: [
      {
        path: 'basic-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/basic-theme-toggle-demo').then(
            (m) => m.BasicThemeToggleDemo,
          ),
      },
      {
        path: 'variants-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/variants-theme-toggle-demo').then(
            (m) => m.VariantsThemeToggleDemo,
          ),
      },
      {
        path: 'sizes-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/sizes-theme-toggle-demo').then(
            (m) => m.SizesThemeToggleDemo,
          ),
      },
      {
        path: 'theme-select-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/theme-select-demo').then(
            (m) => m.ThemeSelectDemo,
          ),
      },
      {
        path: 'navigation-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/navigation-theme-toggle-demo').then(
            (m) => m.NavigationThemeToggleDemo,
          ),
      },
      {
        path: 'settings-panel-theme-toggle-demo',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/demos/settings-panel-theme-toggle-demo').then(
            (m) => m.SettingsPanelThemeToggleDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/time-picker',
    children: [
      {
        path: 'format-12h-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/format-12h-time-picker-demo').then(
            (m) => m.Format12hTimePickerDemo,
          ),
      },
      {
        path: 'format-24h-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/format-24h-time-picker-demo').then(
            (m) => m.Format24hTimePickerDemo,
          ),
      },
      {
        path: 'seconds-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/seconds-time-picker-demo').then(
            (m) => m.SecondsTimePickerDemo,
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
        path: 'clock-hours-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/clock-hours-time-picker-demo').then(
            (m) => m.ClockHoursTimePickerDemo,
          ),
      },
      {
        path: 'clock-minutes-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/clock-minutes-time-picker-demo').then(
            (m) => m.ClockMinutesTimePickerDemo,
          ),
      },
      {
        path: 'presets-time-picker-demo',
        loadComponent: () =>
          import('../pages/docs/time-picker/demos/presets-time-picker-demo').then(
            (m) => m.PresetsTimePickerDemo,
          ),
      },
    ],
  },
  {
    path: 'demos/timeline',
    children: [
      {
        path: 'basic-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/basic-timeline-demo').then(
            (m) => m.BasicTimelineDemo,
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
        path: 'sizes-timeline-demo',
        loadComponent: () =>
          import('../pages/docs/timeline/demos/sizes-timeline-demo').then(
            (m) => m.SizesTimelineDemo,
          ),
      },
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
    ],
  },
  {
    path: 'demos/timezone',
    children: [
      {
        path: 'basic-select-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/basic-select-timezone-demo').then(
            (m) => m.BasicSelectTimezoneDemo,
          ),
      },
      {
        path: 'no-abbr-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/no-abbr-timezone-demo').then(
            (m) => m.NoAbbrTimezoneDemo,
          ),
      },
      {
        path: 'no-offset-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/no-offset-timezone-demo').then(
            (m) => m.NoOffsetTimezoneDemo,
          ),
      },
      {
        path: 'display-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/display-timezone-demo').then(
            (m) => m.DisplayTimezoneDemo,
          ),
      },
      {
        path: 'display-offset-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/display-offset-timezone-demo').then(
            (m) => m.DisplayOffsetTimezoneDemo,
          ),
      },
      {
        path: 'icon-only-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/icon-only-timezone-demo').then(
            (m) => m.IconOnlyTimezoneDemo,
          ),
      },
      {
        path: 'variants-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/variants-timezone-demo').then(
            (m) => m.VariantsTimezoneDemo,
          ),
      },
      {
        path: 'sizes-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/sizes-timezone-demo').then(
            (m) => m.SizesTimezoneDemo,
          ),
      },
      {
        path: 'button-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/button-timezone-demo').then(
            (m) => m.ButtonTimezoneDemo,
          ),
      },
      {
        path: 'button-offset-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/button-offset-timezone-demo').then(
            (m) => m.ButtonOffsetTimezoneDemo,
          ),
      },
      {
        path: 'badge-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/badge-timezone-demo').then(
            (m) => m.BadgeTimezoneDemo,
          ),
      },
      {
        path: 'badge-no-icon-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/badge-no-icon-timezone-demo').then(
            (m) => m.BadgeNoIconTimezoneDemo,
          ),
      },
      {
        path: 'navigation-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/navigation-timezone-demo').then(
            (m) => m.NavigationTimezoneDemo,
          ),
      },
      {
        path: 'settings-panel-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/settings-panel-timezone-demo').then(
            (m) => m.SettingsPanelTimezoneDemo,
          ),
      },
      {
        path: 'current-time-timezone-demo',
        loadComponent: () =>
          import('../pages/docs/timezone/demos/current-time-timezone-demo').then(
            (m) => m.CurrentTimeTimezoneDemo,
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
        path: 'full-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/full-tour-guide-demo').then(
            (m) => m.FullTourGuideDemo,
          ),
      },
      {
        path: 'minimal-tour-guide-demo',
        loadComponent: () =>
          import('../pages/docs/tour-guide/demos/minimal-tour-guide-demo').then(
            (m) => m.MinimalTourGuideDemo,
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
        path: 'no-search-transfer-list-demo',
        loadComponent: () =>
          import('../pages/docs/transfer-list/demos/no-search-transfer-list-demo').then(
            (m) => m.NoSearchTransferListDemo,
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
        path: 'basic-video-player-demo',
        loadComponent: () =>
          import('../pages/docs/video-player/demos/video-player-demo').then(
            (m) => m.VideoPlayerDemo,
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
        path: 'complex-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/complex-virtual-list-demo').then(
            (m) => m.ComplexVirtualListDemo,
          ),
      },
      {
        path: 'scroll-controls-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/scroll-controls-virtual-list-demo').then(
            (m) => m.ScrollControlsVirtualListDemo,
          ),
      },
      {
        path: 'custom-height-virtual-list-demo',
        loadComponent: () =>
          import('../pages/docs/virtual-list/demos/custom-height-virtual-list-demo').then(
            (m) => m.CustomHeightVirtualListDemo,
          ),
      },
    ],
  },
];
