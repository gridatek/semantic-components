# Message Scroller

A conversation that scrolls itself, as [shadcn/ui's Message Scroller](https://ui.shadcn.com/docs/components/message-scroller) — its behaviour, step for step:

- it **opens** at the end (or the start, or the last anchored turn);
- a new **turn** (`scrollAnchor`, usually the reader's own message) is scrolled near the top, the previous message peeking above it, and its reply grows below;
- with `autoScroll` it **follows** the end as messages arrive and grow — until the reader scrolls away (wheel, touch, scroll keys); then new messages arrive without moving them, and the jump button appears;
- when older messages **load above**, the message being read stays where it is.

It fills its parent: give that a height. Each row is a `scMessageScrollerItem` — put history controls outside the content, so a prepend is seen as one.

## Usage

```html
<div class="h-96">
  <div scMessageScroller autoScroll #scroller="scMessageScroller">
    <div scMessageScrollerViewport aria-label="Conversation">
      <div scMessageScrollerContent class="p-4" [attr.aria-busy]="streaming()">
        @for (message of messages(); track message.id) {
        <div scMessageScrollerItem [messageId]="message.id" [scrollAnchor]="message.role === 'user'">
          <div scMessage>…</div>
        </div>
        }
      </div>
    </div>
    <button scMessageScrollerButton>
      <svg siArrowDownIcon></svg>
      <span class="sr-only">Scroll to the latest message</span>
    </button>
  </div>
</div>
```

## Parts

| Part                              | Inputs                                                                                                                                                                                                                                                          |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `div[scMessageScroller]`          | `autoScroll` (false), `defaultScrollPosition` (`end` \| `start` \| `last-anchor`: the last turn, or the end if it fits), `scrollPreviousItemPeek` (64 px above a new turn), `scrollMargin` (0), `scrollEdgeThreshold` (8 px from an edge still counts as at it) |
| `div[scMessageScrollerViewport]`  | What scrolls — name it (`aria-label`). `preserveScrollOnPrepend` (true). Hidden until the opening position is applied                                                                                                                                           |
| `div[scMessageScrollerContent]`   | The rows, a `log`; bind `aria-busy` while a reply streams                                                                                                                                                                                                       |
| `div[scMessageScrollerItem]`      | `messageId` (to scroll to it, to know it's on screen), `scrollAnchor` (starts a turn). Off-screen rows aren't drawn (`content-visibility: auto`)                                                                                                                |
| `button[scMessageScrollerButton]` | `direction` (`end` \| `start`), `behavior` (`smooth`), `variant` (`secondary`), `size` (`icon-sm`) — shown when there is more that way, inert when not. Your arrow (pointing down; turned up for `start`) and its name                                          |

Through `#scroller="scMessageScroller"`:

| Member                                     | What it is                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| `scrollToEnd({ behavior })`                | To the end — following again, with `autoScroll`                                       |
| `scrollToStart({ behavior })`              | To the start                                                                          |
| `scrollToMessage(id, { align, behavior })` | To a row (`align`: `start`, `center`, `end`, `nearest`) — once it renders, if not yet |
| `scrollable()`                             | `{ start, end }`: the edges it can still scroll toward — at the end means `!end`      |
| `visibility()`                             | `{ currentAnchorId, visibleMessageIds }`: the turn being read, the rows on screen     |

Data attributes for styling: `data-scrollable` (`start`, `end`), `data-autoscrolling`, `data-pending-scroll`, the button's `data-active`.

## Keyboard and screen readers

- The viewport is a named region, one tab stop: the arrows, Page Up, Page Down, Home, End and Space scroll it — and stop the following.
- The content is a log (`aria-relevant="additions"`): each new message is announced once, not word by word; `aria-busy` while streaming waits for it whole.
- The jump button is out of the tab order and inert when there is nothing that way.

## Not shadcn's

- **No provider**: `scMessageScroller` holds the state; its commands and signals are on it (`exportAs`), in place of the hooks.
- **No default strings**: the viewport's name and the button's text are yours.
- **A smooth scroll is aimed again** when the rows' heights change under it — WebKit drops it otherwise (rows drawn as they come into view).
