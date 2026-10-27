import { Component, ViewEncapsulation } from '@angular/core';

/** The logo: "SC" on a rounded tile, in the theme's primary colors. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[app-logo]',
  template: `
    <svg:rect class="fill-primary" width="160" height="160" rx="36" />
    <svg:path
      class="stroke-primary-foreground"
      transform="translate(26.6 32) scale(0.6)"
      fill="none"
      stroke-width="18"
      d="M69.5 50V38a32.25 33 0 0 0-64.5 0c0 20 15 30 32.5 42S69.5 102 69.5 122a32.25 33 0 0 1-64.5 0v-12M173 50V38a32.25 33 0 0 0-64.5 0v84a32.25 33 0 0 0 64.5 0v-12"
    />
  `,
  host: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 160 160',
    width: '24',
    height: '24',
    'aria-hidden': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Logo {}
