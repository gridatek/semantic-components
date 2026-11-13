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
  ScMarker,
  ScMarkerContent,
  ScMessage,
  ScMessageContent,
} from '@semantic-components/ui';

interface Turn {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly text: string;
  /** A point to return to, after this turn. */
  readonly checkpoint?: string;
}

const SCRIPT: readonly Turn[] = [
  { id: 'u1', role: 'user', text: 'Rename the button component to action.' },
  {
    id: 'a1',
    role: 'assistant',
    text: 'Renamed Button to Action in components/ui/button.tsx.',
    checkpoint: 'Button renamed',
  },
  { id: 'u2', role: 'user', text: 'Update the docs to match.' },
  {
    id: 'a2',
    role: 'assistant',
    text: 'Updated the Button page to say Action.',
  },
];

/** A marker after a turn, with Restore: it keeps that turn and drops every later one. */
@Component({
  selector: 'app-checkpoint-usage-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMarker,
    ScMarkerContent,
    ScMessage,
    ScMessageContent,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      @for (turn of turns(); track turn.id; let last = $last) {
        @if (turn.role === 'user') {
          <div scMessage alignment="end">
            <div scMessageContent>
              <div scBubble alignment="end" variant="muted">
                <div scBubbleContent>{{ turn.text }}</div>
              </div>
            </div>
          </div>
        } @else {
          <div scMessage>
            <div scMessageContent>
              <p>{{ turn.text }}</p>
            </div>
          </div>
        }
        @if (turn.checkpoint) {
          <div scMarker variant="separator">
            <span scMarkerContent class="inline-flex items-center gap-2">
              {{ turn.checkpoint }}
              @if (!last) {
                <button
                  scButton
                  size="xs"
                  variant="outline"
                  (click)="restore(turn.id)"
                >
                  Restore
                  <span class="sr-only">to {{ turn.checkpoint }}</span>
                </button>
              }
            </span>
          </div>
        }
      }
      @if (!busy() && next()) {
        <button
          scButton
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          (click)="continue()"
        >
          Continue
        </button>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CheckpointUsageDemo {
  protected readonly turns = signal<readonly Turn[]>(SCRIPT);
  protected readonly busy = signal(false);
  /** The next scripted message, once a restore has dropped it. */
  protected readonly next = computed(() => SCRIPT[this.turns().length]);
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  /** Keeps that turn, drops every message after it. */
  protected restore(id: string): void {
    const index = this.turns().findIndex((turn) => turn.id === id);
    if (index !== -1) this.turns.set(this.turns().slice(0, index + 1));
  }

  /** Sends the next scripted message; the agent answers word by word. */
  protected continue(): void {
    const question = this.next();
    const answer = SCRIPT[this.turns().length + 1];
    if (!question) return;
    this.busy.set(true);
    this.turns.update((turns) => [...turns, question]);
    if (!answer) {
      this.busy.set(false);
      return;
    }
    const words = answer.text.split(' ');
    let time = 300;
    words.forEach((_, i) => {
      time += 40;
      this.timers.push(
        setTimeout(() => {
          const reply = { ...answer, text: words.slice(0, i + 1).join(' ') };
          this.turns.update((turns) =>
            i === 0 ? [...turns, reply] : [...turns.slice(0, -1), reply],
          );
        }, time),
      );
    });
    this.timers.push(setTimeout(() => this.busy.set(false), time));
  }
}
