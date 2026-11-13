import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { ChainOfThoughtUsageDemo } from './chain-of-thought-usage-demo';

@Component({
  selector: 'app-chain-of-thought-usage-demo-container',
  imports: [DemoContainer, ChainOfThoughtUsageDemo],
  template: `
    <app-demo-container
      title="Chain of Thought"
      demoUrl="/demos/ai-elements/chain-of-thought-usage-demo"
      [code]="code"
    >
      <app-chain-of-thought-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChainOfThoughtUsageDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScBadge,
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
  SiArrowUpRightIcon,
  SiCircleCheckIcon,
  SiGlobeIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

interface Step {
  readonly kind: 'log' | 'web' | 'code';
  readonly done: boolean;
}

/** A question, the agent's steps under one summary (replayed on a timer), then its answer. */
@Component({
  selector: 'app-chain-of-thought-usage-demo',
  imports: [
    ScBadge,
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
    SiArrowUpRightIcon,
    SiCircleCheckIcon,
    SiGlobeIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Why is the checkout deploy so slow?</div>
          </div>
        </div>
      </div>

      @if (steps().length) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              <div
                scCollapsible
                scTraceCollapsible
                [open]="open()"
                (openChange)="choice.set($event)"
              >
                <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                  <span
                    scTraceLine
                    [status]="researching() ? 'running' : undefined"
                  >
                    <span scTraceIcon>
                      @if (researching()) {
                        <svg
                          siLoaderCircleIcon
                          class="motion-safe:animate-spin"
                        ></svg>
                      } @else {
                        <svg siCircleCheckIcon></svg>
                      }
                    </span>
                    <span scTraceTitle>{{
                      researching()
                        ? 'Researching'
                        : 'Researched in ' + steps().length + ' steps'
                    }}</span>
                  </span>
                </button>
                <div scCollapsiblePanel>
                  <div scTraceCollapsiblePanelContent>
                    <div scTrace>
                      @for (step of steps(); track step.kind) {
                        @if (step.done) {
                          <div
                            scCollapsible
                            scTraceCollapsible
                            [open]="step.kind === 'log'"
                          >
                            <button
                              scCollapsibleTrigger
                              scTraceCollapsibleTrigger
                            >
                              <span scTraceLine>
                                <span scTraceIcon>
                                  <svg siCircleCheckIcon></svg>
                                </span>
                                <span scTraceTitle>{{ title(step) }}</span>
                              </span>
                            </button>
                            <div scCollapsiblePanel>
                              <div scTraceCollapsiblePanelContent>
                                @switch (step.kind) {
                                  @case ('log') {
                                    <div scCodeBlock size="sm">
                                      <pre
                                        scCodeBlockContent
                                        wrap
                                        class="max-h-64"
                                        [code]="log"
                                      ></pre>
                                    </div>
                                  }
                                  @case ('web') {
                                    <div scTrace>
                                      @for (
                                        result of results;
                                        track result.url
                                      ) {
                                        <a
                                          [href]="result.url"
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <span scTraceLine>
                                            <span scTraceIcon>
                                              <svg siGlobeIcon></svg>
                                            </span>
                                            <span scTraceTitle>
                                              {{ result.title }}
                                              <span class="sr-only">
                                                (opens in a new tab)</span
                                              >
                                            </span>
                                            <span scTraceIcon>
                                              <svg siArrowUpRightIcon></svg>
                                            </span>
                                          </span>
                                        </a>
                                      }
                                    </div>
                                  }
                                  @case ('code') {
                                    <div class="flex flex-wrap gap-1.5">
                                      @for (file of files; track file) {
                                        <span
                                          scBadge
                                          variant="secondary"
                                          class="font-mono"
                                          >{{ file }}</span
                                        >
                                      }
                                    </div>
                                  }
                                }
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
                            <span scTraceTitle>{{ title(step) }}</span>
                          </span>
                        }
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ChainOfThoughtUsageDemo {
  protected readonly log = 'install    41s\\ncompile    38s\\nimages   3m 52s';
  protected readonly results = [
    {
      title: 'Image component | nextjs.org',
      url: 'https://nextjs.org/docs/app/api-reference/components/image',
    },
    {
      title: 'Build cache | vercel.com',
      url: 'https://vercel.com/docs/deployments/troubleshoot-a-build',
    },
  ];
  protected readonly files = ['next.config.ts', 'scripts/optimize-images.ts'];
  private readonly answer =
    'Image optimization takes almost four minutes because its cache key includes the commit hash. Key it on the image directory instead.';

  /** The page opens on the finished turn. */
  protected readonly steps = signal<readonly Step[]>([
    { kind: 'log', done: true },
    { kind: 'web', done: true },
    { kind: 'code', done: true },
  ]);
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);

  /** Researching while steps run and before the reply starts. */
  protected readonly researching = computed(() => this.busy() && !this.reply());
  /** Open while it researches — unless you opened or closed it. */
  protected readonly choice = signal<boolean | null>(null);
  protected readonly open = computed(() => this.choice() ?? this.researching());

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /** The step's title, in the tense of its state. */
  protected title(step: Step): string {
    const verb = (running: string, done: string) =>
      step.done ? done : running;
    switch (step.kind) {
      case 'log':
        return \`\${verb('Reading', 'Read')} the build log for dpl_8Kx2\`;
      case 'web':
        return \`\${verb('Searching', 'Searched')} the web for next.js image cache key\`;
      case 'code':
        return \`\${verb('Searching', 'Searched')} the code for cacheKey\`;
    }
  }

  replay(): void {
    this.stop();
    this.steps.set([]);
    this.reply.set('');
    this.choice.set(null);
    this.busy.set(true);
    let time = 300;
    for (const kind of ['log', 'web', 'code'] as const) {
      this.at(time, () =>
        this.steps.update((steps) => [...steps, { kind, done: false }]),
      );
      time += 900;
      this.at(time, () =>
        this.steps.update((steps) =>
          steps.map((step) =>
            step.kind === kind ? { ...step, done: true } : step,
          ),
        ),
      );
      time += 200;
    }
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 20;
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
