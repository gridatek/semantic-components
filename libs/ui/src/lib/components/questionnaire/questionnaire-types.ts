import type { Signal } from '@angular/core';

/** The keys that pick a choice: A, B, C… or 1, 2, 3… */
export type ScQuestionnaireShortcuts = 'letters' | 'numbers';

/**
 * A question's answer: its field in your Signal Form (`survey.goal`) — its
 * value, and what its schema says (required, valid).
 */
export interface ScQuestionnaireAnswer {
  (): {
    readonly value: Signal<unknown>;
    readonly valid: Signal<boolean>;
    readonly invalid: Signal<boolean>;
    readonly required: Signal<boolean>;
    readonly touched: Signal<boolean>;
    markAsTouched(): void;
  };
}

/** What the questionnaire needs of a question. */
export interface ScQuestionnaireItemRef {
  readonly name: Signal<string>;
  readonly element: HTMLElement;
  readonly required: Signal<boolean>;
  readonly answered: Signal<boolean>;
  readonly valid: Signal<boolean>;
  /** Its choices' inputs, in order: the shortcuts' targets. */
  readonly choiceInputs: Signal<readonly HTMLInputElement[]>;
  /** Shows its errors. */
  touch(): void;
  focus(): void;
  /** Focuses its answer: the one chosen, or the first. */
  focusInvalid(): void;
}

/** The keys of a shortcut mode, in order. */
export function shortcutKeys(mode: ScQuestionnaireShortcuts | null): string[] {
  if (mode === 'letters')
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  if (mode === 'numbers')
    return Array.from({ length: 9 }, (_, i) => String(i + 1));
  return [];
}

/** An answer given: text not blank, a choice made, a box ticked. */
export function hasAnswer(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.some(hasAnswer);
  if (typeof value === 'object') return Object.values(value).some(hasAnswer);
  return true;
}

/**
 * Sorts elements as they come in the page. Not yet in it (still being
 * created), their order is the browser's whim: they keep the order they
 * came in — sort again once they are placed.
 */
export function inDocumentOrder(a: Element, b: Element) {
  if (a === b || !a.isConnected || !b.isConnected) return 0;
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}
