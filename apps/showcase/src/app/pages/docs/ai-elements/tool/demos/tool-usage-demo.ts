import {
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
import { SiTerminalIcon } from '@semantic-icons/lucide-icons';

/** A tool call: running, then ran (its output) or failed (its error). */
interface Call {
  command: string;
  state: 'running' | 'ran' | 'failed';
  output: string;
}

const CALLS: Call[] = [
  { command: 'node --version', state: 'ran', output: 'v24.18.0' },
  { command: 'npm --version', state: 'ran', output: '11.6.2' },
  {
    command: 'pnpm --version',
    state: 'failed',
    output: 'command not found: pnpm',
  },
];

/** The agent's tool calls, from input to output (replayed on a timer). */
@Component({
  selector: 'app-tool-usage-demo',
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
    SiTerminalIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Which package managers are installed?</div>
          </div>
        </div>
      </div>

      @if (calls().length) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @for (call of calls(); track call.command) {
                @if (call.state === 'running') {
                  <!-- A plain line while it runs: nothing to open yet. -->
                  <span scTraceLine status="running">
                    <span scTraceIcon><svg siTerminalIcon></svg></span>
                    <span scTraceTitle>Running {{ call.command }}</span>
                  </span>
                } @else {
                  <div
                    scCollapsible
                    scTraceCollapsible
                    [open]="!replayed() && call.state === 'failed'"
                  >
                    <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                      <span
                        scTraceLine
                        [status]="call.state === 'failed' ? 'error' : undefined"
                      >
                        <span scTraceIcon><svg siTerminalIcon></svg></span>
                        <span scTraceTitle
                          >{{
                            call.state === 'failed' ? 'Failed to run' : 'Ran'
                          }}
                          {{ call.command }}</span
                        >
                      </span>
                    </button>
                    <div scCollapsiblePanel>
                      <div scTraceCollapsiblePanelContent>
                        <div scCodeBlock size="sm">
                          <pre
                            scCodeBlockContent
                            wrap
                            class="max-h-64"
                            [code]="call.output"
                          ></pre>
                        </div>
                      </div>
                    </div>
                  </div>
                }
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ToolUsageDemo {
  private readonly answer = 'Node 24 and npm 11 are installed. pnpm is not.';
  protected readonly calls = signal<Call[]>(CALLS);
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  protected readonly replayed = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.calls.set([]);
    this.reply.set('');
    this.busy.set(true);
    this.replayed.set(true);
    let time = 300;
    for (const call of CALLS) {
      this.at(time, () =>
        this.calls.update((calls) => [...calls, { ...call, state: 'running' }]),
      );
      time += 900;
      this.at(time, () =>
        this.calls.update((calls) =>
          calls.map((c) => (c.command === call.command ? call : c)),
        ),
      );
    }
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
}
