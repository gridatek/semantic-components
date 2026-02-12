import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const componentsRoutes: Route[] = [
  {
    path: 'docs/components',
    component: DocsLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/docs/components/components-page'),
      },
      {
        path: 'accordion',
        loadComponent: () => import('../pages/docs/accordion/accordion-page'),
      },
      {
        path: 'alert',
        loadComponent: () => import('../pages/docs/alert/alert-page'),
      },
      {
        path: 'alert-dialog',
        loadComponent: () =>
          import('../pages/docs/alert-dialog/alert-dialog-page'),
      },
      {
        path: 'animated-counter',
        loadComponent: () =>
          import('../pages/docs/animated-counter/animated-counter-page'),
      },
      {
        path: 'aspect-ratio',
        loadComponent: () =>
          import('../pages/docs/aspect-ratio/aspect-ratio-page'),
      },
      {
        path: 'audio-player',
        loadComponent: () =>
          import('../pages/docs/audio-player/audio-player-page'),
      },
      {
        path: 'avatar',
        loadComponent: () => import('../pages/docs/avatar/avatar-page'),
      },
      {
        path: 'avatar-group',
        loadComponent: () =>
          import('../pages/docs/avatar-group/avatar-group-page'),
      },
      {
        path: 'badge',
        loadComponent: () => import('../pages/docs/badge/badge-page'),
      },
      {
        path: 'barcode-scanner',
        loadComponent: () =>
          import('../pages/docs/barcode-scanner/barcode-scanner-page'),
      },
      {
        path: 'breadcrumb',
        loadComponent: () => import('../pages/docs/breadcrumb/breadcrumb-page'),
      },
      {
        path: 'button',
        loadComponent: () => import('../pages/docs/button/button-page'),
      },
      {
        path: 'button-group',
        loadComponent: () =>
          import('../pages/docs/button-group/button-group-page'),
      },
      {
        path: 'calendar',
        loadComponent: () => import('../pages/docs/calendar/calendar-page'),
      },
      {
        path: 'card',
        loadComponent: () => import('../pages/docs/card/card-page'),
      },
      {
        path: 'carousel',
        loadComponent: () => import('../pages/docs/carousel/carousel-page'),
      },
      {
        path: 'chart',
        loadComponent: () => import('../pages/docs/chart/chart-page'),
      },
      {
        path: 'checkbox',
        loadComponent: () => import('../pages/docs/checkbox/checkbox-page'),
      },
      {
        path: 'native-checkbox',
        loadComponent: () =>
          import('../pages/docs/native-checkbox/native-checkbox-page'),
      },
      {
        path: 'code-editor',
        loadComponent: () =>
          import('../pages/docs/code-editor/code-editor-page'),
      },
      {
        path: 'code-viewer',
        loadComponent: () =>
          import('../pages/docs/code-viewer/code-viewer-page'),
      },
      {
        path: 'collapsible',
        loadComponent: () =>
          import('../pages/docs/collapsible/collapsible-page'),
      },
      {
        path: 'color-picker',
        loadComponent: () =>
          import('../pages/docs/color-picker/color-picker-page'),
      },
      {
        path: 'combobox',
        loadComponent: () => import('../pages/docs/combobox/combobox-page'),
      },
      {
        path: 'command',
        loadComponent: () => import('../pages/docs/command/command-page'),
      },
      {
        path: 'confetti',
        loadComponent: () => import('../pages/docs/confetti/confetti-page'),
      },
      {
        path: 'context-menu',
        loadComponent: () =>
          import('../pages/docs/context-menu/context-menu-page'),
      },
      {
        path: 'copy-button',
        loadComponent: () =>
          import('../pages/docs/copy-button/copy-button-page'),
      },
      {
        path: 'countdown',
        loadComponent: () => import('../pages/docs/countdown/countdown-page'),
      },
      {
        path: 'data-table',
        loadComponent: () => import('../pages/docs/data-table/data-table-page'),
      },
      {
        path: 'date-picker',
        loadComponent: () =>
          import('../pages/docs/date-picker/date-picker-page'),
      },
      {
        path: 'date-range-picker',
        loadComponent: () =>
          import('../pages/docs/date-range-picker/date-range-picker-page'),
      },
      {
        path: 'dialog',
        loadComponent: () => import('../pages/docs/dialog/dialog-page'),
      },
      {
        path: 'diff-viewer',
        loadComponent: () =>
          import('../pages/docs/diff-viewer/diff-viewer-page'),
      },
      {
        path: 'dock',
        loadComponent: () => import('../pages/docs/dock/dock-page'),
      },
      {
        path: 'drawer',
        loadComponent: () => import('../pages/docs/drawer/drawer-page'),
      },
      {
        path: 'emoji-picker',
        loadComponent: () =>
          import('../pages/docs/emoji-picker/emoji-picker-page'),
      },
      {
        path: 'editor',
        loadComponent: () => import('../pages/docs/editor/editor-page'),
      },
      {
        path: 'empty',
        loadComponent: () => import('../pages/docs/empty/empty-page'),
      },
      {
        path: 'field',
        loadComponent: () => import('../pages/docs/field/field-page'),
      },
      {
        path: 'file-upload',
        loadComponent: () =>
          import('../pages/docs/file-upload/file-upload-page'),
      },
      {
        path: 'hover-card',
        loadComponent: () => import('../pages/docs/hover-card/hover-card-page'),
      },
      {
        path: 'image-annotator',
        loadComponent: () =>
          import('../pages/docs/image-annotator/image-annotator-page'),
      },
      {
        path: 'image-compare',
        loadComponent: () =>
          import('../pages/docs/image-compare/image-compare-page'),
      },
      {
        path: 'image-cropper',
        loadComponent: () =>
          import('../pages/docs/image-cropper/image-cropper-page'),
      },
      {
        path: 'infinite-scroll',
        loadComponent: () =>
          import('../pages/docs/infinite-scroll/infinite-scroll-page'),
      },
      {
        path: 'input',
        loadComponent: () => import('../pages/docs/input/input-page'),
      },
      {
        path: 'input-group',
        loadComponent: () =>
          import('../pages/docs/input-group/input-group-page'),
      },
      {
        path: 'opt-field',
        loadComponent: () => import('../pages/docs/opt-field/opt-field-page'),
      },
      {
        path: 'kanban-board',
        loadComponent: () =>
          import('../pages/docs/kanban-board/kanban-board-page'),
      },
      {
        path: 'kbd',
        loadComponent: () => import('../pages/docs/kbd/kbd-page'),
      },
      {
        path: 'label',
        loadComponent: () => import('../pages/docs/label/label-page'),
      },
      {
        path: 'language-switcher',
        loadComponent: () =>
          import('../pages/docs/language-switcher/language-switcher-page'),
      },
      {
        path: 'lightbox',
        loadComponent: () => import('../pages/docs/lightbox/lightbox-page'),
      },
      {
        path: 'marquee',
        loadComponent: () => import('../pages/docs/marquee/marquee-page'),
      },
      {
        path: 'masonry-grid',
        loadComponent: () =>
          import('../pages/docs/masonry-grid/masonry-grid-page'),
      },
      {
        path: 'mention-input',
        loadComponent: () =>
          import('../pages/docs/mention-input/mention-input-page'),
      },
      {
        path: 'menu',
        loadComponent: () => import('../pages/docs/menu/menu-page'),
      },
      {
        path: 'multi-select',
        loadComponent: () =>
          import('../pages/docs/multi-select/multi-select-page'),
      },
      {
        path: 'navigation-menu',
        loadComponent: () =>
          import('../pages/docs/navigation-menu/navigation-menu-page'),
      },
      {
        path: 'notification-center',
        loadComponent: () =>
          import('../pages/docs/notification-center/notification-center-page'),
      },
      {
        path: 'number-field',
        loadComponent: () =>
          import('../pages/docs/number-field/number-field-page'),
      },
      {
        path: 'org-chart',
        loadComponent: () => import('../pages/docs/org-chart/org-chart-page'),
      },
      {
        path: 'pagination',
        loadComponent: () => import('../pages/docs/pagination/pagination-page'),
      },
      {
        path: 'password-field',
        loadComponent: () =>
          import('../pages/docs/password-field/password-field-page'),
      },
      {
        path: 'pdf-viewer',
        loadComponent: () => import('../pages/docs/pdf-viewer/pdf-viewer-page'),
      },
      {
        path: 'phone-input',
        loadComponent: () =>
          import('../pages/docs/phone-input/phone-input-page'),
      },
      {
        path: 'popover',
        loadComponent: () => import('../pages/docs/popover/popover-page'),
      },
      {
        path: 'progress',
        loadComponent: () => import('../pages/docs/progress/progress-page'),
      },
      {
        path: 'qr-code',
        loadComponent: () => import('../pages/docs/qr-code/qr-code-page'),
      },
      {
        path: 'radio-group',
        loadComponent: () =>
          import('../pages/docs/radio-group/radio-group-page'),
      },
      {
        path: 'rating-field',
        loadComponent: () =>
          import('../pages/docs/rating-field/rating-field-page'),
      },
      {
        path: 'resizable',
        loadComponent: () => import('../pages/docs/resizable/resizable-page'),
      },
      {
        path: 'scroll-area',
        loadComponent: () =>
          import('../pages/docs/scroll-area/scroll-area-page'),
      },
      {
        path: 'search-input',
        loadComponent: () =>
          import('../pages/docs/search-input/search-input-page'),
      },
      {
        path: 'select',
        loadComponent: () => import('../pages/docs/select/select-page'),
      },
      {
        path: 'separator',
        loadComponent: () => import('../pages/docs/separator/separator-page'),
      },
      {
        path: 'sheet',
        loadComponent: () => import('../pages/docs/sheet/sheet-page'),
      },
      {
        path: 'sidebar',
        loadComponent: () => import('../pages/docs/sidebar/sidebar-page'),
      },
      {
        path: 'signature-pad',
        loadComponent: () =>
          import('../pages/docs/signature-pad/signature-pad-page'),
      },
      {
        path: 'skeleton',
        loadComponent: () => import('../pages/docs/skeleton/skeleton-page'),
      },
      {
        path: 'slider',
        loadComponent: () => import('../pages/docs/slider/slider-page'),
      },
      {
        path: 'range-slider',
        loadComponent: () =>
          import('../pages/docs/range-slider/range-slider-page'),
      },
      {
        path: 'sortable-list',
        loadComponent: () =>
          import('../pages/docs/sortable-list/sortable-list-page'),
      },
      {
        path: 'speed-dial',
        loadComponent: () => import('../pages/docs/speed-dial/speed-dial-page'),
      },
      {
        path: 'spinner',
        loadComponent: () => import('../pages/docs/spinner/spinner-page'),
      },
      {
        path: 'split-button',
        loadComponent: () =>
          import('../pages/docs/split-button/split-button-page'),
      },
      {
        path: 'spotlight',
        loadComponent: () => import('../pages/docs/spotlight/spotlight-page'),
      },
      {
        path: 'stat-card',
        loadComponent: () => import('../pages/docs/stat-card/stat-card-page'),
      },
      {
        path: 'stepper',
        loadComponent: () => import('../pages/docs/stepper/stepper-page'),
      },
      {
        path: 'switch',
        loadComponent: () => import('../pages/docs/switch/switch-page'),
      },
      {
        path: 'tabs',
        loadComponent: () => import('../pages/docs/tabs/tabs-page'),
      },
      {
        path: 'tag-input',
        loadComponent: () => import('../pages/docs/tag-input/tag-input-page'),
      },
      {
        path: 'textarea',
        loadComponent: () => import('../pages/docs/textarea/textarea-page'),
      },
      {
        path: 'theme-toggle',
        loadComponent: () =>
          import('../pages/docs/theme-toggle/theme-toggle-page'),
      },
      {
        path: 'time-picker',
        loadComponent: () =>
          import('../pages/docs/time-picker/time-picker-page'),
      },
      {
        path: 'timeline',
        loadComponent: () => import('../pages/docs/timeline/timeline-page'),
      },
      {
        path: 'timezone',
        loadComponent: () => import('../pages/docs/timezone/timezone-page'),
      },
      {
        path: 'toast',
        loadComponent: () => import('../pages/docs/toast/toast-page'),
      },
      {
        path: 'toggle',
        loadComponent: () => import('../pages/docs/toggle/toggle-page'),
      },
      {
        path: 'toggle-group',
        loadComponent: () =>
          import('../pages/docs/toggle-group/toggle-group-page'),
      },
      {
        path: 'toolbar',
        loadComponent: () => import('../pages/docs/toolbar/toolbar-page'),
      },
      {
        path: 'tooltip',
        loadComponent: () => import('../pages/docs/tooltip/tooltip-page'),
      },
      {
        path: 'tour-guide',
        loadComponent: () => import('../pages/docs/tour-guide/tour-guide-page'),
      },
      {
        path: 'transfer-list',
        loadComponent: () =>
          import('../pages/docs/transfer-list/transfer-list-page'),
      },
      {
        path: 'tree',
        loadComponent: () => import('../pages/docs/tree/tree-page'),
      },
      {
        path: 'video-player',
        loadComponent: () =>
          import('../pages/docs/video-player/video-player-page'),
      },
      {
        path: 'virtual-list',
        loadComponent: () =>
          import('../pages/docs/virtual-list/virtual-list-page'),
      },
      {
        path: 'table',
        loadComponent: () => import('../pages/docs/table/table-page'),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
