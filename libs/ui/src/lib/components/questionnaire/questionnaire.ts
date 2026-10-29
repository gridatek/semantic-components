import {
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import {
  type ScQuestionnaireItemRef,
  type ScQuestionnaireShortcuts,
  inDocumentOrder,
  shortcutKeys,
} from './questionnaire-types';

/** Typing into it: the keys are the text's, not ours. */
const isTextEntry = (target: Element) =>
  target instanceof HTMLTextAreaElement ||
  target instanceof HTMLSelectElement ||
  (target instanceof HTMLInputElement &&
    !['button', 'checkbox', 'radio', 'reset', 'submit'].includes(
      target.type,
    )) ||
  (target instanceof HTMLElement && target.isContentEditable);

const isRadio = (target: Element | undefined) =>
  target instanceof HTMLInputElement && target.type === 'radio';

/** A choice made, or text written. */
const isFilled = (answer: HTMLInputElement | HTMLTextAreaElement) =>
  answer instanceof HTMLInputElement &&
  (answer.type === 'radio' || answer.type === 'checkbox')
    ? answer.checked
    : answer.value.trim().length > 0;

/**
 * Questions one at a time, on your `<form>` with its Signal Form
 * (`[formRoot]`): the one shown (`item`, two-way), the way between them
 * (Previous, Next, Skip, Submit — and the keyboard), each checked against
 * your schema before moving on. As shadcn/ui's Questionnaire.
 *
 * Its state, through `#questionnaire="scQuestionnaire"`.
 */
@Directive({
  selector: 'form[scQuestionnaire]',
  exportAs: 'scQuestionnaire',
  host: {
    'data-slot': 'questionnaire',
    novalidate: '',
    '[attr.data-shortcuts]': 'shortcuts()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(submit)': 'onSubmit()',
  },
})
export class ScQuestionnaire {
  private readonly injector = inject(Injector);
  private readonly form =
    inject<ElementRef<HTMLFormElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Keys that pick a choice, shown beside each: letters or numbers. */
  readonly shortcuts = input<ScQuestionnaireShortcuts | null>(null);
  /** The question shown, by its `name` — the first, until set. */
  readonly item = model('');

  private readonly registered = signal<readonly ScQuestionnaireItemRef[]>([]);
  /** Bumped once new questions are in the page: sorted again. */
  private readonly placed = signal(0);
  private placing = false;
  /** The questions, in order. */
  readonly items = computed(() => {
    this.placed();
    return [...this.registered()].sort((a, b) =>
      inDocumentOrder(a.element, b.element),
    );
  });
  readonly active = computed(
    () =>
      this.items().find((item) => item.name() === this.item()) ??
      this.items()[0] ??
      null,
  );
  private readonly index = computed(() => {
    const active = this.active();
    return active ? this.items().indexOf(active) : -1;
  });
  /** The question shown, from 1. */
  readonly current = computed(() => this.index() + 1);
  readonly total = computed(() => this.items().length);
  readonly first = computed(() => this.index() === 0);
  readonly last = computed(
    () => this.total() > 0 && this.index() === this.total() - 1,
  );

  protected readonly class = computed(() =>
    cn('flex w-full min-w-0 flex-col gap-4', this.classInput()),
  );

  constructor() {
    // No question named yet (or gone): the first.
    effect(() => {
      const active = this.active();
      if (active && active.name() !== untracked(this.item))
        this.item.set(active.name());
    });
  }

  register(item: ScQuestionnaireItemRef): () => void {
    this.registered.update((items) => [...items, item]);
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
    return () =>
      this.registered.update((items) => items.filter((i) => i !== item));
  }

  /** The keys of the shortcut mode. */
  readonly shortcutKeys = computed(() => shortcutKeys(this.shortcuts()));

  previous(): void {
    const index = this.index();
    if (index > 0) this.goTo(this.items()[index - 1]);
  }

  /** The next question — once this one is answered as the schema says. */
  next(): void {
    const active = this.active();
    if (!active || this.last() || !this.check(active)) return;
    this.goTo(this.items()[this.index() + 1]);
  }

  /** Past an optional question, unanswered; on the last one, submits. */
  skip(): void {
    const active = this.active();
    if (!active || active.required()) return;
    if (this.last()) this.form.requestSubmit();
    else this.goTo(this.items()[this.index() + 1]);
  }

  /** Next, or submit on the last question. */
  advance(): void {
    const active = this.active();
    if (!active || !this.check(active)) return;
    if (this.last()) this.form.requestSubmit();
    else this.goTo(this.items()[this.index() + 1]);
  }

  private check(item: ScQuestionnaireItemRef): boolean {
    if (item.valid()) return true;
    item.touch();
    item.focusInvalid();
    return false;
  }

  private goTo(
    item: ScQuestionnaireItemRef,
    focus: 'item' | 'invalid' = 'item',
  ) {
    this.item.set(item.name());
    afterNextRender(
      () => (focus === 'invalid' ? item.focusInvalid() : item.focus()),
      { injector: this.injector },
    );
  }

  /** Submitted with a question left wrong: back to it. */
  protected onSubmit(): void {
    const wrong = this.items().find((item) => !item.valid());
    if (!wrong) return;
    wrong.touch();
    if (wrong === this.active()) wrong.focusInvalid();
    else this.goTo(wrong, 'invalid');
  }

  protected onKeydown(event: KeyboardEvent): void {
    const active = this.active();
    const target = event.target;
    if (
      event.defaultPrevented ||
      event.isComposing ||
      !active ||
      !(target instanceof Element)
    )
      return;
    // Mod+Enter: next, or submit, from anywhere.
    if (
      event.key === 'Enter' &&
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      !event.shiftKey
    ) {
      event.preventDefault();
      if (!event.repeat) this.advance();
      return;
    }
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const answers = this.answersOf(active);
    if (
      (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
      this.moveFocus(active, answers, target, event.key === 'ArrowDown')
    ) {
      event.preventDefault();
      return;
    }
    if (
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
      !isTextEntry(target) &&
      !isRadio(target)
    ) {
      event.preventDefault();
      if (event.repeat) return;
      // Back is toward the start of the line: left, or right in RTL.
      const back =
        (event.key === 'ArrowLeft') !==
        (getComputedStyle(this.form).direction === 'rtl');
      if (back) this.previous();
      else if (active.answered()) this.next();
      return;
    }
    if (event.key === 'Enter') {
      const answer = answers.find((a) => a === target);
      // Enter in a text field doesn't submit the form: it answers.
      if (!answer || answer instanceof HTMLTextAreaElement) return;
      event.preventDefault();
      if (!event.repeat && isFilled(answer)) this.advance();
      return;
    }
    if (isTextEntry(target)) return;
    const keys = this.shortcutKeys();
    const key =
      this.shortcuts() === 'letters' ? event.key.toUpperCase() : event.key;
    const choice = active.choiceInputs()[keys.indexOf(key)];
    if (!keys.includes(key) || !choice || choice.disabled) return;
    event.preventDefault();
    if (event.repeat) return;
    choice.focus();
    choice.click();
  }

  /** The question's answer controls, enabled, in order. */
  private answersOf(item: ScQuestionnaireItemRef) {
    return Array.from(
      item.element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        'input:not([type=hidden]):not(:disabled), textarea:not(:disabled)',
      ),
    );
  }

  /**
   * ↑/↓ between the answers — radios already move on their own, text keeps
   * its caret unless empty.
   */
  private moveFocus(
    item: ScQuestionnaireItemRef,
    answers: (HTMLInputElement | HTMLTextAreaElement)[],
    target: Element,
    down: boolean,
  ): boolean {
    const index = answers.findIndex((a) => a === target);
    const at = answers[index];
    if (!answers.length) return false;
    if (
      isTextEntry(target) &&
      !(at instanceof HTMLInputElement && !at.value.trim())
    )
      return false;
    if (index < 0 && target !== item.element) return false;
    const to =
      index < 0
        ? (answers.find(isFilled) ??
          (down ? answers[0] : answers[answers.length - 1]))
        : answers[(index + (down ? 1 : -1) + answers.length) % answers.length];
    if (!to || to === target || (index >= 0 && isRadio(target) && isRadio(to)))
      return false;
    to.focus();
    if (isRadio(to)) to.click();
    return true;
  }
}
