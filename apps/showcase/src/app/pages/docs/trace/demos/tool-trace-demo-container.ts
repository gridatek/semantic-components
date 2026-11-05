import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ToolTraceDemo } from './tool-trace-demo';

@Component({
  selector: 'app-tool-trace-demo-container',
  imports: [DemoContainer, ToolTraceDemo],
  template: `
    <app-demo-container
      title="Tool"
      demoUrl="/demos/trace/tool-trace-demo"
      [code]="code"
    >
      <app-tool-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ToolTraceDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
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
  SiRotateCcwIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** A tool call of the demo: running, then done (its output, or its error). */
interface ScDemoToolCall {
  command: string;
  output: string;
  failed?: boolean;
  state: 'running' | 'done';
}

/** Tool calls as they run (replayed here): Running, then Ran with the output, or Failed to run with the error. */
@Component({
  selector: 'app-tool-trace-demo',
  imports: [
    ScButton,
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
    SiTerminalIcon,
    SiChevronRightIcon,
    SiRotateCcwIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col items-start gap-4">
      <button scButton variant="outline" size="sm" (click)="replay()">
        <svg siRotateCcwIcon></svg>
        Replay
      </button>
      <div scTrace class="w-full" aria-live="polite">
        @for (call of calls(); track $index) {
          @if (call.state === 'running') {
            <span scTraceLine status="running">
              <span scTraceIcon><svg siTerminalIcon></svg></span>
              <span scTraceTitle>Running {{ call.command }}</span>
            </span>
          } @else {
            <div scCollapsible scTraceCollapsible>
              <button
                scCollapsibleTrigger
                scTraceCollapsibleTrigger
                [panel]="output.panel"
              >
                <span scTraceLine [status]="call.failed ? 'error' : undefined">
                  <span scTraceIcon><svg siTerminalIcon></svg></span>
                  <span scTraceTitle
                    >{{ call.failed ? 'Failed to run' : 'Ran' }}
                    {{ call.command }}</span
                  >
                </span>
                <span scTraceCollapsibleIcon
                  ><svg siChevronRightIcon></svg
                ></span>
              </button>
              <div scCollapsiblePanel #output="scCollapsiblePanel">
                <ng-template scCollapsibleContent>
                  <div scCollapsibleBody>
                    <div scTraceCollapsibleContent>
                      <div
                        scCodeBlock
                        size="sm"
                        [variant]="call.failed ? 'destructive' : 'default'"
                      >
                        <pre
                          scCodeBlockContent
                          wrap
                          class="max-h-64"
                          [code]="call.output"
                        ></pre>
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          }
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToolTraceDemo {
  protected readonly calls = signal<readonly ScDemoToolCall[]>([]);
  private readonly script: readonly Omit<ScDemoToolCall, 'state'>[] = [
    { command: 'node --version', output: 'v24.18.0' },
    { command: 'npm --version', output: '11.6.2' },
    {
      command: 'pnpm --version',
      output: 'command not found: pnpm',
      failed: true,
    },
  ];
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  replay(): void {
    clearTimeout(this.timer);
    this.calls.set([]);
    this.run(0);
  }

  private run(index: number): void {
    const call = this.script[index];
    if (!call) return;
    this.calls.update((calls) => [...calls, { ...call, state: 'running' }]);
    this.timer = setTimeout(() => {
      this.calls.update((calls) =>
        calls.map((c, i) => (i === index ? { ...c, state: 'done' } : c)),
      );
      this.run(index + 1);
    }, 900);
  }
}`;
}
