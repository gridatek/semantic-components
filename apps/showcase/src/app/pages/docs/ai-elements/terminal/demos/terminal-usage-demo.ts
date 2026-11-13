import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
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

const COMMANDS = [
  {
    command: 'pnpm lint',
    output: ['> acme-chat@0.1.0 lint', '> eslint .'],
  },
  {
    command: 'pnpm test',
    output: [
      '> acme-chat@0.1.0 test',
      '> vitest run',
      '',
      ' ✓ lib/ai.test.ts (6 tests) 41ms',
      ' ✓ components/chat.test.tsx (9 tests) 212ms',
      '',
      ' Test Files  2 passed (2)',
      '      Tests  15 passed (15)',
    ],
  },
  {
    command: 'pnpm build',
    output: [
      '> acme-chat@0.1.0 build',
      '> next build',
      '',
      '   ▲ Next.js 16.3.0',
      '   Creating an optimized production build ...',
      ' ✓ Compiled successfully in 4.2s',
      ' ✓ Generating static pages (12/12)',
      '',
      'Route (app)                Size  First Load JS',
      '┌ ○ /                     1.9 kB       112 kB',
      '└ ƒ /api/chat              141 B       102 kB',
    ],
  },
];

/** Where a command stands: its output so far, and whether it has exited. */
interface Run {
  command: string;
  lines: number;
  exited: boolean;
}

/**
 * A command: open once its first output arrives, so the output shows while it
 * runs — then left as is, unless you opened or closed it.
 */
@Component({
  selector: 'app-command-row',
  imports: [
    ScCodeBlock,
    ScCodeBlockContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiTerminalIcon,
  ],
  template: `
    <div
      scCollapsible
      scTraceCollapsible
      [open]="choice() ?? defaultOpen() ?? (running() && output().length > 0)"
      (openChange)="choice.set($event)"
    >
      <button scCollapsibleTrigger scTraceCollapsibleTrigger>
        <span scTraceLine [status]="running() ? 'running' : undefined">
          <span scTraceIcon><svg siTerminalIcon></svg></span>
          <span scTraceTitle
            >{{ running() ? 'Running' : 'Ran' }} {{ command() }}</span
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
              [code]="output()"
            ></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandRow {
  readonly command = input('');
  readonly output = input('');
  readonly running = input(false);
  readonly defaultOpen = input<boolean | undefined>(undefined);
  protected readonly choice = signal<boolean | null>(null);
}

/** Commands the agent runs, their output streaming in under them (replayed on a timer). */
@Component({
  selector: 'app-terminal-usage-demo',
  imports: [
    CommandRow,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMessage,
    ScMessageContent,
    ScTrace,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Run the checks, then build the app.</div>
          </div>
        </div>
      </div>

      @if (runs().length) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace>
              @for (run of runs(); track run.command; let last = $last) {
                <app-command-row
                  [command]="run.command"
                  [output]="output(run)"
                  [running]="!run.exited"
                  [defaultOpen]="replayed() ? undefined : last"
                />
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
export class TerminalUsageDemo {
  private readonly answer =
    'Lint and tests pass, and the build compiled both routes.';
  /** The page opens on the finished turn, the last command open. */
  protected readonly runs = signal<Run[]>(
    COMMANDS.map(({ command, output }) => ({
      command,
      lines: output.length,
      exited: true,
    })),
  );
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  protected readonly replayed = signal(false);
  private readonly outputs = computed(
    () => new Map(COMMANDS.map(({ command, output }) => [command, output])),
  );
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected output(run: Run): string {
    return (this.outputs().get(run.command) ?? [])
      .slice(0, run.lines)
      .join('\n');
  }

  protected replay(): void {
    this.stop();
    this.runs.set([]);
    this.reply.set('');
    this.busy.set(true);
    this.replayed.set(true);
    let time = 300;
    COMMANDS.forEach(({ command, output }) => {
      this.at(time, () =>
        this.runs.update((runs) => [
          ...runs,
          { command, lines: 0, exited: false },
        ]),
      );
      output.forEach((_, i) => {
        time += 200;
        this.at(time, () => this.update(command, { lines: i + 1 }));
      });
      time += 300;
      this.at(time, () => this.update(command, { exited: true }));
      time += 200;
    });
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.reply.set(words.slice(0, i + 1).join(' ')));
    });
    this.at(time, () => this.busy.set(false));
  }

  private update(command: string, change: Partial<Run>): void {
    this.runs.update((runs) =>
      runs.map((run) =>
        run.command === command ? { ...run, ...change } : run,
      ),
    );
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
