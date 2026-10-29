import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiArrowUpRightIcon, SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-link-trace-demo',
  imports: [
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiArrowUpRightIcon,
    SiGlobeIcon,
  ],
  template: `
    <div scTrace>
      <a href="https://angular.dev" target="_blank" rel="noopener">
        <span scTraceLine>
          <span scTraceIcon><svg siGlobeIcon></svg></span>
          <span scTraceTitle>Read angular.dev</span>
          <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
          <span class="sr-only">(opens in a new tab)</span>
        </span>
      </a>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkTraceDemo {}
