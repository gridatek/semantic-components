import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  type Signal,
  type WritableSignal,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaire } from './questionnaire';
import {
  type ScQuestionnaireAnswer,
  type ScQuestionnaireItemRef,
  hasAnswer,
  inDocumentOrder,
} from './questionnaire-types';

/**
 * A question: a `<fieldset>` — its `legend` the title — shown when it is the
 * questionnaire's `item`, hidden and inert when not. Its `field` is the
 * answer's field in your Signal Form: required, valid, as its schema says.
 */
@Directive({
  selector: 'fieldset[scQuestionnaireItem]',
  host: {
    'data-slot': 'questionnaire-item',
    tabindex: '-1',
    '[hidden]': '!active()',
    '[attr.inert]': 'active() ? null : ""',
    '[attr.aria-invalid]': 'showInvalid() || null',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.data-status]': 'answered() ? "answered" : "unanswered"',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireItem implements ScQuestionnaireItemRef {
  private readonly questionnaire = inject(ScQuestionnaire);
  private readonly injector = inject(Injector);
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its name: the questionnaire's `item` when shown. */
  readonly name = input.required<string>();
  /** The answer's field: `survey.goal`. */
  readonly field = input.required<ScQuestionnaireAnswer>();

  readonly active = computed(() => this.questionnaire.active() === this);
  readonly required = computed(() => this.field()().required());
  readonly valid = computed(() => this.field()().valid());
  readonly answered = computed(() => hasAnswer(this.field()().value()));
  /** Wrong, and tried: its errors show. */
  readonly showInvalid = computed(
    () => this.field()().touched() && this.field()().invalid(),
  );

  private readonly descriptions = signal<readonly Signal<string>[]>([]);
  private readonly errors = signal<readonly Signal<string>[]>([]);
  private readonly choices = signal<readonly HTMLInputElement[]>([]);

  /** Bumped once new choices are in the page: sorted again. */
  private readonly placed = signal(0);
  private placing = false;

  readonly choiceInputs = computed(() => {
    this.placed();
    return [...this.choices()].sort(inDocumentOrder);
  });

  protected readonly describedBy = computed(
    () =>
      [...this.descriptions(), ...(this.showInvalid() ? this.errors() : [])]
        .map((id) => id())
        .join(' ') || null,
  );

  protected readonly class = computed(() =>
    cn(
      'flex min-w-0 flex-col gap-4 border-0 p-0 outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    inject(DestroyRef).onDestroy(this.questionnaire.register(this));
  }

  touch(): void {
    this.field()().markAsTouched();
  }

  focus(): void {
    this.element.focus();
  }

  focusInvalid(): void {
    const answer =
      this.element.querySelector<HTMLElement>('input:checked:not(:disabled)') ??
      this.element.querySelector<HTMLElement>(
        'input:not([type=hidden]):not(:disabled), textarea:not(:disabled)',
      );
    (answer ?? this.element).focus();
  }

  registerDescription(id: Signal<string>): () => void {
    return this.add(this.descriptions, id);
  }

  registerError(id: Signal<string>): () => void {
    return this.add(this.errors, id);
  }

  registerChoice(input: HTMLInputElement): () => void {
    if (!this.placing) {
      this.placing = true;
      afterNextRender(
        () => {
          this.placing = false;
          this.placed.update((n) => n + 1);
        },
        { injector: this.injector },
      );
    }
    return this.add(this.choices, input);
  }

  private add<T>(list: WritableSignal<readonly T[]>, value: T) {
    list.update((values) => [...values, value]);
    return () => list.update((values) => values.filter((v) => v !== value));
  }
}
