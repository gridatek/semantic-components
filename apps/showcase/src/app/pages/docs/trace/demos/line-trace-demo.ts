import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A step with nothing more to show: a line on its own, read as text. */
@Component({
  selector: 'app-line-trace-demo',
  imports: [ScTraceIcon, ScTraceLine, ScTraceTitle, SiSearchIcon],
  template: `
    <span scTraceLine>
      <span scTraceIcon><svg siSearchIcon></svg></span>
      <span scTraceTitle>Searched for minimumReleaseAge</span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LineTraceDemo {}
