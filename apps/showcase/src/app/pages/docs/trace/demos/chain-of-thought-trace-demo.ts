import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleIcon,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiChevronRightIcon,
  SiFileTextIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';

/** A collapsible row of steps; its status and title follow theirs. */
@Component({
  selector: 'app-chain-of-thought-trace-demo',
  imports: [
    ScBadge,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    ScCodeBlock,
    ScCodeBlockContent,
    SiSearchIcon,
    SiFileTextIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scCollapsible [open]="true" scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="running">
            <span scTraceTitle>Looking into the slow deploy</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <div scCollapsible scTraceCollapsible>
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span scTraceLine>
                    <span scTraceIcon><svg siSearchIcon></svg></span>
                    <span scTraceTitle
                      >Searched for the checkout build log</span
                    >
                  </span>
                  <span scTraceCollapsibleIcon
                    ><svg siChevronRightIcon></svg
                  ></span>
                </button>
                <div scCollapsiblePanel>
                  <div
                    scTraceCollapsiblePanelContent
                    class="flex flex-wrap gap-1.5"
                  >
                    <span scBadge variant="secondary">vercel.com</span>
                    <span scBadge variant="secondary">github.com</span>
                  </div>
                </div>
              </div>
              <a href="#chain-of-thought">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileTextIcon></svg></span>
                  <span scTraceTitle>Read the last twelve deploys</span>
                  <span scTraceIcon><svg siChevronRightIcon></svg></span>
                </span>
              </a>
              <div scCollapsible scTraceCollapsible>
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span scTraceLine status="running">
                    <span scTraceIcon><svg siSearchIcon></svg></span>
                    <span scTraceTitle>Searching for the cache key</span>
                  </span>
                  <span scTraceCollapsibleIcon
                    ><svg siChevronRightIcon></svg
                  ></span>
                </button>
                <div scCollapsiblePanel>
                  <div scTraceCollapsiblePanelContent>
                    <div scCodeBlock size="sm">
                      <pre
                        scCodeBlockContent
                        wrap
                        class="max-h-64"
                        [code]="'cache key image optimization'"
                      ></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChainOfThoughtTraceDemo {}
