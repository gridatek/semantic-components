import { NgTemplateOutlet } from '@angular/common';
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
  SiCircleCheckIcon,
  SiCircleDotIcon,
  SiCircleIcon,
  SiListChecksIcon,
  SiListTodoIcon,
} from '@semantic-icons/lucide-icons';

type TodoStatus = 'pending' | 'in_progress' | 'completed';

interface Todo {
  content: string;
  status: TodoStatus;
}

const TODOS = [
  'Add a dark variant to the theme tokens',
  'Read the theme from a cookie',
  'Add a toggle to the settings page',
  'Check contrast on the charts',
];

/** The list as the agent writes it when the todo at `current` is in progress. */
function todosAt(current: number): Todo[] {
  return TODOS.map((content, index) => ({
    content,
    status:
      index < current
        ? 'completed'
        : index === current
          ? 'in_progress'
          : 'pending',
  }));
}

/** The agent's todo list, To do and Completed, a todo moving across as it is done. */
@Component({
  selector: 'app-queue-usage-demo',
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
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiCircleDotIcon,
    SiCircleIcon,
    SiListChecksIcon,
    SiListTodoIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>Add dark mode to the settings page.</div>
          </div>
        </div>
      </div>

      @if (todos().length) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <div scTrace aria-live="polite">
              @if (pending().length) {
                <div scCollapsible scTraceCollapsible [open]="true">
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine>
                      <span scTraceIcon><svg siListTodoIcon></svg></span>
                      <span scTraceTitle>{{ pending().length }} to do</span>
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div scTraceCollapsiblePanelContent>
                      <div scTrace>
                        @for (todo of pending(); track todo.content) {
                          <ng-container
                            [ngTemplateOutlet]="line"
                            [ngTemplateOutletContext]="{ $implicit: todo }"
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
              @if (completed().length) {
                <div scCollapsible scTraceCollapsible [open]="true">
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine>
                      <span scTraceIcon><svg siListChecksIcon></svg></span>
                      <span scTraceTitle
                        >{{ completed().length }} completed</span
                      >
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div scTraceCollapsiblePanelContent>
                      <div scTrace>
                        @for (todo of completed(); track todo.content) {
                          <ng-container
                            [ngTemplateOutlet]="line"
                            [ngTemplateOutletContext]="{ $implicit: todo }"
                          />
                        }
                      </div>
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

    <!-- Running only while the chat streams: the title stops shimmering when the agent stops. -->
    <ng-template #line let-todo>
      <span
        scTraceLine
        [status]="
          busy() && todo.status === 'in_progress' ? 'running' : undefined
        "
      >
        <span scTraceIcon>
          @switch (todo.status) {
            @case ('completed') {
              <svg siCircleCheckIcon></svg>
            }
            @case ('in_progress') {
              <svg siCircleDotIcon></svg>
            }
            @default {
              <svg siCircleIcon></svg>
            }
          }
        </span>
        <span scTraceTitle>{{ todo.content }}</span>
      </span>
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class QueueUsageDemo {
  private readonly answer =
    'Dark mode is in. The toggle is under Settings, Appearance.';
  protected readonly todos = signal<Todo[]>(todosAt(TODOS.length));
  protected readonly reply = signal(this.answer);
  protected readonly busy = signal(false);
  protected readonly pending = computed(() =>
    this.todos().filter((todo) => todo.status !== 'completed'),
  );
  protected readonly completed = computed(() =>
    this.todos().filter((todo) => todo.status === 'completed'),
  );
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected replay(): void {
    this.stop();
    this.todos.set([]);
    this.reply.set('');
    this.busy.set(true);
    let time = 300;
    for (let step = 0; step <= TODOS.length; step++) {
      this.at(time, () => this.todos.set(todosAt(step)));
      time += 1400;
    }
    time -= 1100;
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
