import { ToolbarWidget } from '@angular/aria/toolbar';
import { type Signal, computed, effect, inject } from '@angular/core';
import { ScButton, ScToggle, bindInput } from '@semantic-components/ui';

/** A command's state, for the part beside it to draw. */
export interface ɵScEditorControlState {
  /** It can't run: the editor isn't editable, or its own `disabled`. */
  readonly disabled: Signal<boolean>;
  /** On at the selection (a mark, a block): for a toggle beside it. */
  readonly pressed?: Signal<boolean>;
}

const OFF = computed(() => false);

/**
 * A command is behaviour only: its look is the part beside it on the same
 * button — `scToggle` (the editor's toolbar: every command the same size),
 * `scButton` — and `scToolbarWidget` in a toolbar. This feeds them the
 * command's state: disabled into each (still reachable in a toolbar, as its
 * widgets are), and the editor's pressed state into the toggle — off for a
 * command that has none (Undo, a menu's trigger). A toggle flips itself when
 * clicked: here it shows the editor's state only, so the flip is undone at
 * once (Link opening its popover isn't pressed until there's a link). In an
 * injection context (a constructor).
 */
export function ɵeditorControl(state: ɵScEditorControlState): void {
  const toggle = inject(ScToggle, { self: true, optional: true });
  const button = inject(ScButton, { self: true, optional: true });
  const widget = inject(ToolbarWidget, { self: true, optional: true });
  if (toggle) {
    const pressed = state.pressed ?? OFF;
    bindInput(toggle.disabled, state.disabled);
    effect(() => toggle.pressed.set(pressed()));
    toggle.pressed.subscribe((value) => {
      if (value !== pressed()) toggle.pressed.set(pressed());
    });
  }
  if (button) bindInput(button.disabled, state.disabled);
  if (widget) bindInput(widget.disabled, state.disabled);
}
