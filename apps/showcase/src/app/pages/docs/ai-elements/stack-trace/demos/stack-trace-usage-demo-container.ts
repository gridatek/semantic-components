import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { StackTraceUsageDemo } from './stack-trace-usage-demo';

@Component({
  selector: 'app-stack-trace-usage-demo-container',
  imports: [DemoContainer, StackTraceUsageDemo],
  template: `
    <app-demo-container
      title="Stack Trace"
      demoUrl="/demos/ai-elements/stack-trace-usage-demo"
      [code]="code"
    >
      <app-stack-trace-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackTraceUsageDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScMessage,
  ScMessageContent,
  ScTrace,
  ScTraceCollapsible,
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
  SiFileCodeIcon,
  SiLayersIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

const STACK = \`TypeError: Cannot read properties of undefined (reading 'email')
    at seedUsers (prisma/seed.ts:27:34)
    at main (prisma/seed.ts:51:9)
    at Module._compile (node:internal/modules/cjs/loader:1554:14)
    at Object.transformer (node_modules/tsx/dist/register.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1289:32)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\`;

const RESET_OUTPUT = \`Database reset successful

The following migrations have been applied:

migrations/
  └─ 20260912_init/
  └─ 20260920_add_profiles/\`;

interface Frame {
  line: string;
  name?: string;
  file?: string;
  lineNumber?: string;
  /** A framework's frame (node_modules, node:), not one you can fix. */
  internal: boolean;
}

function parseFrame(line: string): Frame {
  const match = line.match(/^at (.+) \\((.+):(\\d+):(\\d+)\\)$/);
  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes('node_modules') || line.includes('node:'),
  };
}

type CommandState = 'running' | 'ran' | 'failed';

/** Two commands: the first runs, the second fails — its error the title, its frames inside. */
@Component({
  selector: 'app-stack-trace-usage-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCodeBlock,
    ScCodeBlockContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScMessage,
    ScMessageContent,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileCodeIcon,
    SiLayersIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Reset the database and seed it.</div>
          </div>
        </div>
      </div>

      @if (reset()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @if (reset() === 'ran') {
                <div scCollapsible scTraceCollapsible>
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine>
                      <span scTraceIcon><svg siTerminalIcon></svg></span>
                      <span scTraceTitle>Ran {{ commands[0] }}</span>
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div scTraceCollapsiblePanelContent>
                      <div scCodeBlock size="sm">
                        <pre
                          scCodeBlockContent
                          wrap
                          class="max-h-64"
                          [code]="resetOutput"
                        ></pre>
                      </div>
                    </div>
                  </div>
                </div>
              } @else {
                <span scTraceLine status="running">
                  <span scTraceIcon><svg siTerminalIcon></svg></span>
                  <span scTraceTitle>Running {{ commands[0] }}</span>
                </span>
              }

              @if (seed() === 'failed') {
                <div scCollapsible scTraceCollapsible [open]="true">
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine status="error">
                      <span scTraceIcon><svg siTerminalIcon></svg></span>
                      <span scTraceTitle>Failed: {{ error }}</span>
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div
                      scTraceCollapsiblePanelContent
                      class="flex flex-col gap-2"
                    >
                      <!-- The title truncates: the whole error, again. -->
                      <p class="text-destructive font-mono text-xs">
                        {{ error }}
                      </p>
                      <div scTrace>
                        @for (frame of appFrames; track frame.line) {
                          <a [href]="'#' + frame.file + ':' + frame.lineNumber">
                            <span scTraceLine>
                              <span scTraceIcon
                                ><svg siFileCodeIcon></svg
                              ></span>
                              <span scTraceTitle
                                >{{ frame.name }} in {{ frame.file }}:{{
                                  frame.lineNumber
                                }}</span
                              >
                            </span>
                          </a>
                        }
                        <div scCollapsible scTraceCollapsible>
                          <button
                            scCollapsibleTrigger
                            scTraceCollapsibleTrigger
                          >
                            <span scTraceLine>
                              <span scTraceIcon><svg siLayersIcon></svg></span>
                              <span scTraceTitle
                                >{{ internalFrames.length }} framework
                                frames</span
                              >
                            </span>
                          </button>
                          <div scCollapsiblePanel>
                            <div scTraceCollapsiblePanelContent>
                              <ol
                                class="bg-muted flex flex-col gap-1 overflow-x-auto rounded-md p-3 font-mono text-xs"
                                tabindex="0"
                                aria-label="Framework frames"
                              >
                                @for (
                                  frame of internalFrames;
                                  track frame.line
                                ) {
                                  <li class="whitespace-nowrap">
                                    {{ frame.line }}
                                  </li>
                                }
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } @else if (seed() === 'running') {
                <span scTraceLine status="running">
                  <span scTraceIcon><svg siTerminalIcon></svg></span>
                  <span scTraceTitle>Running {{ commands[1] }}</span>
                </span>
              }
            </div>
            @if (reply()) {
              <p>{{ reply() }}</p>
            }
          </div>
        </div>
      }

      @if (!busy()) {
        <button
          scButton
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          (click)="replay()"
        >
          Replay
        </button>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StackTraceUsageDemo {
  protected readonly commands = [
    'pnpm prisma migrate reset --skip-seed',
    'pnpm prisma db seed',
  ];
  protected readonly resetOutput = RESET_OUTPUT;
  private readonly lines = STACK.split('\\n').map((line) => line.trim());
  protected readonly error = this.lines[0];
  private readonly frames = this.lines.slice(1).map(parseFrame);
  protected readonly appFrames = this.frames.filter((frame) => !frame.internal);
  protected readonly internalFrames = this.frames.filter(
    (frame) => frame.internal,
  );
  private readonly answer =
    'The migrations ran, but the seed failed in seedUsers. One fixture has no profile, so profile.email is undefined.';

  protected readonly reset = signal<CommandState | null>('ran');
  protected readonly seed = signal<CommandState | null>('failed');
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.reset.set(null);
    this.seed.set(null);
    this.reply.set('');
    this.busy.set(true);
    this.at(300, () => this.reset.set('running'));
    this.at(1200, () => {
      this.reset.set('ran');
      this.seed.set('running');
    });
    this.at(2400, () => this.seed.set('failed'));
    let time = 2400;
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.reply.set(words.slice(0, i + 1).join(' ')));
    });
    this.at(time, () => this.busy.set(false));
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}`;
}
