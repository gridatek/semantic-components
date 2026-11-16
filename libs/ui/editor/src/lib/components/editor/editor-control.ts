import { ToolbarWidget } from '@angular/aria/toolbar';
import { type Signal, effect, inject } from '@angular/core';
import { ScButton, ScToggle, bindInput } from '@semantic-components/ui';

/** A command's state, for the part beside it to draw. */
export interface ɵScEditorControlState {
  /** It can't run: the editor isn't editable, or its own `disabled`. */
  readonly disabled: Signal<boolean>;
  /** On at the selection (a mark, a block): for a toggle beside it. */
  readonly pressed?: Signal<boolean>;
}

/**
 * A command is behaviour only: its look is the part beside it on the same
 * button — `scToggle` for one that can be on, `scButton` for one that runs
 * once — and `scToolbarWidget` in a toolbar. This feeds them the command's
 * state: pressed into the toggle, disabled into each (still reachable in a
 * toolbar, as its widgets are). In an injection context (a constructor).
 */
export function ɵeditorControl(state: ɵScEditorControlState): void {
  const toggle = inject(ScToggle, { self: true, optional: true });
  const button = inject(ScButton, { self: true, optional: true });
  const widget = inject(ToolbarWidget, { self: true, optional: true });
  const pressed = state.pressed;
  if (toggle) {
    bindInput(toggle.disabled, state.disabled);
    if (pressed) effect(() => toggle.pressed.set(pressed()));
  }
  if (button) bindInput(button.disabled, state.disabled);
  if (widget) bindInput(widget.disabled, state.disabled);
}
