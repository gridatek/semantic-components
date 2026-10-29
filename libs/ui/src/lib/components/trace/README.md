# Trace

The steps of a run — an agent's searches, reads and commands — a line each, with a status, a detail, and the output it opens on. As [shadcn/ui's Trace](https://ui.shadcn.com/docs/components/trace).

A line is text on its own: inside a link it is a link, inside a collapsible's trigger a button with `aria-expanded`. Its title says what happened — its status too ("Failed to run pnpm build"): the color and the shimmer aren't read out.

## Usage

```html
<div scTrace>
  <span scTraceLine>
    <span scTraceIcon><svg siSearchIcon></svg></span>
    <span scTraceTitle>Searched the codebase</span>
    <span scTraceDescription>12 results</span>
  </span>

  <span scTraceLine status="error">
    <span scTraceIcon><svg siCircleXIcon></svg></span>
    <span scTraceTitle>Failed to run pnpm build</span>
  </span>

  <a href="https://angular.dev" target="_blank" rel="noopener">
    <span scTraceLine>
      <span scTraceIcon><svg siGlobeIcon></svg></span>
      <span scTraceTitle>Read angular.dev</span>
      <span scTraceIcon><svg siArrowUpRightIcon></svg></span>
      <span class="sr-only">(opens in a new tab)</span>
    </span>
  </a>
</div>
```

A step that opens on its output — on the [Collapsible](../collapsible/README.md)'s parts, which do the opening:

```html
<div scCollapsible scTraceCollapsible>
  <button scCollapsibleTrigger scTraceCollapsibleTrigger [panel]="output.panel">
    <span scTraceLine>
      <span scTraceIcon><svg siTerminalIcon></svg></span>
      <span scTraceTitle>Ran node --version</span>
    </span>
    <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
  </button>
  <div scCollapsiblePanel #output="scCollapsiblePanel">
    <ng-template scCollapsibleContent>
      <div scCollapsibleBody>
        <div scTraceCollapsibleContent>v24.18.0</div>
      </div>
    </ng-template>
  </div>
</div>
```

Open at first with the trigger's `[expanded]="true"`.

## Parts

| Part                                | What it does                                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scTrace]`                      | The steps, in a column; a link or a button around a line gets its focus ring                                                              |
| `span[scTraceLine]`                 | A step. `status`: `running` (its title shimmers, unless motion is reduced), `error` (red), `pending` (its icon dimmed); done when not set |
| `span[scTraceIcon]`                 | Your SVG, sized; hidden from screen readers. After the title: a trailing icon (an arrow for a new tab)                                    |
| `span[scTraceTitle]`                | What the step did, as a sentence; truncated on one line                                                                                   |
| `span[scTraceDescription]`          | A detail after the title: a count, a duration, a file                                                                                     |
| `div[scTraceCollapsible]`           | With `scCollapsible`: a step that opens                                                                                                   |
| `button[scTraceCollapsibleTrigger]` | With `scCollapsibleTrigger`: the line as the button, looking like the line; red when its line failed                                      |
| `span[scTraceCollapsibleIcon]`      | Your chevron pointing to the end (`siChevronRightIcon`): turned down when open, mirrored in right-to-left when closed                     |
| `div[scTraceCollapsibleContent]`    | Inside `scCollapsibleBody`: the output, indented under the line, muted — a block with its own background inside it sets `text-foreground` |

## Keyboard and screen readers

- A line alone is text, not a tab stop; in a link or a trigger, it is reached with Tab — Enter and Space open and close a trigger.
- Icons are hidden: the title is the name. Write the status into it.
- The running shimmer stops with `prefers-reduced-motion`; animate a spinner with `motion-safe:animate-spin`.

## Not shadcn's

- **Pending dims the icon, not the line** (shadcn: `opacity-60` on the line), and **the description is `text-muted-foreground`** (shadcn: `/70`): the text keeps 4.5:1.
- **The chevron is yours** (`scTraceCollapsibleIcon`), not built into the trigger — icons are the consumer's.
- **The output is `text-sm`**, the lines' size.
