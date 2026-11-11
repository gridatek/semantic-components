import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TurnTraceDemo } from './turn-trace-demo';

@Component({
  selector: 'app-turn-trace-demo-container',
  imports: [DemoContainer, TurnTraceDemo],
  template: `
    <app-demo-container
      title="Whole turn"
      demoUrl="/demos/trace/turn-trace-demo"
      [code]="code"
    >
      <app-turn-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TurnTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleContent,
  ScTraceCollapsibleIcon,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiBrainIcon,
  SiChevronRightIcon,
  SiFileTextIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** Three levels: the turn, a summary, the rows; text between steps sits between two traces. */
@Component({
  selector: 'app-turn-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    ScCodeBlock,
    ScCodeBlockContent,
    SiBrainIcon,
    SiTerminalIcon,
    SiFileTextIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scCollapsible [open]="true" scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceTitle>Worked for 2m 4s, 1 command failed</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsibleContent class="flex flex-col gap-2">
            <div scTrace>
              <div scCollapsible scTraceCollapsible>
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span scTraceLine>
                    <span scTraceIcon><svg siBrainIcon></svg></span>
                    <span scTraceTitle>Thought</span>
                    <span scTraceDescription>12s</span>
                  </span>
                  <span scTraceCollapsibleIcon
                    ><svg siChevronRightIcon></svg
                  ></span>
                </button>
                <div scCollapsiblePanel>
                  <div scTraceCollapsibleContent class="whitespace-pre-wrap">
                    I should check which package managers are installed before I
                    scaffold anything.
                  </div>
                </div>
              </div>
              <div scCollapsible [open]="true" scTraceCollapsible>
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span scTraceLine status="error">
                    <span scTraceIcon><svg siTerminalIcon></svg></span>
                    <span scTraceTitle>Ran 2 commands, 1 failed</span>
                  </span>
                  <span scTraceCollapsibleIcon
                    ><svg siChevronRightIcon></svg
                  ></span>
                </button>
                <div scCollapsiblePanel>
                  <div scTraceCollapsibleContent>
                    <div scTrace>
                      <span scTraceLine>
                        <span scTraceIcon><svg siTerminalIcon></svg></span>
                        <span scTraceTitle>Ran node --version</span>
                      </span>
                      <div scCollapsible scTraceCollapsible>
                        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                          <span scTraceLine status="error">
                            <span scTraceIcon><svg siTerminalIcon></svg></span>
                            <span scTraceTitle
                              >Failed to run pnpm --version</span
                            >
                          </span>
                          <span scTraceCollapsibleIcon
                            ><svg siChevronRightIcon></svg
                          ></span>
                        </button>
                        <div scCollapsiblePanel>
                          <div scTraceCollapsibleContent>
                            <div scCodeBlock size="sm" variant="destructive">
                              <pre
                                scCodeBlockContent
                                wrap
                                class="max-h-64"
                                [code]="'command not found: pnpm'"
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
            <p>Node is installed and pnpm is not. Reading the docs config.</p>
            <div scTrace>
              <a href="#whole-turn">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileTextIcon></svg></span>
                  <span scTraceTitle
                    >Read apps/showcase/src/app/app.config.ts</span
                  >
                  <span scTraceIcon><svg siChevronRightIcon></svg></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TurnTraceDemo {}`;
}
