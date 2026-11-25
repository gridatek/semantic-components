import {
  type InputSignal,
  type InputSignalWithTransform,
  type Signal,
  effect,
  isSignal,
} from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';

/** A signal input (`input()` / `input.required()`) of another directive. */
export type ScTargetInput<T> =
  InputSignal<T> | InputSignalWithTransform<T, unknown>;

/**
 * Writes a value into another directive's signal input — typically one
 * declared on a host directive (e.g. an `@angular/aria` directive).
 *
 * Angular does not let a directive feed inputs to its own host directives
 * (https://github.com/angular/angular/issues/50510). This writes to the
 * input's underlying signal node instead. Input `transform`s are bypassed,
 * so pass the already-transformed value.
 *
 * If the same input is also exposed and bound in a template, whichever write
 * happens last wins.
 */
export function setInput<T>(target: ScTargetInput<T>, value: T): void {
  signalSetFn(target[SIGNAL], value);
}

/**
 * Binds another directive's signal input to a static value or a signal.
 *
 * - A static value is written immediately.
 * - A signal is tracked with an `effect()` and re-written on every change.
 *
 * Must be called in an injection context (e.g. a constructor or field
 * initializer). See {@link setInput} for caveats.
 *
 * @example
 * private readonly widget = inject(ToolbarWidget);
 * constructor() {
 *   bindInput(this.widget.disabled, this.disabled);
 * }
 */
export function bindInput<T>(
  target: ScTargetInput<T>,
  value: T | Signal<T>,
): void {
  if (isSignal(value)) {
    const source = value as Signal<T>;
    effect(() => setInput(target, source()));
  } else {
    setInput(target, value as T);
  }
}
