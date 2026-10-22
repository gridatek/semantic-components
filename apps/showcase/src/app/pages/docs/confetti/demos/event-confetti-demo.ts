import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';
import { ScConfetti } from '@semantic-components/ui-lab/confetti';

/** The service, on an event — no button: when the last task is ticked, a burst from the list. */
@Component({
  selector: 'app-event-confetti-demo',
  imports: [ScCheckbox, ScCheckboxField, ScLabel],
  template: `
    <div class="grid w-full max-w-sm gap-3">
      <ul
        #list
        class="grid gap-2 rounded-xl border p-4"
        aria-label="Launch checklist"
      >
        @for (task of tasks(); track task.label; let i = $index) {
          <li>
            <div scCheckboxField>
              <input
                type="checkbox"
                scCheckbox
                [checked]="task.done"
                (checkedChange)="toggle(i)"
              />
              <label scLabel>{{ task.label }}</label>
            </div>
          </li>
        }
      </ul>
      <p class="text-muted-foreground text-sm" role="status">
        @if (allDone()) {
          All done — well done!
        } @else {
          {{ left() }} to go.
        }
      </p>
    </div>
  `,
  host: { class: 'flex min-h-72 w-full items-center justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EventConfettiDemo {
  private readonly confetti = inject(ScConfetti);
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  readonly tasks = signal([
    { label: 'Write the brief', done: true },
    { label: 'Book the venue', done: false },
    { label: 'Send the invites', done: false },
  ]);
  readonly left = computed(() => this.tasks().filter((t) => !t.done).length);
  readonly allDone = computed(() => this.left() === 0);

  constructor() {
    // The event: everything done — confetti, from the list.
    effect(() => {
      if (!this.allDone()) return;
      untracked(() =>
        this.confetti.burst({ origin: this.list().nativeElement }),
      );
    });
  }

  toggle(index: number): void {
    this.tasks.update((tasks) =>
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      ),
    );
  }
}
