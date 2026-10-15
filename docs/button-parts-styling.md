# Open question: should button parts style themselves?

Status: **undecided** — written down to come back to.

## The question

A part that goes on a `button` (`scToastClose`, `scEditorBold`, `scNotificationDismiss`…) adds behaviour. Should it also give the button its look, or should the consumer put it on a `scButton` and choose the look there?

```html
<!-- A: the part styles the button -->
<button scToastClose>
  <svg siXIcon></svg>
  <span class="sr-only">Close</span>
</button>

<!-- B: the consumer's scButton styles it; the part only adds behaviour -->
<button scButton variant="ghost" size="icon-xs" scToastClose>
  <svg siXIcon></svg>
  <span class="sr-only">Close</span>
</button>
```

## Where the libraries are today

The libraries do both, so there is no single answer for users yet. Counted over every `button[…]` part (2026-10-15):

| How the part is styled                               | Parts | Examples                                                                                   |
| ---------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------ |
| Applies `buttonVariants` / `toggleVariants` itself   | 68    | the editor's toolbar buttons, carousel previous/next, the video player's buttons           |
| Its own class list (sometimes only merging `class`)  | 108   | `scToastClose`, `scToastAction`, the PDF viewer's parts, pagination                        |
| Behaviour only — the consumer's `scButton` styles it | 18    | `scDrawerClose`, the notification center's buttons, the transfer list's moves, the cropper |

## Option A — the part styles itself

- **For:** the shortest markup, and every editor toolbar button looks the same without the consumer thinking about it. "Components own their styles" (a project rule) reads most naturally this way.
- **Against:** a second button look to maintain next to `scButton`; parts drift from it (sizes, focus rings, dark mode). Changing the look means a `class` override instead of picking a variant.

## Option B — `scButton` styles it, the part adds behaviour

- **For:** one button look in the whole library (`scButton`'s variants and sizes); the consumer picks `ghost`, `outline`, `icon-xs`… with the same words everywhere. Parts become smaller.
- **Against:** longer markup; a toolbar's buttons can be styled inconsistently by mistake; styles that depend on the part's state (`aria-pressed`, a destructive toast) need `scButton` variants for them, or classes on top.

## A middle way

Parts that sit in a **designed context** keep their own look (the editor toolbar, the toast's close button in its corner, the video player over the video), and **free-standing actions** (dismiss, clear all, move, apply/cancel) are behaviour on a `scButton`. That is roughly what exists today — the note is to decide whether it is the rule, and write it down if so.

## To decide

1. A, B, or the middle way?
2. If B or the middle way: which of the 108 "own classes" parts move to `scButton`?
3. Write the answer in `CLAUDE.md` (Components section), so new parts follow it.
