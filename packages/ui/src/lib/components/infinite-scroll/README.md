# Infinite Scroll

More as the reader nears the end — or the start, for a chat — with whatever scrolls. It asks again until the content fills the box, keeps the reading place, and gives a feed its keys. Rewritten 2026-11-23: one part — the Load more button and the status are your markup.

## Architecture

```
[scInfiniteScroll] (loading, done, distance, direction: 'end' | 'start', auto) → (more)
   aria-busy while loading · loadMore() · a feed's keys
   your items… and its marker, after them (before, with start)
```

## Usage

```html
<div class="h-96 overflow-y-auto">
  <div scInfiniteScroll #feed="scInfiniteScroll" role="feed" aria-label="News" [loading]="loading()" [done]="done()" (more)="load()">
    @for (item of items(); track item.id) {
    <article tabindex="0" [attr.aria-posinset]="$index + 1" [attr.aria-setsize]="done() ? items().length : -1">…</article>
    }
  </div>
</div>
<p role="status">@if (loading()) { Loading more… } @else if (done()) { That's all. }</p>
@if (!feed.done()) {
<button scButton variant="outline" [disabled]="feed.loading()" (click)="feed.loadMore()">Load more</button>
}
```

## How it asks

- `(more)` when its marker is within `distance` (200px) of the edge of what scrolls — itself, the nearest box that scrolls around it, or the page (an IntersectionObserver, as react-infinite-scroll-component and react-infinite-scroll-hook) — and it is not `loading`, not `done`, and `auto`.
- After each load it looks again: still near (a first page shorter than the box), it asks again — until the content fills the box, or `done`.
- `auto` off: only `loadMore()` asks — always, or after an error (`[auto]="!failed()"`), so a failing server is not asked again and again (react-infinite-scroll-hook's advice).
- `direction="start"` (a chat): the marker is before the items; it opens at the end, and as older items come in above, the one being read stays where it was — without the `column-reverse` the React and Vue libraries need.
- It looks once it is in the page: rendered before (a lazy tab panel, a dialog), it finds what scrolls — and a chat opens at its end — when it is shown.

## Keyboard

On a `role="feed"`, between its articles (`article`, or `role="article"`) — the WAI-ARIA feed pattern:

- Page Down / Page Up: the next or the previous article. On the last, Page Down asks for more: a keyboard reader loads as a scrolling one does.
- Ctrl + End / Ctrl + Home: the first focusable element after the feed / the last before it.

## Accessibility

- `aria-busy` is on it while loading. For articles, make it a `role="feed"` with `aria-posinset` / `aria-setsize` (−1 until done), each article named (`aria-labelledby` its title).
- Say what happens in a `role="status"` kept in the page — change its text.
- Offer a Load more button where the content after the list (a footer) must stay within reach of everyone.
- A box that scrolls with nothing focusable in it needs `tabindex="0"`, a role and a name.

## Not here

Virtualization (the Virtual List: load when `range()` nears the end), pull to refresh, the scroll position restored on going back.
