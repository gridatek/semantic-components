import {
  Component,
  DestroyRef,
  ViewEncapsulation,
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
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
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
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** A reasoning row: open while it thinks, closed when done — your click wins. */
@Component({
  selector: 'app-confirmation-reasoning-row',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div
      scCollapsible
      scTraceCollapsible
      [open]="choice() ?? running()"
      (openChange)="choice.set($event)"
    >
      <button scCollapsibleTrigger scTraceCollapsibleTrigger>
        <span scTraceLine [status]="running() ? 'running' : undefined">
          <span scTraceIcon>
            @if (running()) {
              <svg siLoaderCircleIcon class="motion-safe:animate-spin"></svg>
            } @else {
              <svg siCircleCheckIcon></svg>
            }
          </span>
          <span scTraceTitle>{{ running() ? 'Thinking' : 'Thought' }}</span>
        </span>
      </button>
      <div scCollapsiblePanel>
        <div scTraceCollapsiblePanelContent class="whitespace-pre-wrap">
          {{ text() }}
        </div>
      </div>
    </div>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationReasoningRow {
  readonly text = input('');
  readonly running = input(false);
  private readonly choice = signal<boolean | null>(null);
}

/** Where the command stands: waiting for an answer, running, ran, or denied. */
type CommandState = 'asking' | 'running' | 'ran' | 'denied';

/** The agent asks before a command it can't undo: Deny or Approve, then a tool line. */
@Component({
  selector: 'app-confirmation-usage-demo',
  imports: [
    ConfirmationReasoningRow,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScMessage,
    ScMessageContent,
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiTerminalIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      @if (sent()) {
        <div scMessage alignment="end">
          <div scMessageContent>
            <div scBubble alignment="end" variant="muted">
              <div scBubbleContent>Clean up the build folder.</div>
            </div>
          </div>
        </div>
      }
      @if (thought()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace>
              <app-confirmation-reasoning-row
                [text]="thought()"
                [running]="thinking()"
              />
            </div>
            @switch (command()) {
              @case ('asking') {
                <!-- A pending approval is a prompt, not activity: outside the trace. -->
                <div scItem variant="outline" size="sm">
                  <div scItemMedia variant="icon">
                    <svg siTerminalIcon></svg>
                  </div>
                  <div scItemBody>
                    <div scItemTitle>Run rm -rf dist?</div>
                    <p scItemDescription>The command runs in this project.</p>
                  </div>
                  <div scItemActions>
                    <button
                      scButton
                      size="sm"
                      variant="outline"
                      (click)="answer(false)"
                    >
                      Deny
                    </button>
                    <button scButton size="sm" (click)="answer(true)">
                      Approve
                    </button>
                  </div>
                </div>
              }
              @case (null) {}
              @default {
                <div scTrace>
                  <span
                    scTraceLine
                    [status]="command() === 'running' ? 'running' : undefined"
                  >
                    <span scTraceIcon><svg siTerminalIcon></svg></span>
                    <span scTraceTitle>{{ title() }} rm -rf dist</span>
                  </span>
                </div>
              }
            }
            @if (reply()) {
              <p>{{ reply() }}</p>
            }
          </div>
        </div>
      }
      @if (!busy() && command() !== 'asking') {
        <button
          scButton
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          (click)="sent() ? reset() : send()"
        >
          {{ sent() ? 'Reset' : 'Send message' }}
        </button>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationUsageDemo {
  private readonly reasoning =
    'The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command.';

  private readonly sent = signal(false);
  private readonly thought = signal('');
  private readonly thinking = signal(false);
  private readonly command = signal<CommandState | null>(null);
  private readonly reply = signal('');
  private readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  private title(): string {
    switch (this.command()) {
      case 'denied':
        return 'Denied';
      case 'ran':
        return 'Ran';
      default:
        return 'Running';
    }
  }

  private send(): void {
    this.busy.set(true);
    this.sent.set(true);
    let time = 600;
    this.at(time, () => this.thinking.set(true));
    const words = this.reasoning.split(' ');
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.thought.set(words.slice(0, i + 1).join(' ')));
    });
    this.at(time + 100, () => this.thinking.set(false));
    // The agent stops and asks.
    this.at(time + 500, () => {
      this.command.set('asking');
      this.busy.set(false);
    });
  }

  /** The person's answer: the command runs, or it is denied; then the agent says so. */
  private answer(approved: boolean): void {
    this.busy.set(true);
    this.command.set(approved ? 'running' : 'denied');
    let time = approved ? 800 : 0;
    if (approved) this.at(time, () => this.command.set('ran'));
    const words = (
      approved
        ? 'Removed the dist folder.'
        : 'Okay, I left the dist folder in place.'
    ).split(' ');
    time += 600;
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.reply.set(words.slice(0, i + 1).join(' ')));
    });
    this.at(time, () => this.busy.set(false));
  }

  private reset(): void {
    this.stop();
    this.sent.set(false);
    this.thought.set('');
    this.thinking.set(false);
    this.command.set(null);
    this.reply.set('');
    this.busy.set(false);
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
