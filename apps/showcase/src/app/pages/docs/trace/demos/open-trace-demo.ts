import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
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
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** Rows start closed: [expanded]="true" opens one at first; [(expanded)] makes it yours. */
@Component({
  selector: 'app-open-trace-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    ScCodeBlock,
    ScCodeBlockContent,
    SiTerminalIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col items-start gap-4">
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="node.panel"
          [expanded]="true"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Ran node --version</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #node="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scCodeBlock size="sm">
                  <pre
                    scCodeBlockContent
                    wrap
                    class="max-h-64"
                    [code]="nodeOutput"
                  ></pre>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="pnpm.panel"
          [(expanded)]="open"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Ran pnpm --version</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #pnpm="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scCodeBlock size="sm">
                  <pre
                    scCodeBlockContent
                    wrap
                    class="max-h-64"
                    [code]="pnpmOutput"
                  ></pre>
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <button scButton variant="outline" size="sm" (click)="open.set(!open())">
        {{ open() ? 'Hide' : 'Show' }} the pnpm output
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OpenTraceDemo {
  protected readonly open = signal(false);
  protected readonly nodeOutput = '$ node --version\nv24.18.0';
  protected readonly pnpmOutput = '$ pnpm --version\n10.33.4';
}
