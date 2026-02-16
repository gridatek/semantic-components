import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const componentsRoutes: Route[] = [
  {
    path: 'docs/components',
    component: DocsLayout,
    children: [
      {
        path: '',
        title: 'Components - Semantic Components',
        loadComponent: () => import('../pages/docs/components/components-page'),
      },
      {
        path: 'accordion',
        title: 'Accordion - Semantic Components',
        loadComponent: () => import('../pages/docs/accordion/accordion-page'),
      },
      {
        path: 'alert',
        title: 'Alert - Semantic Components',
        loadComponent: () => import('../pages/docs/alert/alert-page'),
      },
      {
        path: 'alert-dialog',
        title: 'Alert Dialog - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/alert-dialog-page'),
      },
      {
        path: 'animated-counter',
        title: 'Animated Counter - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/animated-counter/animated-counter-page'),
      },
      {
        path: 'aspect-ratio',
        title: 'Aspect Ratio - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/aspect-ratio-page'),
      },
      {
        path: 'audio-player',
        title: 'Audio Player - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/audio-player/audio-player-page'),
      },
      {
        path: 'avatar',
        title: 'Avatar - Semantic Components',
        loadComponent: () => import('../pages/docs/avatar/avatar-page'),
      },
      {
        path: 'badge',
        title: 'Badge - Semantic Components',
        loadComponent: () => import('../pages/docs/badge/badge-page'),
      },
      {
        path: 'barcode-scanner',
        title: 'Barcode Scanner - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/barcode-scanner-page'),
      },
      {
        path: 'breadcrumb',
        title: 'Breadcrumb - Semantic Components',
        loadComponent: () => import('../pages/docs/breadcrumb/breadcrumb-page'),
      },
      {
        path: 'button',
        title: 'Button - Semantic Components',
        loadComponent: () => import('../pages/docs/button/button-page'),
      },
      {
        path: 'button-group',
        title: 'Button Group - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/button-group/button-group-page'),
      },
      {
        path: 'calendar',
        title: 'Calendar - Semantic Components',
        loadComponent: () => import('../pages/docs/calendar/calendar-page'),
      },
      {
        path: 'card',
        title: 'Card - Semantic Components',
        loadComponent: () => import('../pages/docs/card/card-page'),
      },
      {
        path: 'carousel',
        title: 'Carousel - Semantic Components',
        loadComponent: () => import('../pages/docs/carousel/carousel-page'),
      },
      {
        path: 'chart',
        title: 'Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/chart/chart-page'),
      },
      {
        path: 'checkbox',
        title: 'Checkbox - Semantic Components',
        loadComponent: () => import('../pages/docs/checkbox/checkbox-page'),
      },
      {
        path: 'native-checkbox',
        title: 'Native Checkbox - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/native-checkbox/native-checkbox-page'),
      },
      {
        path: 'code-editor',
        title: 'Code Editor - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/code-editor/code-editor-page'),
      },
      {
        path: 'code-viewer',
        title: 'Code Viewer - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/code-viewer/code-viewer-page'),
      },
      {
        path: 'collapsible',
        title: 'Collapsible - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/collapsible/collapsible-page'),
      },
      {
        path: 'color-picker',
        title: 'Color Picker - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/color-picker/color-picker-page'),
      },
      {
        path: 'combobox',
        title: 'Combobox - Semantic Components',
        loadComponent: () => import('../pages/docs/combobox/combobox-page'),
      },
      {
        path: 'command',
        title: 'Command - Semantic Components',
        loadComponent: () => import('../pages/docs/command/command-page'),
      },
      {
        path: 'confetti',
        title: 'Confetti - Semantic Components',
        loadComponent: () => import('../pages/docs/confetti/confetti-page'),
      },
      {
        path: 'context-menu',
        title: 'Context Menu - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/context-menu/context-menu-page'),
      },
      {
        path: 'copy-button',
        title: 'Copy Button - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/copy-button/copy-button-page'),
      },
      {
        path: 'countdown',
        title: 'Countdown - Semantic Components',
        loadComponent: () => import('../pages/docs/countdown/countdown-page'),
      },
      {
        path: 'data-table',
        title: 'Data Table - Semantic Components',
        loadComponent: () => import('../pages/docs/data-table/data-table-page'),
      },
      {
        path: 'date-picker',
        title: 'Date Picker - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/date-picker/date-picker-page'),
      },
      {
        path: 'date-range-picker',
        title: 'Date Range Picker - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/date-range-picker-page'),
      },
      {
        path: 'dialog',
        title: 'Dialog - Semantic Components',
        loadComponent: () => import('../pages/docs/dialog/dialog-page'),
      },
      {
        path: 'diff-viewer',
        title: 'Diff Viewer - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/diff-viewer-page'),
      },
      {
        path: 'dock',
        title: 'Dock - Semantic Components',
        loadComponent: () => import('../pages/docs/dock/dock-page'),
      },
      {
        path: 'drawer',
        title: 'Drawer - Semantic Components',
        loadComponent: () => import('../pages/docs/drawer/drawer-page'),
      },
      {
        path: 'emoji-picker',
        title: 'Emoji Picker - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/emoji-picker-page'),
      },
      {
        path: 'editor',
        title: 'Editor - Semantic Components',
        loadComponent: () => import('../pages/docs/editor/editor-page'),
      },
      {
        path: 'empty',
        title: 'Empty - Semantic Components',
        loadComponent: () => import('../pages/docs/empty/empty-page'),
      },
      {
        path: 'field',
        title: 'Field - Semantic Components',
        loadComponent: () => import('../pages/docs/field/field-page'),
      },
      {
        path: 'file-upload',
        title: 'File Upload - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/file-upload/file-upload-page'),
      },
      {
        path: 'hover-card',
        title: 'Hover Card - Semantic Components',
        loadComponent: () => import('../pages/docs/hover-card/hover-card-page'),
      },
      {
        path: 'image-annotator',
        title: 'Image Annotator - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/image-annotator/image-annotator-page'),
      },
      {
        path: 'image-compare',
        title: 'Image Compare - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/image-compare/image-compare-page'),
      },
      {
        path: 'image-cropper',
        title: 'Image Cropper - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/image-cropper/image-cropper-page'),
      },
      {
        path: 'infinite-scroll',
        title: 'Infinite Scroll - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/infinite-scroll-page'),
      },
      {
        path: 'item',
        title: 'Item - Semantic Components',
        loadComponent: () => import('../pages/docs/item/item-page'),
      },
      {
        path: 'input',
        title: 'Input - Semantic Components',
        loadComponent: () => import('../pages/docs/input/input-page'),
      },
      {
        path: 'input-group',
        title: 'Input Group - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/input-group/input-group-page'),
      },
      {
        path: 'opt-field',
        title: 'Opt Field - Semantic Components',
        loadComponent: () => import('../pages/docs/opt-field/opt-field-page'),
      },
      {
        path: 'kanban-board',
        title: 'Kanban Board - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/kanban-board/kanban-board-page'),
      },
      {
        path: 'kbd',
        title: 'Kbd - Semantic Components',
        loadComponent: () => import('../pages/docs/kbd/kbd-page'),
      },
      {
        path: 'label',
        title: 'Label - Semantic Components',
        loadComponent: () => import('../pages/docs/label/label-page'),
      },
      {
        path: 'language-switcher',
        title: 'Language Switcher - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/language-switcher/language-switcher-page'),
      },
      {
        path: 'link',
        title: 'Link - Semantic Components',
        loadComponent: () => import('../pages/docs/link/link-page'),
      },
      {
        path: 'lightbox',
        title: 'Lightbox - Semantic Components',
        loadComponent: () => import('../pages/docs/lightbox/lightbox-page'),
      },
      {
        path: 'marquee',
        title: 'Marquee - Semantic Components',
        loadComponent: () => import('../pages/docs/marquee/marquee-page'),
      },
      {
        path: 'masonry-grid',
        title: 'Masonry Grid - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/masonry-grid-page'),
      },
      {
        path: 'mention-input',
        title: 'Mention Input - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/mention-input/mention-input-page'),
      },
      {
        path: 'menu',
        title: 'Menu - Semantic Components',
        loadComponent: () => import('../pages/docs/menu/menu-page'),
      },
      {
        path: 'multi-select',
        title: 'Multi-Select - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/multi-select/multi-select-page'),
      },
      {
        path: 'native-select',
        title: 'Native Select - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/native-select/native-select-page'),
      },
      {
        path: 'navigation-menu',
        title: 'Navigation Menu - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/navigation-menu-page'),
      },
      {
        path: 'notification-center',
        title: 'Notification Center - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/notification-center/notification-center-page'),
      },
      {
        path: 'number-field',
        title: 'Number Field - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/number-field/number-field-page'),
      },
      {
        path: 'org-chart',
        title: 'Org Chart - Semantic Components',
        loadComponent: () => import('../pages/docs/org-chart/org-chart-page'),
      },
      {
        path: 'pagination',
        title: 'Pagination - Semantic Components',
        loadComponent: () => import('../pages/docs/pagination/pagination-page'),
      },
      {
        path: 'password-field',
        title: 'Password Field - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/password-field/password-field-page'),
      },
      {
        path: 'pdf-viewer',
        title: 'PDF Viewer - Semantic Components',
        loadComponent: () => import('../pages/docs/pdf-viewer/pdf-viewer-page'),
      },
      {
        path: 'phone-input',
        title: 'Phone Input - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/phone-input/phone-input-page'),
      },
      {
        path: 'popover',
        title: 'Popover - Semantic Components',
        loadComponent: () => import('../pages/docs/popover/popover-page'),
      },
      {
        path: 'progress',
        title: 'Progress - Semantic Components',
        loadComponent: () => import('../pages/docs/progress/progress-page'),
      },
      {
        path: 'qr-code',
        title: 'QR Code - Semantic Components',
        loadComponent: () => import('../pages/docs/qr-code/qr-code-page'),
      },
      {
        path: 'radio-group',
        title: 'Radio Group - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/radio-group/radio-group-page'),
      },
      {
        path: 'rating-field',
        title: 'Rating Field - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/rating-field/rating-field-page'),
      },
      {
        path: 'resizable',
        title: 'Resizable - Semantic Components',
        loadComponent: () => import('../pages/docs/resizable/resizable-page'),
      },
      {
        path: 'scroll-area',
        title: 'Scroll Area - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/scroll-area/scroll-area-page'),
      },
      {
        path: 'search-input',
        title: 'Search Input - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/search-input/search-input-page'),
      },
      {
        path: 'select',
        title: 'Select - Semantic Components',
        loadComponent: () => import('../pages/docs/select/select-page'),
      },
      {
        path: 'separator',
        title: 'Separator - Semantic Components',
        loadComponent: () => import('../pages/docs/separator/separator-page'),
      },
      {
        path: 'sheet',
        title: 'Sheet - Semantic Components',
        loadComponent: () => import('../pages/docs/sheet/sheet-page'),
      },
      {
        path: 'sidebar',
        title: 'Sidebar - Semantic Components',
        loadComponent: () => import('../pages/docs/sidebar/sidebar-page'),
      },
      {
        path: 'signature-pad',
        title: 'Signature Pad - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/signature-pad/signature-pad-page'),
      },
      {
        path: 'skeleton',
        title: 'Skeleton - Semantic Components',
        loadComponent: () => import('../pages/docs/skeleton/skeleton-page'),
      },
      {
        path: 'slider',
        title: 'Slider - Semantic Components',
        loadComponent: () => import('../pages/docs/slider/slider-page'),
      },
      {
        path: 'range-slider',
        title: 'Range Slider - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/range-slider/range-slider-page'),
      },
      {
        path: 'sortable-list',
        title: 'Sortable List - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/sortable-list/sortable-list-page'),
      },
      {
        path: 'speed-dial',
        title: 'Speed Dial - Semantic Components',
        loadComponent: () => import('../pages/docs/speed-dial/speed-dial-page'),
      },
      {
        path: 'spinner',
        title: 'Spinner - Semantic Components',
        loadComponent: () => import('../pages/docs/spinner/spinner-page'),
      },
      {
        path: 'split-button',
        title: 'Split Button - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/split-button/split-button-page'),
      },
      {
        path: 'spotlight',
        title: 'Spotlight - Semantic Components',
        loadComponent: () => import('../pages/docs/spotlight/spotlight-page'),
      },
      {
        path: 'stat-card',
        title: 'Stat Card - Semantic Components',
        loadComponent: () => import('../pages/docs/stat-card/stat-card-page'),
      },
      {
        path: 'stepper',
        title: 'Stepper - Semantic Components',
        loadComponent: () => import('../pages/docs/stepper/stepper-page'),
      },
      {
        path: 'switch',
        title: 'Switch - Semantic Components',
        loadComponent: () => import('../pages/docs/switch/switch-page'),
      },
      {
        path: 'tabs',
        title: 'Tabs - Semantic Components',
        loadComponent: () => import('../pages/docs/tabs/tabs-page'),
      },
      {
        path: 'tag-input',
        title: 'Tag Input - Semantic Components',
        loadComponent: () => import('../pages/docs/tag-input/tag-input-page'),
      },
      {
        path: 'textarea',
        title: 'Textarea - Semantic Components',
        loadComponent: () => import('../pages/docs/textarea/textarea-page'),
      },
      {
        path: 'theme-toggle',
        title: 'Theme Toggle - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/theme-toggle-page'),
      },
      {
        path: 'time-picker',
        title: 'Time Picker - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/time-picker/time-picker-page'),
      },
      {
        path: 'timeline',
        title: 'Timeline - Semantic Components',
        loadComponent: () => import('../pages/docs/timeline/timeline-page'),
      },
      {
        path: 'timezone',
        title: 'Timezone - Semantic Components',
        loadComponent: () => import('../pages/docs/timezone/timezone-page'),
      },
      {
        path: 'toast',
        title: 'Toast - Semantic Components',
        loadComponent: () => import('../pages/docs/toast/toast-page'),
      },
      {
        path: 'toggle',
        title: 'Toggle - Semantic Components',
        loadComponent: () => import('../pages/docs/toggle/toggle-page'),
      },
      {
        path: 'toggle-group',
        title: 'Toggle Group - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/toggle-group/toggle-group-page'),
      },
      {
        path: 'toolbar',
        title: 'Toolbar - Semantic Components',
        loadComponent: () => import('../pages/docs/toolbar/toolbar-page'),
      },
      {
        path: 'tooltip',
        title: 'Tooltip - Semantic Components',
        loadComponent: () => import('../pages/docs/tooltip/tooltip-page'),
      },
      {
        path: 'tour-guide',
        title: 'Tour Guide - Semantic Components',
        loadComponent: () => import('../pages/docs/tour-guide/tour-guide-page'),
      },
      {
        path: 'transfer-list',
        title: 'Transfer List - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/transfer-list/transfer-list-page'),
      },
      {
        path: 'tree',
        title: 'Tree - Semantic Components',
        loadComponent: () => import('../pages/docs/tree/tree-page'),
      },
      {
        path: 'video-player',
        title: 'Video Player - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/video-player/video-player-page'),
      },
      {
        path: 'virtual-list',
        title: 'Virtual List - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/virtual-list/virtual-list-page'),
      },
      {
        path: 'table',
        title: 'Table - Semantic Components',
        loadComponent: () => import('../pages/docs/table/table-page'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
