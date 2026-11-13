import { Component, ViewEncapsulation } from '@angular/core';
import {
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
import {
  SiCircleCheckIcon,
  SiCircleIcon,
  SiRouteIcon,
} from '@semantic-icons/lucide-icons';

/** A description above the steps, inside the plan. */
@Component({
  selector: 'app-details-plan-demo',
  imports: [
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
    SiCircleIcon,
    SiRouteIcon,
  ],
  template: `
    <div scTrace class="max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siRouteIcon></svg></span>
            <span scTraceTitle>Plan: add dark mode</span>
            <span scTraceDescription>1 of {{ steps.length }} done</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent class="flex flex-col gap-3">
            <p>
              Store the theme in a cookie so the server renders the right one
              and the page does not flash on load.
            </p>
            <div scTrace>
              @for (step of steps; track step; let first = $first) {
                <span scTraceLine [status]="first ? undefined : 'pending'">
                  <span scTraceIcon>
                    @if (first) {
                      <svg siCircleCheckIcon></svg>
                    } @else {
                      <svg siCircleIcon></svg>
                    }
                  </span>
                  <span scTraceTitle>{{ step }}</span>
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPlanDemo {
  protected readonly steps = [
    'Add a dark variant to the theme tokens',
    'Read the theme from a cookie on the server',
    'Add a toggle to the settings page',
    'Check contrast on the charts',
  ];
}
