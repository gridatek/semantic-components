# Name icon buttons with visually hidden text

Status: **done** — 348 buttons in 119 files converted (2026-10-15): the showcase demos and pages, the blocks app, and the READMEs.

## The rule

An icon-only button is named by visually hidden text inside it, not by `aria-label`:

```html
<!-- Not this -->
<button scToastClose aria-label="Close">
  <svg siXIcon></svg>
</button>

<!-- This -->
<button scToastClose>
  <svg siXIcon></svg>
  <span class="sr-only">Close</span>
</button>
```

A name that changes moves into the span too: `<span class="sr-only">{{ player.isPlaying() ? 'Pause' : 'Play' }}</span>`.

`aria-label` stays where it belongs:

- elements that are not buttons and need a name — sliders, inputs, regions, groups, lists, `nav`;
- a button with visible text that needs a fuller name (the pagination's "Previous" named "Go to previous page").

## New code

Write new icon-only buttons this way. In development, a library part that needs a name (`ɵwarnIfUnnamed`) warns when it has none; visually hidden text counts.

## Buttons with a state

Two patterns — never both on one button:

- **A toggle button** (`aria-pressed`): its name stays the same, its state is pressed or not — "Bold", "Mute", "Shuffle". Screen readers say "Bold, toggle button, pressed". The editor's marks, the players' Mute and Shuffle, Toggle and Toggle Group items.
- **A button whose name follows the state**, no `aria-pressed`: the name says what a press does now — "Show password" / "Hide password", "Play" / "Pause". The consumer switches the text with the icon, in the same `@if`. The password toggle, the players' Play.

A name that changes on an `aria-pressed` button reads "Hide password, pressed": wrong. A button with more than two states — the audio player's Repeat (off, all, one) — can't be `aria-pressed` either: its name gives the mode ("Repeat: all"), and `data-state` styles it.
