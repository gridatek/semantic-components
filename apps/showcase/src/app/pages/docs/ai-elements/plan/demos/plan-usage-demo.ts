import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
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
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiCircleDotIcon,
  SiCircleIcon,
  SiRouteIcon,
} from '@semantic-icons/lucide-icons';

const STEPS = [
  'Install @base-ui/react',
  'Replace the Radix imports',
  'Rename asChild to render',
  'Run the type checker',
];

/** The steps the agent plans, and how far it has got (replayed on a timer). */
@Component({
  selector: 'app-plan-usage-demo',
  imports: [
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
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleDotIcon,
    SiCircleIcon,
    SiRouteIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Migrate the dialog components to Base UI.</div>
          </div>
        </div>
      </div>

      @if (current() !== null) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              <div scCollapsible scTraceCollapsible [open]="true">
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span
                    scTraceLine
                    [status]="running() ? 'running' : undefined"
                  >
                    <span scTraceIcon><svg siRouteIcon></svg></span>
                    <span scTraceTitle>Plan: migrate to Base UI</span>
                    <span scTraceDescription
                      >{{ done() }} of {{ steps.length }} done</span
                    >
                  </span>
                </button>
                <div scCollapsiblePanel>
                  <div scTraceCollapsiblePanelContent>
                    <div scTrace>
                      @for (step of steps; track step; let i = $index) {
                        <span
                          scTraceLine
                          [status]="
                            i > current()!
                              ? 'pending'
                              : i === current()
                                ? 'running'
                                : undefined
                          "
                        >
                          <span scTraceIcon>
                            @if (i < current()!) {
                              <svg siCircleCheckIcon></svg>
                            } @else if (i === current()) {
                              <svg siCircleDotIcon></svg>
                            } @else {
                              <svg siCircleIcon></svg>
                            }
                          </span>
                          <span scTraceTitle>{{ step }}</span>
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
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
export class PlanUsageDemo {
  protected readonly steps = STEPS;
  private readonly answer =
    'Migrated Dialog and AlertDialog. The type checker passes.';

  /** The step running now; all done past the end; null before the plan. */
  protected readonly current = signal<number | null>(STEPS.length);
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  protected readonly done = computed(() =>
    Math.min(this.current() ?? 0, STEPS.length),
  );
  protected readonly running = computed(
    () => this.busy() && this.done() < STEPS.length,
  );
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.current.set(null);
    this.reply.set('');
    this.busy.set(true);
    let time = 300;
    for (let step = 0; step <= STEPS.length; step++) {
      this.at(time, () => this.current.set(step));
      time += 1200;
    }
    const words = this.answer.split(' ');
    time -= 900;
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
