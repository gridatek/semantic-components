# Countdown

To a moment, or a timer that pauses; on the second, from the clock; its units in the app's language, in words for screen readers; rolling digits and a ring.

## Architecture

```
scCountdown (until — a Temporal.Instant; or duration — a Temporal.Duration, paused — two-way; (completed))
│  role="timer" · left() · remaining() · done() · progress() · reset()
├── [scCountdownUnit]="'days' | 'hours' | 'minutes' | 'seconds'" — its digits; roll: they slide
├── [scCountdownText]   — the time left in words, for screen readers
├── [scCountdownRing]   — a timer's time left as a ring (put the digits in it)
├── button[scCountdownToggle] — start / pause (done: again)
└── button[scCountdownReset]  — back to the full time
```

## Usage

```html
<div scCountdown [until]="launch" aria-label="Launch in">
  <span scCountdownUnit="days"></span> days <span scCountdownUnit="hours"></span>:<span scCountdownUnit="minutes"></span>:<span scCountdownUnit="seconds"></span>
  <span scCountdownText></span>
</div>
```

```ts
readonly launch = Temporal.Instant.from('2026-12-31T23:00:00Z');
```

## Two needs

- `until`: to a moment — an event, a sale's end. It runs as time does.
- `duration`: a timer — `paused` (two-way; `false` to start), `reset()`; the toggle and reset buttons do both. `progress()` is its share left, 1 → 0 (the ring's).

## State

- `left()`: `{ days, hours, minutes, seconds }` — whole seconds, rounded up: 10 s left shows 10, then 9… then 0.
- `remaining()`: milliseconds left. `done()`: at zero — `data-done` on it too; `(completed)` once a run.
- The time comes from the clock, read on each whole second left — no drift — and again when the tab is shown.

## Units

`scCountdownUnit` shows a unit with at least `minDigits` (2) digits, in the app's language (`LOCALE_ID`). With `roll`, each digit slides to the next — still under `prefers-reduced-motion`. Units are visual (`aria-hidden`): the text says it.

## Accessibility

- The countdown is a `timer` (not announced as it changes): name it — "Launch in", "Tea timer".
- `scCountdownText`: the time left in words, by `Intl.DurationFormat` in the app's language ("2 days, 3 hours, 4 minutes, 5 seconds") — visually hidden; shown with `class="not-sr-only"`.
- To announce the end, say it in your live region from `(completed)`.
- Toggle: write its name from `paused()` ("Start" / "Pause").

## Not here

Counting up (a stopwatch), overtime past zero, flip cards (`roll` instead), notices at given times (yours, from `left()`).
