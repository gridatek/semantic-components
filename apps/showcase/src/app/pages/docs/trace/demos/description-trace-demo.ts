import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTrace,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiFileTextIcon,
  SiGlobeIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-description-trace-demo',
  imports: [
    ScTrace,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileTextIcon,
    SiGlobeIcon,
    SiSearchIcon,
  ],
  template: `
    <div scTrace>
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>Searched the codebase</span>
        <span scTraceDescription>12 results</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siFileTextIcon></svg></span>
        <span scTraceTitle>Read</span>
        <span scTraceDescription>src/app/app.config.ts</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siGlobeIcon></svg></span>
        <span scTraceTitle>Fetched the changelog</span>
        <span scTraceDescription>1.2 s</span>
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionTraceDemo {}
