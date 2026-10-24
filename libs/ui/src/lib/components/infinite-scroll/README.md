# Infinite Scroll

More as the reader nears the end — or the start, for a chat — with whatever scrolls; it asks again until the content fills the box, and a Load more button and a status make it usable by all.

## Architecture

```
[scInfiniteScroll] (loading, done, distance, direction: 'end' | 'start', auto) → (more)
│  aria-busy while loading · loadMore()
│  your items… and its sentinel, after them (before, with start)
├── button[scInfiniteScrollMore]="feed" — "Load more": asks the one named (anywhere)
└── [scInfiniteScrollStatus]            — role="status": your words
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
<p scInfiniteScrollStatus>@if (loading()) { Loading more… } @else if (done()) { That's all. }</p>
<button [scInfiniteScrollMore]="feed">Load more</button>
```

```ts
async load() {
  this.loading.set(true);
  const more = await this.api.page(this.items().length);
  this.items.update((items) => [...items, ...more]);
  this.done.set(more.length === 0);
  this.loading.set(false);
}
```

## How it asks

- `(more)` when its sentinel is within `distance` (200 px) of the edge of what scrolls — itself, the nearest box that scrolls around it, or the page — and it is not `loading`, not `done`, and `auto`.
- After each load it looks again: still near (a first page shorter than the box), it asks again — until the content fills the box, or `done`.
- `auto` off: only the More button asks — always, or after an error (`[auto]="!failed()"`), so a failing server is not asked again and again.
- `direction="start"` (a chat): the sentinel is before the items; it opens at the end, and as older items come in above, the one being read stays where it was.
- It looks once it is in the page: rendered before (in a lazy tab panel, a dialog), it finds what scrolls — and a chat opens at its end — when it is shown.

## Accessibility

- `aria-busy` is on it while loading. For articles, make it a `role="feed"` with `aria-posinset` / `aria-setsize` (−1 until done).
- Say what happens in `scInfiniteScrollStatus` — keep it in the page and change its text.
- Offer the More button: with auto off, the content after the list (a footer) stays within reach of the keyboard.
- A box that scrolls with nothing focusable in it needs `tabindex="0"`, a role and a name.

## Not here

Virtual scrolling (rows rendered only in view), the feed pattern's keys (Page Up / Page Down between articles), pull to refresh, the scroll position restored on going back.
