import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** Its task at the top, its model and tools as badges, how long it ran after the title. */
@Component({
  selector: 'app-details-subagent-demo',
  imports: [
    ScBadge,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
  ],
  template: `
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siCircleCheckIcon></svg></span>
            <span scTraceTitle>Ran the research agent</span>
            <span scTraceDescription>48s</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent class="flex flex-col gap-3">
            <div class="flex flex-wrap gap-1.5">
              <span scBadge variant="secondary"
                >anthropic/claude-sonnet-4.5</span
              >
              <span scBadge variant="outline" class="font-mono"
                >runCommand</span
              >
            </div>
            <p>Find out why image optimization reruns on every deploy.</p>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle>Ran grep -rn cacheKey scripts</span>
              </span>
              <span scTraceLine>
                <span scTraceIcon><svg siCircleCheckIcon></svg></span>
                <span scTraceTitle
                  >Ran sed -n 13,15p scripts/optimize-images.ts</span
                >
              </span>
            </div>
            <p>The cache is keyed on the commit SHA.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DetailsSubagentDemo {}
