import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiFileTextIcon,
  SiSearchIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-trace-demo',
  imports: [
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileTextIcon,
    SiSearchIcon,
    SiTerminalIcon,
  ],
  template: `
    <div scTrace>
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>Searched for minimumReleaseAge</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siFileTextIcon></svg></span>
        <span scTraceTitle>Read package.json</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Ran node --version</span>
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTraceDemo {}
