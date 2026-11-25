import {
  Directive,
  ElementRef,
  type Signal,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { ScTokenInputToken } from './token-input-token';
import {
  type ScToken,
  type ScTokenCodec,
  type ScTokenDeletion,
  type ScTokenInputChange,
  type ScTokenInputReason,
  type ScTokenInputValue,
  scTokenCodec,
  scTokenValueEqual,
  scTokenValueLength,
  scTokenValueNormalize,
  scTokenValueSplice,
  scTokenValueTokens,
  scTokenWithId,
} from './token-input-value';

/** The editor, as the root and the menu reach it. */
export interface ScTokenInputEditorHost {
  readonly element: HTMLElement;
  /** The caret (a character each, a token one): kept when focus leaves. */
  readonly caret: Signal<number | null>;
  readonly focused: Signal<boolean>;
  /** The caret, read from the page now. */
  readCaret(): number | null;
  /** Where the character at `offset` is drawn, in the viewport. */
  rectAt(offset: number): DOMRect | null;
  focus(): void;
  /** The value shown now: a change of its own, before the next key. */
  refresh(): void;
}

/** A trigger menu inside the input, as the editor reaches it. */
export interface ScTokenInputMenuHost {
  /** A key, the menu's first: true when it used it. */
  onKeydown(event: KeyboardEvent): boolean;
  /** The character that opens the menu for this kind of token. */
  charFor(type: string): string | null;
  /** Open the menu on the text from `start`, spaces and all (a token reverted). */
  pin(start: number): void;
  /** Shown: the editor points at its list. */
  readonly visible: Signal<boolean>;
  readonly listId: string;
  readonly activeId: Signal<string | null>;
}

interface ScTokenInputStep {
  readonly value: ScTokenInputValue;
  readonly caret: number;
}

/** Typing within this long (ms) is one step back. */
const GROUP_DELAY = 1000;
const HISTORY_LIMIT = 100;

/**
 * A text field that holds tokens in its text — people mentioned, files
 * attached — each moving, deleting and copying whole. The value: text and
 * tokens in order (a `[formField]`). Holds the editor (`scTokenInputEditor`),
 * its tokens' template (`scTokenInputToken`) and, for suggestions, a trigger
 * menu (`scTriggerMenu`). `#input="scTokenInput"`: `insert()`,
 * `updateToken()`, `removeToken()`, `undo()`, `redo()`, `clear()`, `focus()`.
 */
@Directive({
  selector: 'div[scTokenInput]',
  exportAs: 'scTokenInput',
  host: {
    'data-slot': 'token-input',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScTokenInput implements FormValueControl<ScTokenInputValue> {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The text and its tokens: two-way, or `[formField]`. */
  readonly value = model<ScTokenInputValue>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /**
   * Backspace or Delete next to a token: `whole` removes it; `select`
   * selects it, then removes it; `revert` turns it back into its text (the
   * trigger menu opens on it).
   */
  readonly tokenDeletion = input<ScTokenDeletion>('whole');
  /** The key that submits: Enter, Ctrl/⌘ + Enter, or none (Enter: a new line). */
  readonly submitShortcut = input<'enter' | 'mod+enter' | null>(null);
  /** Tokens as text: copy and paste. */
  readonly codec = input<ScTokenCodec>(scTokenCodec);

  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();
  /** The submit shortcut pressed: the value. */
  readonly submitted = output<ScTokenInputValue>();

  /** The last change: why, the tokens added and removed — to announce it. */
  readonly lastChange = signal<ScTokenInputChange | null>(null);
  /** The token Backspace selected (`tokenDeletion: 'select'`). */
  readonly selectedToken = signal<ScToken | null>(null);

  private readonly history = signal<{
    past: readonly ScTokenInputStep[];
    future: readonly ScTokenInputStep[];
  }>({ past: [], future: [] });
  readonly canUndo = computed(() => this.history().past.length > 0);
  readonly canRedo = computed(() => this.history().future.length > 0);
  /** When the last typing was: typing within a second is one step. */
  private lastTyping = 0;

  /** The tokens' template. */
  readonly ɵtokenTemplate = contentChild(ScTokenInputToken);
  readonly ɵeditor = signal<ScTokenInputEditorHost | undefined>(undefined);
  readonly ɵmenu = signal<ScTokenInputMenuHost | undefined>(undefined);
  /** Where the caret was before the change being made. */
  ɵcaretBefore: number | null = null;
  /** Where the editor puts the caret once it shows the new value. */
  ɵcaretAfter: number | null = null;

  /** Neither disabled nor read-only. */
  readonly editable = computed(() => !this.disabled() && !this.readonly());

  private readonly class = computed(() =>
    cn('relative block w-full', this.classInput()),
  );

  /** The value made `next`: one step back, the change told. */
  ɵcommit(
    next: ScTokenInputValue,
    reason: ScTokenInputReason,
    caret: number | null,
    options: { typing?: boolean; record?: boolean } = {},
  ): void {
    const previous = this.value();
    next = scTokenValueNormalize(next);
    if (scTokenValueEqual(previous, next)) return;
    if (options.record !== false) {
      const now = performance.now();
      const grouped =
        options.typing &&
        this.lastTyping &&
        now - this.lastTyping < GROUP_DELAY;
      if (!grouped) {
        const step = {
          value: previous,
          caret:
            this.ɵcaretBefore ??
            this.ɵeditor()?.caret() ??
            scTokenValueLength(previous),
        };
        this.history.update(({ past }) => ({
          past: [...past, step].slice(-HISTORY_LIMIT),
          future: [],
        }));
      } else {
        this.history.update(({ past }) => ({ past, future: [] }));
      }
      this.lastTyping = options.typing ? now : 0;
    }
    this.ɵcaretBefore = null;
    if (options.record !== false) this.tell(previous, next, reason);
    this.ɵcaretAfter = caret;
    this.selectedToken.set(null);
    this.value.set(next);
    // Typing is on the page already; any other change is shown at once — a
    // key pressed right after it must type into it, not into what was.
    if (!options.typing) this.ɵeditor()?.refresh();
  }

  /**
   * Text, a token, or several, put in at the caret (or `at`, or the end).
   * Returns the tokens put in, with their ids (for `updateToken`).
   */
  insert(
    content: string | ScToken | ScTokenInputValue,
    at: number | 'caret' | 'end' = 'caret',
  ): readonly ScToken[] {
    const parts = scTokenValueNormalize(
      typeof content === 'string' || !Array.isArray(content)
        ? [content as string | ScToken]
        : (content as ScTokenInputValue),
    ).map((part) => (typeof part === 'string' ? part : scTokenWithId(part)));
    const value = this.value();
    const length = scTokenValueLength(value);
    const offset =
      at === 'end'
        ? length
        : at === 'caret'
          ? (this.ɵeditor()?.caret() ?? length)
          : Math.min(Math.max(at, 0), length);
    this.ɵcommit(
      scTokenValueSplice(value, offset, offset, parts),
      'imperative',
      offset + scTokenValueLength(parts),
    );
    return scTokenValueTokens(parts);
  }

  /** A token changed in place (its status, its label): not a step back. */
  updateToken(id: string, patch: Partial<Omit<ScToken, 'id'>>): void {
    this.ɵcommit(
      this.value().map((part) =>
        typeof part !== 'string' && part.id === id
          ? { ...part, ...patch, id }
          : part,
      ),
      'imperative',
      null,
      { record: false },
    );
  }

  /** A token taken out, by its id. */
  removeToken(id: string): void {
    const token = scTokenValueTokens(this.value()).find((t) => t.id === id);
    if (token) this.ɵremove(token, 'imperative');
  }

  /** This token taken out. */
  ɵremove(token: ScToken, reason: ScTokenInputReason): void {
    let offset = 0;
    for (const part of this.value()) {
      if (part === token) {
        this.ɵcommit(
          scTokenValueSplice(this.value(), offset, offset + 1, []),
          reason,
          offset,
        );
        return;
      }
      offset += typeof part === 'string' ? part.length : 1;
    }
  }

  /** One step back: typing a second at a time, each paste or token. */
  undo(): void {
    const { past, future } = this.history();
    const step = past[past.length - 1];
    if (!step) return;
    const now: ScTokenInputStep = {
      value: this.value(),
      caret: this.ɵeditor()?.caret() ?? scTokenValueLength(this.value()),
    };
    this.history.set({ past: past.slice(0, -1), future: [...future, now] });
    this.restore(step, 'undo');
  }

  /** The step undone, again. */
  redo(): void {
    const { past, future } = this.history();
    const step = future[future.length - 1];
    if (!step) return;
    const now: ScTokenInputStep = {
      value: this.value(),
      caret: this.ɵeditor()?.caret() ?? scTokenValueLength(this.value()),
    };
    this.history.set({ past: [...past, now], future: future.slice(0, -1) });
    this.restore(step, 'redo');
  }

  /** Empty. */
  clear(): void {
    this.ɵcommit([], 'imperative', 0);
  }

  focus(): void {
    this.ɵeditor()?.focus();
  }

  /** Backspace or Delete at the token: as `tokenDeletion` says. */
  ɵdeleteToken(token: ScToken, offset: number, caretAfter: number): void {
    const mode = this.tokenDeletion();
    if (mode === 'select' && this.selectedToken() !== token) {
      this.selectedToken.set(token);
      return;
    }
    if (mode === 'revert') {
      const menu = this.ɵmenu();
      const text = (menu?.charFor(token.type) ?? '') + token.label;
      this.ɵcommit(
        scTokenValueSplice(this.value(), offset, offset + 1, [text]),
        'revert',
        offset + text.length,
      );
      menu?.pin(offset);
      return;
    }
    this.ɵcommit(
      scTokenValueSplice(this.value(), offset, offset + 1, []),
      'input-change',
      caretAfter,
    );
  }

  ɵsubmit(): void {
    this.submitted.emit(this.value());
  }

  private restore(step: ScTokenInputStep, reason: ScTokenInputReason): void {
    this.tell(this.value(), step.value, reason);
    this.lastTyping = 0;
    this.ɵcaretAfter = step.caret;
    this.value.set(step.value);
    this.ɵeditor()?.refresh();
  }

  /** The change told: the tokens in one and not the other. */
  private tell(
    previous: ScTokenInputValue,
    next: ScTokenInputValue,
    reason: ScTokenInputReason,
  ): void {
    const before = new Set(scTokenValueTokens(previous));
    const after = new Set(scTokenValueTokens(next));
    this.lastChange.set({
      reason,
      added: scTokenValueTokens(next).filter((t) => !before.has(t)),
      removed: scTokenValueTokens(previous).filter((t) => !after.has(t)),
    });
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    this.touch.emit();
  }
}
