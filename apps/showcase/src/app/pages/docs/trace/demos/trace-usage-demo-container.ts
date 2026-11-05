import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { TraceUsageDemo } from './trace-usage-demo';

@Component({
  selector: 'app-trace-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    TraceUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-trace-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class TraceUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
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
  SiFilePenIcon,
  SiGitCommitHorizontalIcon,
  SiSearchIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-trace-usage-demo',
  imports: [
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
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    ScCodeBlock,
    ScCodeBlockContent,
    SiBrainIcon,
    SiSearchIcon,
    SiTerminalIcon,
    SiGitCommitHorizontalIcon,
    SiFilePenIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="thought.panel"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siBrainIcon></svg></span>
            <span scTraceTitle>Thought</span>
            <span scTraceDescription>8s</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #thought="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent class="whitespace-pre-wrap">
                I should read the deploy logs before changing the cache.
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>Searched for the cache key</span>
      </span>
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="build.panel"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>Ran pnpm build</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #build="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scCodeBlock size="sm">
                  <pre
                    scCodeBlockContent
                    wrap
                    class="max-h-64"
                    [code]="buildOutput"
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
          [panel]="commit.panel"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siGitCommitHorizontalIcon></svg></span>
            <span scTraceTitle
              >Committed a1b2c3: Key the cache on the lockfile</span
            >
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #commit="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>
                <div scTrace>
                  <span scTraceLine>
                    <span scTraceIcon><svg siFilePenIcon></svg></span>
                    <span scTraceTitle>Edited next.config.mjs</span>
                    <span scTraceDescription class="font-mono">+4 −1</span>
                  </span>
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
export class TraceUsageDemo {
  protected readonly buildOutput = '$ pnpm build\\nBuilt in 41s';
}`;
}
