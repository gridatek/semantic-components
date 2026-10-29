import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiCircleDashedIcon,
  SiCircleXIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-status-trace-demo',
  imports: [
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleDashedIcon,
    SiCircleXIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div scTrace>
      <span scTraceLine>
        <span scTraceIcon><svg siCircleCheckIcon></svg></span>
        <span scTraceTitle>Installed dependencies</span>
      </span>
      <span scTraceLine status="error">
        <span scTraceIcon><svg siCircleXIcon></svg></span>
        <span scTraceTitle>Failed to run pnpm build</span>
      </span>
      <span scTraceLine status="running">
        <span scTraceIcon
          ><svg siLoaderCircleIcon class="motion-safe:animate-spin"></svg
        ></span>
        <span scTraceTitle>Retrying the build…</span>
      </span>
      <span scTraceLine status="pending">
        <span scTraceIcon><svg siCircleDashedIcon></svg></span>
        <span scTraceTitle>Waiting to run the tests</span>
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class StatusTraceDemo {}
