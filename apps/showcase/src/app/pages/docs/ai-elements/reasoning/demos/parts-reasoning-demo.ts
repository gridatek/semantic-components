import { NgTemplateOutlet } from '@angular/common';
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
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
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
} from '@semantic-icons/lucide-icons';

/**
 * One reasoning part: a plain line until its text arrives, then a row that
 * opens while it thinks and closes when done — your click wins.
 */
@Component({
  selector: 'app-reasoning-line',
  imports: [
    NgTemplateOutlet,
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
    <ng-template #line>
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
    </ng-template>

    @if (text()) {
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
          <div scTraceCollapsiblePanelContent class="whitespace-pre-wrap">
            {{ text() }}
          </div>
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="line" />
    }
  `,
  // Its rows are the trace's own children.
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ReasoningLine {
  readonly text = input('');
  readonly running = input(false);
  protected readonly choice = signal<boolean | null>(null);
  protected readonly open = computed(() => this.choice() ?? this.running());
}

interface ReasoningPart {
  text: string;
  state: 'streaming' | 'done';
}

/** Some models send several reasoning parts in one message: a line each, in the same trace. */
@Component({
  selector: 'app-parts-reasoning-demo',
  imports: [ReasoningLine, ScButton, ScTrace],
  template: `
    <div class="flex min-h-48 w-full max-w-sm flex-col gap-4">
      <div scTrace aria-live="polite">
        @for (part of parts(); track $index) {
          <app-reasoning-line
            [text]="part.text"
            [running]="part.state === 'streaming'"
          />
        }
      </div>
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
export class PartsReasoningDemo {
  private readonly texts = [
    'The user wants the slowest step of the deploy. Read the deploy log first.',
    'Image optimization takes 3m 50s and its cache never hits: the key includes the commit hash.',
  ];

  /** The message's reasoning parts, as they arrive. */
  protected readonly parts = signal<ReasoningPart[]>(
    this.texts.map((text) => ({ text, state: 'done' })),
  );
  protected readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  replay(): void {
    this.stop();
    this.parts.set([]);
    this.busy.set(true);
    let time = 300;
    this.texts.forEach((text, index) => {
      // A new part, empty: a plain line until its first word.
      this.at(time, () =>
        this.parts.update((parts) => [
          ...parts,
          { text: '', state: 'streaming' },
        ]),
      );
      const words = text.split(' ');
      words.forEach((_, i) => {
        time += 60;
        this.at(time, () => this.write(index, words.slice(0, i + 1).join(' ')));
      });
      time += 200;
      this.at(time, () => this.finish(index));
      time += 600;
    });
    this.at(time, () => this.busy.set(false));
  }

  private write(index: number, text: string): void {
    this.parts.update((parts) =>
      parts.map((part, i) => (i === index ? { ...part, text } : part)),
    );
  }

  private finish(index: number): void {
    this.parts.update((parts) =>
      parts.map((part, i) =>
        i === index ? { ...part, state: 'done' as const } : part,
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
