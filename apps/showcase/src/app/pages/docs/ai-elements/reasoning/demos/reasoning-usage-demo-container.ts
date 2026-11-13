import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { ReasoningUsageDemo } from './reasoning-usage-demo';

@Component({
  selector: 'app-reasoning-usage-demo-container',
  imports: [DemoContainer, ReasoningUsageDemo],
  template: `
    <app-demo-container
      title="Reasoning"
      demoUrl="/demos/ai-elements/reasoning-usage-demo"
      [code]="code"
    >
      <app-reasoning-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReasoningUsageDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  type WritableSignal,
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
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';

/** A question, the agent's thinking as it streams (replayed on a timer), then its answer. */
@Component({
  selector: 'app-reasoning-usage-demo',
  imports: [
    NgTemplateOutlet,
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
    ScTraceLine,
    ScTraceTitle,
  ],
  template: \`
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>{{ question }}</div>
          </div>
        </div>
      </div>

      @if (started()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              <ng-template #line>
                <span scTraceLine [status]="thinking() ? 'running' : undefined">
                  <span scTraceTitle>{{
                    thinking() ? 'Thinking' : 'Thought for 5s'
                  }}</span>
                </span>
              </ng-template>

              @if (thought()) {
                <div
                  scCollapsible
                  scTraceCollapsible
                  [open]="open()"
                  (openChange)="choice.set($event)"
                >
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <ng-container [ngTemplateOutlet]="line" />
                  </button>
                  <div scCollapsiblePanel>
                    <div
                      scTraceCollapsiblePanelContent
                      class="whitespace-pre-wrap"
                    >
                      {{ thought() }}
                    </div>
                  </div>
                </div>
              } @else {
                <ng-container [ngTemplateOutlet]="line" />
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
export class ReasoningUsageDemo {
  protected readonly question = 'Why is the checkout deploy so slow?';
  private readonly reasoning =
    'The deploy log has three phases. Install takes 38s and next build takes 52s, both normal for this repo.\\n\\nImage optimization takes 3m 50s. It reruns on every deploy because its cache key includes the commit hash, so the cache never hits.';
  private readonly answer =
    'Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash, and the deploy should take under two minutes.';

  /** What has arrived so far: the page opens on the finished turn. */
  protected readonly thought = signal(this.reasoning);
  protected readonly reply = signal(this.answer);
  protected readonly started = signal(true);
  protected readonly thinking = signal(false);
  protected readonly busy = signal(false);

  /** Open while it thinks, closed once done — unless you opened or closed it. */
  protected readonly choice = signal<boolean | null>(null);
  private readonly replayed = signal(false);
  protected readonly open = computed(
    () => this.choice() ?? (this.replayed() ? this.thinking() : true),
  );

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  replay(): void {
    this.stop();
    this.thought.set('');
    this.reply.set('');
    this.started.set(false);
    this.choice.set(null);
    this.replayed.set(true);
    this.busy.set(true);

    // Sent; the agent starts thinking, word by word, then answers.
    let time = 300;
    this.at(time, () => {
      this.started.set(true);
      this.thinking.set(true);
    });
    time = this.stream(this.reasoning, this.thought, time, 40);
    this.at(time, () => this.thinking.set(false));
    time = this.stream(this.answer, this.reply, time + 400, 20);
    this.at(time, () => this.busy.set(false));
  }

  /** Writes \`text\` into \`target\` a word at a time; returns when it ends. */
  private stream(
    text: string,
    target: WritableSignal<string>,
    start: number,
    delay: number,
  ): number {
    const words = text.split(' ');
    let time = start;
    words.forEach((_, i) => {
      time += delay;
      this.at(time, () => target.set(words.slice(0, i + 1).join(' ')));
    });
    return time;
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
