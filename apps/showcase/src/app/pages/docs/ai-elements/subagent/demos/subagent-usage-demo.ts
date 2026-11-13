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
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

const STEPS = [
  {
    command: 'grep -rn cacheKey scripts',
    stdout:
      'scripts/optimize-images.ts:14:  const cacheKey = process.env.COMMIT_SHA',
  },
  {
    command: 'sed -n 13,15p scripts/optimize-images.ts',
    stdout:
      'const cacheDir = ".next/cache/images"\nconst cacheKey = process.env.COMMIT_SHA\nconst cached = await restoreCache(cacheDir, cacheKey)',
  },
  { command: 'ls public/images | wc -l', stdout: '1240' },
];

/** Work handed to a subagent: its run is the line, its tool calls and report inside. */
@Component({
  selector: 'app-subagent-usage-demo',
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
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>
              Why does image optimization rerun on every deploy?
            </div>
          </div>
        </div>
      </div>

      @if (started()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @if (current() === null) {
                <!-- Nothing to open before the subagent has done anything. -->
                <span scTraceLine status="running">
                  <span scTraceIcon>
                    <svg
                      siLoaderCircleIcon
                      class="motion-safe:animate-spin"
                    ></svg>
                  </span>
                  <span scTraceTitle>Running the research subagent</span>
                </span>
              } @else {
                <div scCollapsible scTraceCollapsible [open]="true">
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine [status]="done() ? undefined : 'running'">
                      <span scTraceIcon>
                        @if (done()) {
                          <svg siCircleCheckIcon></svg>
                        } @else {
                          <svg
                            siLoaderCircleIcon
                            class="motion-safe:animate-spin"
                          ></svg>
                        }
                      </span>
                      <span scTraceTitle
                        >{{ done() ? 'Ran' : 'Running' }} the research
                        subagent</span
                      >
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div
                      scTraceCollapsiblePanelContent
                      class="flex flex-col gap-3"
                    >
                      <div scTrace>
                        @for (
                          step of visibleSteps();
                          track step.command;
                          let i = $index
                        ) {
                          @if (i < current()!) {
                            <div scCollapsible scTraceCollapsible>
                              <button
                                scCollapsibleTrigger
                                scTraceCollapsibleTrigger
                              >
                                <span scTraceLine>
                                  <span scTraceIcon
                                    ><svg siCircleCheckIcon></svg
                                  ></span>
                                  <span scTraceTitle
                                    >Ran {{ step.command }}</span
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
                                      [code]="step.stdout"
                                    ></pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          } @else {
                            <span scTraceLine status="running">
                              <span scTraceIcon>
                                <svg
                                  siLoaderCircleIcon
                                  class="motion-safe:animate-spin"
                                ></svg>
                              </span>
                              <span scTraceTitle
                                >Running {{ step.command }}</span
                              >
                            </span>
                          }
                        }
                      </div>
                      @if (report()) {
                        <p>{{ report() }}</p>
                      }
                    </div>
                  </div>
                </div>
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
export class SubagentUsageDemo {
  private readonly finding =
    'The cache is keyed on the commit SHA, so every deploy misses it and optimizes all 1,240 images again.';
  private readonly answer =
    'Image optimization reruns because its cache is keyed on the commit SHA, which changes on every deploy. Key the cache on a hash of public/images instead, and unchanged images will be skipped.';

  protected readonly started = signal(true);
  /** The step the subagent is on; past the end when done; null before its first. */
  protected readonly current = signal<number | null>(STEPS.length);
  protected readonly report = signal(this.finding);
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  protected readonly done = computed(() => this.report() !== '');
  protected readonly visibleSteps = computed(() =>
    STEPS.slice(0, Math.min((this.current() ?? 0) + 1, STEPS.length)),
  );
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.started.set(false);
    this.current.set(null);
    this.report.set('');
    this.reply.set('');
    this.busy.set(true);
    this.at(300, () => this.started.set(true));
    let time = 900;
    for (let step = 0; step <= STEPS.length; step++) {
      this.at(time, () => this.current.set(step));
      time += 1000;
    }
    time -= 600;
    this.at(time, () => this.report.set(this.finding));
    time += 400;
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 30;
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
