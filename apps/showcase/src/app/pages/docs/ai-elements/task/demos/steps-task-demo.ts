import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiFileTextIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A finished task: a search, then a read that links to the file. */
@Component({
  selector: 'app-steps-task-demo',
  imports: [
    RouterLink,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileTextIcon,
    SiSearchIcon,
  ],
  template: `
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceTitle>Found the project files</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siSearchIcon></svg></span>
                <span scTraceTitle>Searched for app/page.tsx</span>
              </span>
              <a routerLink="." fragment="app/page.tsx">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileTextIcon></svg></span>
                  <span scTraceTitle>Read app/page.tsx</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsTaskDemo {}
