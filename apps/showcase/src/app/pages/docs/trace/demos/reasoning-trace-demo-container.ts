import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReasoningTraceDemo } from './reasoning-trace-demo';

@Component({
  selector: 'app-reasoning-trace-demo-container',
  imports: [DemoContainer, ReasoningTraceDemo],
  template: `
    <app-demo-container
      title="Reasoning"
      demoUrl="/demos/trace/reasoning-trace-demo"
      [code]="code"
    >
      <app-reasoning-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ReasoningTraceDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScCollapsible,
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
  SiBrainIcon,
  SiChevronRightIcon,
  SiRotateCcwIcon,
} from '@semantic-icons/lucide-icons';

/** Reasoning as it streams (replayed here): a line while it waits, then a row open while it thinks — your click wins — closed once it is done. */
@Component({
  selector: 'app-reasoning-trace-demo',
  imports: [
    ScButton,
    ScCollapsible,
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
    SiBrainIcon,
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
        @if (thought()) {
          <div
            scCollapsible
            (openChange)="choice.set($event)"
            [open]="open()"
            scTraceCollapsible
          >
            <button scCollapsibleTrigger scTraceCollapsibleTrigger>
              <span scTraceLine [status]="running() ? 'running' : undefined">
                <span scTraceIcon><svg siBrainIcon></svg></span>
                <span scTraceTitle>{{
                  running() ? 'Thinking' : 'Thought'
                }}</span>
              </span>
              <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
            </button>
            <div scCollapsiblePanel>
              <div scTraceCollapsibleContent class="whitespace-pre-wrap">
                {{ thought() }}
              </div>
            </div>
          </div>
        } @else {
          <span scTraceLine [status]="running() ? 'running' : undefined">
            <span scTraceIcon><svg siBrainIcon></svg></span>
            <span scTraceTitle>{{ running() ? 'Thinking' : 'Thought' }}</span>
          </span>
        }
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReasoningTraceDemo {
  private readonly text =
    'Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash.';
  /** The reasoning so far, and whether it is still coming. */
  protected readonly thought = signal('');
  protected readonly running = signal(false);
  /** Your choice, once you open or close it; until then, open while running. */
  protected readonly choice = signal<boolean | null>(null);
  protected readonly open = computed(() => this.choice() ?? this.running());
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  replay(): void {
    clearInterval(this.timer);
    this.thought.set('');
    this.choice.set(null);
    this.running.set(true);
    const words = this.text.split(' ');
    let shown = 0;
    this.timer = setInterval(() => {
      shown += 1;
      this.thought.set(words.slice(0, shown).join(' '));
      if (shown >= words.length) {
        clearInterval(this.timer);
        this.running.set(false);
      }
    }, 120);
  }
}`;
}
