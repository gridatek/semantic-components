import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { TaskUsageDemo } from './task-usage-demo';

@Component({
  selector: 'app-task-usage-demo-container',
  imports: [DemoContainer, TaskUsageDemo],
  template: `
    <app-demo-container
      title="Task"
      demoUrl="/demos/ai-elements/task-usage-demo"
      [code]="code"
    >
      <app-task-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TaskUsageDemoContainer {
  readonly code = `import {
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
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/** A task: its title while running and once done, its steps the same way. */
interface TaskScript {
  id: string;
  title: [running: string, done: string];
  steps: [running: string, done: string][];
}

const TASKS: TaskScript[] = [
  {
    id: 'find',
    title: ['Finding the project files', 'Found the project files'],
    steps: [
      ['Searching for generateMetadata', 'Searched for generateMetadata'],
      ['Reading app/layout.tsx', 'Read app/layout.tsx'],
      ['Reading app/page.tsx', 'Read app/page.tsx'],
    ],
  },
  {
    id: 'update',
    title: ['Updating the page metadata', 'Updated the page metadata'],
    steps: [
      ['Editing app/layout.tsx', 'Edited app/layout.tsx'],
      ['Editing app/page.tsx', 'Edited app/page.tsx'],
    ],
  },
];

/**
 * One task: its steps appear as the agent takes them; open while it runs,
 * closed once done — unless you opened or closed it.
 */
@Component({
  selector: 'app-task-row',
  imports: [
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
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
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
          <span scTraceTitle>{{ task().title[running() ? 0 : 1] }}</span>
        </span>
      </button>
      <div scCollapsiblePanel>
        <div scTraceCollapsiblePanelContent>
          <div scTrace>
            @for (step of steps(); track $index; let i = $index) {
              <span scTraceLine [status]="i < done() ? undefined : 'running'">
                <span scTraceTitle>{{ step[i < done() ? 1 : 0] }}</span>
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class TaskRow {
  readonly task = input.required<TaskScript>();
  /** How many steps are done; the next one, if any, is running. */
  readonly done = input(0);
  protected readonly running = computed(
    () => this.done() < this.task().steps.length,
  );
  protected readonly steps = computed(() =>
    this.task().steps.slice(0, this.done() + 1),
  );
  protected readonly choice = signal<boolean | null>(null);
}

/** The agent's work as tasks, each step appearing as it is taken (replayed on a timer). */
@Component({
  selector: 'app-task-usage-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMessage,
    ScMessageContent,
    ScTrace,
    TaskRow,
  ],
  template: \`
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Add Open Graph metadata to the home page.</div>
          </div>
        </div>
      </div>

      @if (progress().length) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @for (done of progress(); track $index; let i = $index) {
                <app-task-row [task]="tasks[i]" [done]="done" />
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
export class TaskUsageDemo {
  protected readonly tasks = TASKS;
  private readonly answer =
    'Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx.';
  /** For each task so far, how many of its steps are done. */
  protected readonly progress = signal<number[]>(
    TASKS.map((task) => task.steps.length),
  );
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.progress.set([]);
    this.reply.set('');
    this.busy.set(true);
    let time = 300;
    TASKS.forEach((task, index) => {
      for (let done = 0; done <= task.steps.length; done++) {
        this.at(time, () =>
          this.progress.update((progress) => {
            const next = [...progress];
            next[index] = done;
            return next;
          }),
        );
        time += 900;
      }
    });
    time -= 600;
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
}`;
}
