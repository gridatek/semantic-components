import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'svg[app-logo]',
  template: `
    <svg:rect x="2" y="2" width="20" height="20" rx="4" />
    <svg:path
      d="M10 8C9.5 7.4 8.7 7 7.5 7C6 7 5 8 5 9.5C5 11 6.5 11.5 8 12C9.5 12.5 11 13 11 14.5C11 16 9.5 17 8 17C6.8 17 6 16.6 5.5 16"
    />
    <svg:path
      d="M19 8C18.3 7.3 17.3 7 16 7C14 7 13 8.5 13 12C13 15.5 14 17 16 17C17.3 17 18.3 16.7 19 16"
    />
  `,
  host: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: '24',
    height: '24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {}
