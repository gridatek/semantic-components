import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChainOfThoughtTraceDemo } from './chain-of-thought-trace-demo';

@Component({
  selector: 'app-chain-of-thought-trace-demo-container',
  imports: [DemoContainer, ChainOfThoughtTraceDemo],
  template: `
    <app-demo-container
      title="Chain of thought"
      demoUrl="/demos/trace/chain-of-thought-trace-demo"
      [code]="code"
    >
      <app-chain-of-thought-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChainOfThoughtTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleContent,
  ScTraceCollapsibleIcon,
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
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
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
  template: \`
    <div class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="slow.panel"
          [expanded]="true"
        >
          <span scTraceLine status="running">
            <span scTraceTitle>Looking into the slow deploy</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #slow="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scTrace>
                  <div scCollapsible scTraceCollapsible>
                    <button
                      scCollapsibleTrigger
                      scTraceCollapsibleTrigger
                      [panel]="log.panel"
                    >
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
                    <div scCollapsiblePanel #log="scCollapsiblePanel">
                      <ng-template scCollapsibleContent>
                        <div scCollapsibleBody>
                          <div
                            scTraceCollapsibleContent
                            class="flex flex-wrap gap-1.5"
                          >
                            <span scBadge variant="secondary">vercel.com</span>
                            <span scBadge variant="secondary">github.com</span>
                          </div>
                        </div>
                      </ng-template>
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
                    <button
                      scCollapsibleTrigger
                      scTraceCollapsibleTrigger
                      [panel]="key.panel"
                    >
                      <span scTraceLine status="running">
                        <span scTraceIcon><svg siSearchIcon></svg></span>
                        <span scTraceTitle>Searching for the cache key</span>
                      </span>
                      <span scTraceCollapsibleIcon
                        ><svg siChevronRightIcon></svg
                      ></span>
                    </button>
                    <div scCollapsiblePanel #key="scCollapsiblePanel">
                      <ng-template scCollapsibleContent>
                        <div scCollapsibleBody>
                          <div scTraceCollapsibleContent>
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
                      </ng-template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChainOfThoughtTraceDemo {}`;
}
