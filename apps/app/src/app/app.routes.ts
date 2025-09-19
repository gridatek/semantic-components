import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tabs-demo',
    loadComponent: () => import('./docs/components/tabs/tabs-demo').then((m) => m.TabsDemo),
    title: 'Tabs Demo Page',
  },
  {
    path: 'calendar-demo',
    loadComponent: () =>
      import('./docs/components/calendar/calendar-demo').then((m) => m.CalendarDemo),
    title: 'Calendar Demo Page',
  },
  {
    path: 'calendar-default-value',
    loadComponent: () =>
      import('./docs/components/calendar/calendar-default-value').then(
        (m) => m.CalendarDefaultValue,
      ),
    title: 'Calendar Default Value Page',
  },
  {
    path: '',
    loadComponent: () => import('./layouts/stacked-layout'),
    children: [
      {
        path: '',
        loadComponent: () => import('./layouts/doc-layout'),
        children: [
          {
            path: 'landing',
            loadComponent: () => import('./landing/landing-page'),
            title: 'Landing Page',
          },
          { path: '', redirectTo: '/landing', pathMatch: 'full' },
          {
            path: 'docs',
            children: [
              {
                path: 'getting-started/introduction',
                loadComponent: () =>
                  import('./docs/getting-started/introduction/introduction-page'),
                title: 'Introduction Page',
              },
              {
                path: 'getting-started/installation',
                loadComponent: () =>
                  import('./docs/getting-started/installation/installation-page'),
                title: 'Installation Page',
              },
              {
                path: 'getting-started/typography',
                loadComponent: () => import('./docs/getting-started/typography/typography-page'),
                title: 'Typography Page',
              },
              {
                path: 'getting-started/typography-article',
                loadComponent: () => import('./docs/getting-started/typography/typography-article'),
                title: 'Typography Article Page',
              },
              {
                path: 'getting-started/typography-comparison',
                loadComponent: () =>
                  import('./docs/getting-started/typography-comparison/typography-comparison-page'),
                title: 'Typography Comparison Page',
              },
              {
                path: 'components/accordion',
                loadComponent: () => import('./docs/components/accordion/accordion-page'),
                title: 'Accordion Page',
              },
              {
                path: 'components/alert',
                loadComponent: () => import('./docs/components/alert/alert-page'),
                title: 'Alert Page',
              },
              {
                path: 'components/alert-dialog',
                loadComponent: () => import('./docs/components/alert-dialog/alert-dialog-page'),
                title: 'Alert Dialog Page',
              },
              {
                path: 'components/aspect-ratio',
                loadComponent: () => import('./docs/components/aspect-ratio/aspect-ratio-page'),
                title: 'Aspect Ratio Page',
              },
              {
                path: 'components/avatar',
                loadComponent: () => import('./docs/components/avatar/avatar-page'),
                title: 'Avatar Page',
              },
              {
                path: 'components/button',
                loadComponent: () => import('./docs/components/button/button-page'),
                title: 'Button Page',
              },
              {
                path: 'components/badge',
                loadComponent: () => import('./docs/components/badge/badge-page'),
                title: 'Badge Page',
              },
              {
                path: 'components/breadcrumb',
                loadComponent: () => import('./docs/components/breadcrumb/breadcrumb-page'),
                title: 'Breadcrumb Page',
              },
              {
                path: 'components/calendar',
                loadComponent: () => import('./docs/components/calendar/calendar-page'),
                title: 'Calendar Page',
              },
              {
                path: 'components/card',
                loadComponent: () => import('./docs/components/card/card-page'),
                title: 'Card Page',
              },
              {
                path: 'components/carousel',
                loadComponent: () => import('./docs/components/carousel/carousel-page'),
                title: 'Carousel Page',
              },
              {
                path: 'components/clock-picker',
                loadComponent: () => import('./docs/components/clock-picker/clock-picker-page'),
                title: 'Clock Picker Page',
              },
              {
                path: 'components/color-picker',
                loadComponent: () => import('./docs/components/color-picker/color-picker-page'),
                title: 'Color Picker Page',
              },
              {
                path: 'components/command',
                loadComponent: () => import('./docs/components/command/command-page'),
                title: 'Command Page',
              },
              {
                path: 'components/checkbox',
                loadComponent: () => import('./docs/components/checkbox/checkbox-page'),
                title: 'Checkbox Page',
              },
              {
                path: 'components/checkbox-group',
                loadComponent: () => import('./docs/components/checkbox-group/checkbox-group-page'),
                title: 'Checkbox Group Page',
              },
              {
                path: 'components/circular-progress',
                loadComponent: () =>
                  import('./docs/components/circular-progress/circular-progress-page'),
                title: 'Circular Progress Page',
              },
              {
                path: 'components/collapsible',
                loadComponent: () => import('./docs/components/collapsible/collapsible-page'),
                title: 'Collapsible Page',
              },
              {
                path: 'components/combobox',
                loadComponent: () => import('./docs/components/combobox/combobox-page'),
                title: 'Combobox Page',
              },
              {
                path: 'components/context-menu',
                loadComponent: () => import('./docs/components/context-menu/context-menu-page'),
                title: 'Context Menu Page',
              },
              {
                path: 'components/date-picker',
                loadComponent: () => import('./docs/components/date-picker/date-picker-page'),
                title: 'Date Picker Page',
              },
              {
                path: 'components/date-time-picker',
                loadComponent: () =>
                  import('./docs/components/date-time-picker/date-time-picker-page'),
                title: 'Date Time Picker Page',
              },
              {
                path: 'components/dual-range-slider',
                loadComponent: () =>
                  import('./docs/components/dual-range-slider/dual-range-slider-page'),
                title: 'Dual Range Slider Page',
              },
              {
                path: 'components/dialog',
                loadComponent: () => import('./docs/components/dialog/dialog-page'),
                title: 'Dialog Page',
              },
              {
                path: 'components/editor',
                loadComponent: () => import('./docs/components/editor/editor-page'),
                title: 'Editor Page',
              },
              {
                path: 'components/field',
                loadComponent: () => import('./docs/components/field/field-page'),
                title: 'Field Page',
              },
              {
                path: 'components/file-upload',
                loadComponent: () => import('./docs/components/file-upload/file-upload-page'),
                title: 'File Upload Page',
              },
              {
                path: 'components/flex-layout',
                loadComponent: () => import('./docs/components/flex-layout/flex-layout-page'),
                title: 'Flex Layout Page',
              },
              {
                path: 'components/grid-layout',
                loadComponent: () => import('./docs/components/grid-layout/grid-layout-page'),
                title: 'Grid Layout Page',
              },
              {
                path: 'components/masonry-layout',
                loadComponent: () => import('./docs/components/masonry-layout/masonry-layout-page'),
                title: 'Masonry Layout Page',
              },
              {
                path: 'components/gallery-layout',
                loadComponent: () => import('./docs/components/gallery-layout/gallery-layout-page'),
                title: 'Gallery Layout Page',
              },
              {
                path: 'components/hover-card',
                loadComponent: () => import('./docs/components/hover-card/hover-card-page'),
                title: 'Hover Card Page',
              },
              {
                path: 'components/input',
                loadComponent: () => import('./docs/components/input/input-page'),
                title: 'Input Page',
              },
              {
                path: 'components/input-number',
                loadComponent: () => import('./docs/components/input-number/input-number-page'),
                title: 'Input Number Page',
              },
              {
                path: 'components/input-otp',
                loadComponent: () => import('./docs/components/input-otp/input-otp-page'),
                title: 'Input OTP Page',
              },
              {
                path: 'components/input-phone',
                loadComponent: () => import('./docs/components/input-phone/input-phone-page'),
                title: 'Input Phone Page',
              },
              {
                path: 'components/input-password',
                loadComponent: () => import('./docs/components/input-password/input-password-page'),
                title: 'Input Password Page',
              },
              {
                path: 'components/input-group',
                loadComponent: () => import('./docs/components/input-group/input-group-page'),
                title: 'Input Group Page',
              },
              {
                path: 'components/label',
                loadComponent: () => import('./docs/components/label/label-page'),
                title: 'Label Page',
              },
              {
                path: 'components/menu',
                loadComponent: () => import('./docs/components/menu/menu-page'),
                title: 'Menu Page',
              },
              {
                path: 'components/menu-bar',
                loadComponent: () => import('./docs/components/menu-bar/menu-bar-page'),
                title: 'Menu Bar Page',
              },
              {
                path: 'components/pagination',
                loadComponent: () => import('./docs/components/pagination/pagination-page'),
                title: 'Pagination Page',
              },
              {
                path: 'components/popover',
                loadComponent: () => import('./docs/components/popover/popover-page'),
                title: 'Popover Page',
              },
              {
                path: 'components/progress',
                loadComponent: () => import('./docs/components/progress/progress-page'),
                title: 'Progress Page',
              },
              {
                path: 'components/radio-group',
                loadComponent: () => import('./docs/components/radio-group/radio-group-page'),
                title: 'Radio Group Page',
              },
              {
                path: 'components/re-captcha',
                loadComponent: () => import('./docs/components/re-captcha/re-captcha-page'),
                title: 'reCAPTCHA Page',
              },
              {
                path: 'components/select',
                loadComponent: () => import('./docs/components/select/select-page'),
                title: 'Select Page',
              },
              {
                path: 'components/separator',
                loadComponent: () => import('./docs/components/separator/separator-page'),
                title: 'Separator Page',
              },
              {
                path: 'components/scrub-area',
                loadComponent: () => import('./docs/components/scrub-area/scrub-area-page'),
                title: 'Scrub Area Page',
              },
              {
                path: 'components/sheet',
                loadComponent: () => import('./docs/components/sheet/sheet-page'),
                title: 'Sheet Page',
              },
              {
                path: 'components/skeleton',
                loadComponent: () => import('./docs/components/skeleton/skeleton-page'),
                title: 'Skeleton Page',
              },
              {
                path: 'components/slider',
                loadComponent: () => import('./docs/components/slider/slider-page'),
                title: 'Slider Page',
              },
              {
                path: 'components/stepper',
                loadComponent: () => import('./docs/components/stepper/stepper-page'),
                title: 'Stepper Page',
              },
              {
                path: 'components/switch',
                loadComponent: () => import('./docs/components/switch/switch-page'),
                title: 'Switch Page',
              },
              {
                path: 'components/table',
                loadComponent: () => import('./docs/components/table/table-page'),
                title: 'Table Page',
              },
              {
                path: 'components/tabs',
                loadComponent: () => import('./docs/components/tabs/tabs-page'),
                title: 'Tabs Page',
              },
              {
                path: 'components/textarea',
                loadComponent: () => import('./docs/components/textarea/textarea-page'),
                title: 'Textarea Page',
              },
              {
                path: 'components/time-picker',
                loadComponent: () => import('./docs/components/time-picker/time-picker-page'),
                title: 'Time Picker Page',
              },
              {
                path: 'components/toast',
                loadComponent: () => import('./docs/components/toast/toast-page'),
                title: 'Toast Page',
              },
              {
                path: 'components/toggle',
                loadComponent: () => import('./docs/components/toggle/toggle-page'),
                title: 'Toggle Page',
              },
              {
                path: 'components/toggle-group',
                loadComponent: () => import('./docs/components/toggle-group/toggle-group-page'),
                title: 'Toggle Group Page',
              },
              {
                path: 'components/tooltip',
                loadComponent: () => import('./docs/components/tooltip/tooltip-page'),
                title: 'Tooltip Page',
              },
              {
                path: 'components/touch-area',
                loadComponent: () => import('./docs/components/touch-area/touch-area-page'),
                title: 'Touch Area Page',
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' },
];
